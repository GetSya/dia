// ============================================================
// TIC-TAC-TOE ❌⭕ — vs bot, vs member, room lintas chat.
//   #ttt bot              -> main lawan bot
//   #ttt @tag / reply     -> tantang member (jawab y/n)
//   #ttt create           -> buat room (dapat kode)
//   #ttt join KODE        -> gabung room (boleh beda chat!)
//   #ttt papan | #ttt stop
// Langkah: kirim angka 1-9 (tanpa prefix).
// Room + statistik tersimpan di database.json (db.ttt).
// ============================================================
const joDatabase = require('./database')
let economy = null; try { economy = require('./economy') } catch {}

const X = '❌', O = '⭕'
const BOT = 'BOT'
const NUMS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
const WINS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const WAIT_MS = 120000 // tantangan/room menunggu 2 menit
const MAX_ROOMS = 50

function store() {
    const db = joDatabase.loadDB()
    if (!db.ttt) db.ttt = { rooms: {}, stats: {} }
    if (!db.ttt.rooms) db.ttt.rooms = {}
    if (!db.ttt.stats) db.ttt.stats = {}
    return db.ttt
}
function save() { try { joDatabase.saveDB(true) } catch {} }

const digitsOf = (j) => String(j || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
// JID mention dari nomor (stabil lintas format LID/PN)
const jidOf = (num) => `${String(num || '').replace(/[^0-9]/g, '')}@s.whatsapp.net`

function render(board) {
    const c = board.map((v, i) => (v === 'X' ? X : v === 'O' ? O : NUMS[i]))
    return `${c[0]}${c[1]}${c[2]}\n${c[3]}${c[4]}${c[5]}\n${c[6]}${c[7]}${c[8]}`
}

function winner(board) {
    for (const [a, b, c] of WINS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
    }
    return null
}
function full(board) { return board.every(v => v === 'X' || v === 'O') }

// AI bot (mark 'O'): menang bila bisa, cegah bila perlu, tengah, acak.
// Nilai game-theoretic posisi: 'X' / 'O' (pemenang bila kedua pihak optimal) / 'draw'.
// Minimax penuh — murah karena hanya dipanggil saat papan hampir penuh.
function solveWinner(board, turn) {
    const w = winner(board)
    if (w) return w
    if (full(board)) return 'draw'
    const other = turn === 'X' ? 'O' : 'X'
    let canDraw = false
    for (let i = 0; i < 9; i++) {
        if (board[i]) continue
        board[i] = turn
        const r = solveWinner(board, other)
        board[i] = null
        if (r === turn) return turn
        if (r === 'draw') canDraw = true
    }
    return canDraw ? 'draw' : other
}

const LOCK_EMPTY = 4 // evaluasi kuncian hanya saat kotak kosong <= 4
function emptyCount(board) { return board.filter(v => !v).length }
// Terkunci = hasil optimal kedua pihak sudah pasti seri.
function isLockedDraw(board, turn) {
    if (emptyCount(board) > LOCK_EMPTY) return false
    return solveWinner(board, turn) === 'draw'
}

function lockedDrawText(room) {
    return `${X} *TIC-TAC-TOE SELESAI* ${O}\n${modeLabel(room)}\n\n${render(room.board)}\n\n🔒 *Papan terkunci!* Tidak ada lagi langkah menang bagi kedua pihak.\n\n🤝 *HASIL SERI!*`
}

// AI bot (mark 'O'): menang bila bisa, cegah bila perlu, tengah, acak.
function botMove(board) {
    const free = board.map((v, i) => (v ? null : i)).filter(v => v !== null)
    if (!free.length) return -1
    for (const i of free) { board[i] = 'O'; const w = winner(board) === 'O'; board[i] = null; if (w) return i }
    for (const i of free) { board[i] = 'X'; const w = winner(board) === 'X'; board[i] = null; if (w) return i }
    if (board[4] === null) return 4
    return free[Math.floor(Math.random() * free.length)]
}

function genCode() {
    const t = store()
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    for (let k = 0; k < 50; k++) {
        let c = ''
        for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)]
        if (!t.rooms[c]) return c
    }
    return 'R' + Date.now().toString(36).toUpperCase().slice(-4)
}

function activeRooms() {
    return Object.values(store().rooms).filter(r => r && (r.status === 'waiting' || r.status === 'playing'))
}
function getRoom(code) { return store().rooms[String(code || '').toUpperCase().trim()] || null }
function roomOf(jid) {
    const mine = activeRooms().filter(r => r.x === jid || r.o === jid)
    // utamakan yang sedang bermain
    mine.sort((a, b) => (a.status === 'playing' ? 0 : 1) - (b.status === 'playing' ? 0 : 1))
    return mine[0] || null
}
function waitingFor(jid) {
    return activeRooms().find(r => r.status === 'waiting' && r.o === jid) || null
}
function waitingBy(jid) {
    return activeRooms().find(r => r.status === 'waiting' && r.x === jid) || null
}

function baseRoom(chat, x, o, mode) {
    return {
        code: genCode(), chat, chatB: null, mode, status: 'waiting',
        x, o, turn: 'X', board: Array(9).fill(null),
        names: {}, createdAt: Date.now(), botThinking: 0
    }
}
function putRoom(room) {
    const t = store()
    if (Object.keys(t.rooms).length >= MAX_ROOMS && !t.rooms[room.code]) {
        // buang room selesai paling lama
        const done = Object.values(t.rooms).filter(r => r.status === 'done')
            .sort((a, b) => (a.updatedAt || 0) - (b.updatedAt || 0))[0]
        if (done) delete t.rooms[done.code]
    }
    room.updatedAt = Date.now()
    t.rooms[room.code] = room
    save()
    return room
}
function endRoom(code) {
    const t = store()
    const r = t.rooms[String(code || '').toUpperCase().trim()]
    if (r) { r.status = 'done'; r.updatedAt = Date.now(); save() }
    return r
}

// Kadaluarsa: room waiting > WAIT_MS -> done. Return daftarnya utk notifikasi.
function sweepExpired() {
    const now = Date.now()
    const out = []
    for (const r of activeRooms()) {
        if (r.status === 'waiting' && now - (r.createdAt || 0) > WAIT_MS) {
            endRoom(r.code)
            out.push(r)
        }
    }
    return out
}

function statsOf(jid) {
    const t = store()
    if (!t.stats[jid]) t.stats[jid] = { win: 0, lose: 0, draw: 0 }
    return t.stats[jid]
}
function recordResult(winnerJid, loserJid, draw) {
    const t = store()
    if (draw) {
        for (const j of [winnerJid, loserJid]) {
            if (!j || j === BOT) continue
            if (!t.stats[j]) t.stats[j] = { win: 0, lose: 0, draw: 0 }
            t.stats[j].draw++
            try { if(economy) economy.giveGameReward(j.replace(/^0/,'62').includes('@')?j:j+'@s.whatsapp.net', 'ttt_draw').catch(()=>{}) } catch {}
        }
    } else {
        if (winnerJid && winnerJid !== BOT) {
            if (!t.stats[winnerJid]) t.stats[winnerJid] = { win: 0, lose: 0, draw: 0 }
            t.stats[winnerJid].win++
            try {
                let wid = winnerJid.includes('@') ? winnerJid : jidOf(winnerJid)
                if(economy) economy.giveGameReward(wid, 'ttt_win').catch(()=>{})
            } catch {}
        }
        if (loserJid && loserJid !== BOT) {
            if (!t.stats[loserJid]) t.stats[loserJid] = { win: 0, lose: 0, draw: 0 }
            t.stats[loserJid].lose++
        }
    }
    save()
}

function nameOf(room, jid) {
    if (jid === BOT) return 'Bot 🤖'
    return (room.names && room.names[jid]) || ('@' + digitsOf(jid))
}
function mentionList(room) {
    // PENTING: pemain disimpan sebagai NOMOR (digits), bukan JID mentah —
    // JID bisa berubah format (LID vs PN) antar pesan, nomor selalu stabil.
    return [room.x, room.o]
        .filter(j => j && j !== BOT)
        .map(n => String(n).includes('@') ? String(n) : jidOf(n))
}
function modeLabel(room) {
    return room.mode === 'bot' ? 'vs Bot 🤖' : room.mode === 'room' ? `Room \`${room.code}\`` : 'vs Member'
}

function boardText(room, foot = '') {
    const turnJid = room.turn === 'X' ? room.x : room.o
    const lines = [
        `*${X} TIC-TAC-TOE ${O}*`,
        `${modeLabel(room)}${room.chatB && room.chatB !== room.chat ? ' (lintas chat)' : ''}`,
        '',
        render(room.board),
        '',
        room.status === 'playing'
            ? `Giliran: ${nameOf(room, turnJid)} (${room.turn === 'X' ? X : O})${turnJid === BOT ? ' 🤖' : ''}\nKetik angka *1-9* untuk melangkah.`
            : `Menunggu lawan gabung...\nKode room: *${room.code}* — ketik *#ttt join ${room.code}*`
    ]
    if (foot) lines.push('', foot)
    return lines.join('\n')
}

async function broadcast(bob, room, text, mentions) {
    const chats = [...new Set([room.chat, room.chatB].filter(Boolean))]
    for (const c of chats) {
        try { await bob.sendMessage(c, { text, mentions: mentions || [] }) } catch (e) {
            console.log('[ttt] broadcast gagal:', e?.message || e)
        }
    }
}

// Terapkan langkah. Return { error } | { result: 'next'|'win'|'draw', winnerMark }
function applyMove(room, jid, idx) {
    if (!room || room.status !== 'playing') return { error: 'Room tidak aktif.' }
    const mark = room.x === jid ? 'X' : room.o === jid ? 'O' : null
    if (!mark) return { error: 'Kamu bukan pemain di room ini.' }
    if (room.turn !== mark) return { error: `Bukan giliranmu! Giliran: ${nameOf(room, room.turn === 'X' ? room.x : room.o)}` }
    if (idx < 0 || idx > 8 || room.board[idx]) return { error: 'Kotak tidak valid / sudah terisi!' }
    room.board[idx] = mark
    const w = winner(room.board)
    if (w) return { result: 'win', winnerMark: w }
    if (full(room.board)) return { result: 'draw' }
    room.turn = mark === 'X' ? 'O' : 'X'
    putRoom(room)
    return { result: 'next' }
}

function finishGame(room) {
    // room.board sudah final. Return { text, winnerJid, loserJid, draw }
    const w = winner(room.board)
    const xName = nameOf(room, room.x), oName = nameOf(room, room.o)
    const head = `${X} *TIC-TAC-TOE SELESAI* ${O}\n${modeLabel(room)}\n\n${render(room.board)}\n`
    if (!w) {
        return { text: `${head}\n🤝 *SERI!* Tidak ada yang menang.`, draw: true, winnerJid: room.x, loserJid: room.o }
    }
    const winnerJid = w === 'X' ? room.x : room.o
    const loserJid = w === 'X' ? room.o : room.x
    return {
        text: `${head}\n🏆 *${w === 'X' ? xName : oName}* (${w === 'X' ? X : O}) *MENANG!*${winnerJid === BOT ? ' 🤖' : ''}`,
        draw: false, winnerJid, loserJid
    }
}

// Giliran bot (async, dipanggil setelah langkah pemain / recovery).
async function botTurn(bob, code, ctx = {}) {
    const room = getRoom(code)
    if (!room || room.status !== 'playing') return
    const turnJid = room.turn === 'X' ? room.x : room.o
    if (turnJid !== BOT) return
    if (Date.now() - (room.botThinking || 0) < 5000) return // cegah dobel
    room.botThinking = Date.now()
    putRoom(room)
    await new Promise(r => setTimeout(r, 900))
    const fresh = getRoom(code)
    if (!fresh || fresh.status !== 'playing') return
    const t2 = fresh.turn === 'X' ? fresh.x : fresh.o
    if (t2 !== BOT) return
    // Papan terkunci -> seri langsung tanpa melangkah
    if (isLockedDraw(fresh.board, fresh.turn)) {
        recordResult(fresh.x, fresh.o, true)
        endRoom(code)
        await broadcast(bob, fresh, lockedDrawText(fresh) + '\nMain lagi? *#ttt bot* / *#ttt create*', mentionList(fresh))
        return
    }
    const idx = botMove(fresh.board)
    if (idx < 0) return
    fresh.board[idx] = fresh.turn
    const w = winner(fresh.board)
    if (w || full(fresh.board)) {
        const fin = finishGame(fresh)
        recordResult(fin.draw ? fresh.x : fin.winnerJid, fin.draw ? fresh.o : fin.loserJid, fin.draw)
        endRoom(code)
        if (!fin.draw && fin.winnerJid === BOT && ctx.onLoseVsBot) { try { ctx.onLoseVsBot(fresh.x) } catch {} }
        if (!fin.draw && fin.winnerJid !== BOT && ctx.onWin) { try { ctx.onWin(fin.winnerJid) } catch {} }
        await broadcast(bob, fresh, fin.text + (fin.draw ? '' : (fin.winnerJid === BOT ? '\n\nBot menang kali ini! Coba lagi: *#ttt bot*' : '\n\nHadiah: *+2 poin* 🎉\nMain lagi? *#ttt bot*')), mentionList(fresh))
        return
    }
    fresh.turn = fresh.turn === 'X' ? 'O' : 'X'
    fresh.botThinking = 0
    putRoom(fresh)
    await broadcast(bob, fresh, boardText(fresh), mentionList(fresh))
}

// Handler pesan teks: jawab tantangan (y/n), langkah 1-9, recovery bot.
// Return true bila pesan dikonsumsi (jangan diproses command lain).
// ctx: { body, sender, num (nomor stabil hasil resolve LID->PN), pushname, reply, onWin }.
// PENTING: pencocokan room selalu pakai ctx.num, karena JID mentah bisa
// berubah format (LID vs PN) antar pesan dari pengirim yang sama.
async function handleText(bob, m, ctx) {
    const text = String((ctx && ctx.body) || '').trim()
    if (!text) return false
    const low = text.toLowerCase()
    const me = (ctx && ctx.num) || digitsOf(ctx && ctx.sender)

    for (const r of sweepExpired()) {
        await broadcast(bob, r, `⌛ Room *${r.code}* kedaluwarsa. Buat lagi dengan *#ttt create*`, mentionList(r))
    }

    const challenged = waitingFor(me)
    if (challenged && ['y', 'ya', 'yes', 'mau', 'ok', 'gas'].includes(low)) {
        challenged.status = 'playing'
        challenged.names[me] = ctx.pushname
        putRoom(challenged)
        await broadcast(bob, challenged, `✅ Tantangan *diterima!* ${nameOf(challenged, challenged.x)} ${X} jalan duluan.\n\n` + boardText(challenged), mentionList(challenged))
        return true
    }
    if (challenged && ['n', 'no', 'tidak', 'nggak', 'gak', 'ga', 'ogah'].includes(low)) {
        endRoom(challenged.code)
        await broadcast(bob, challenged, `❌ @${me} menolak tantangan dari @${digitsOf(challenged.x)}.`, [jidOf(challenged.x), jidOf(me)])
        return true
    }

    const myRoom = roomOf(me)
    if (!myRoom || myRoom.status !== 'playing') return false
    const turnJid = myRoom.turn === 'X' ? myRoom.x : myRoom.o
    // Recovery: giliran bot macet (mis. restart saat bot mau jalan)
    if (turnJid === BOT) { botTurn(bob, myRoom.code, ctx); return true }
    if (!/^[1-9]$/.test(text)) return false
    if (turnJid !== me) {
        await ctx.reply(`Bukan giliranmu! Giliran: ${nameOf(myRoom, turnJid)}`)
        return true
    }
    myRoom.names[me] = ctx.pushname
    const ap = applyMove(myRoom, me, Number(text) - 1)
    if (ap.error) { await ctx.reply(ap.error); return true }
    if (ap.result === 'win' || ap.result === 'draw') {
        const fin = finishGame(myRoom)
        recordResult(fin.draw ? myRoom.x : fin.winnerJid, fin.draw ? myRoom.o : fin.loserJid, fin.draw)
        endRoom(myRoom.code)
        let extra = ''
        if (!fin.draw && ctx.onWin && fin.winnerJid !== BOT) {
            try { ctx.onWin(fin.winnerJid) } catch {}
            extra = '\n\nHadiah: *+2 poin* 🎉'
        }
        if (!fin.draw && fin.winnerJid === BOT) extra = '\n\nBot menang kali ini! Coba lagi: *#ttt bot*'
        await broadcast(bob, myRoom, fin.text + extra + '\nMain lagi? *#ttt bot* / *#ttt create*', mentionList(myRoom))
        return true
    }
    // Papan terkunci (hasil optimal = seri) -> langsung seri, tak perlu dihabiskan
    const locked = getRoom(myRoom.code)
    if (locked && locked.status === 'playing' && isLockedDraw(locked.board, locked.turn)) {
        recordResult(locked.x, locked.o, true)
        endRoom(locked.code)
        await broadcast(bob, locked, lockedDrawText(locked) + '\nMain lagi? *#ttt bot* / *#ttt create*', mentionList(locked))
        return true
    }
    await broadcast(bob, myRoom, boardText(myRoom), mentionList(myRoom))
    const after = getRoom(myRoom.code)
    if (after && (after.turn === 'X' ? after.x : after.o) === BOT) botTurn(bob, after.code, ctx)
    return true
}

module.exports = {
    X, O, BOT, WAIT_MS, digitsOf, jidOf,
    render, winner, full, botMove, solveWinner, isLockedDraw, lockedDrawText,
    activeRooms, getRoom, roomOf, waitingFor, waitingBy,
    baseRoom, putRoom, endRoom, sweepExpired,
    statsOf, recordResult, nameOf, mentionList, modeLabel, boardText, broadcast,
    applyMove, finishGame, botTurn, handleText
}
