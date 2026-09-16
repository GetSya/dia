// Simulasi penuh TTT dgn kunci NOMOR (desain baru tahan LID).
// Run: node scratch/ttt-test.js
const ttt = require('../lib/ttt')

const sent = []
const bob = {
    sendMessage: async (jid, content) => {
        sent.push({ jid, text: content.text })
        return { key: { id: 'x' } }
    }
}
// senderJid = JID mentah (bisa LID), num = nomor stabil hasil resolve
const ctxFor = (senderJid, pushname, body, num) => ({
    body, sender: senderJid, num: num || senderJid.split('@')[0], pushname,
    reply: async (t) => { sent.push({ jid: 'reply:' + senderJid, text: t }) },
    onWin: () => {}
})
const boards = (jid) => sent.filter(s => s.jid === jid && /TIC-TAC-TOE/.test(s.text)).map(s => s.text)
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
let pass = 0, fail = 0
function check(name, cond) {
    if (cond) { pass++; console.log('OK  ', name) }
    else { fail++; console.log('FAIL', name) }
}

;(async () => {
    const A_NUM = '6281111111111', B_NUM = '6282222222222'
    const A_LID = '15795220635338@lid', A_PN = A_NUM + '@s.whatsapp.net'
    const G = 'grup1@g.us', DMA = A_PN, DMB = B_NUM + '@s.whatsapp.net'
    for (const r of ttt.activeRooms()) ttt.endRoom(r.code)

    // --- 1. VS BOT, langkah datang via JID LID (beda format dari saat create) ---
    let room = ttt.baseRoom(G, A_NUM, ttt.BOT, 'bot')
    room.status = 'playing'; room.names[A_NUM] = 'Andi'; ttt.putRoom(room)
    for (let i = 0; i < 9; i++) {
        const cur = ttt.getRoom(room.code)
        if (!cur || cur.status !== 'playing') break
        if ((cur.turn === 'X' ? cur.x : cur.o) !== A_NUM) { await sleep(1400); continue }
        const idx = cur.board.findIndex(v => !v)
        const c = await ttt.handleText(bob, { sender: A_LID }, ctxFor(A_LID, 'Andi', String(idx + 1), A_NUM))
        if (!c) console.log('  langkah TIDAK dikonsumsi (bug LID!)')
        await sleep(1400)
    }
    check('1. langkah via LID dikonsumsi + game selesai',
        (!ttt.getRoom(room.code) || ttt.getRoom(room.code).status === 'done'))
    check('1. ada pengumuman selesai', sent.some(s => /SELESAI/.test(s.text)))
    const stA = ttt.statsOf(A_NUM)
    check('1. statistik tercatat', (stA.win + stA.lose + stA.draw) >= 1)

    // --- 2. TANTANGAN penuh sampai X menang ---
    sent.length = 0
    let ch = ttt.baseRoom(G, A_NUM, B_NUM, 'pvp')
    ch.names[A_NUM] = 'Andi'; ttt.putRoom(ch)
    await ttt.handleText(bob, {}, ctxFor(B_NUM, 'Budi', 'y', B_NUM))
    check('2. tantangan diterima', ttt.getRoom(ch.code).status === 'playing')
    for (const [who, mv] of [[A_NUM, '1'], [B_NUM, '5'], [A_NUM, '2'], [B_NUM, '6'], [A_NUM, '3']]) {
        await ttt.handleText(bob, {}, ctxFor(who, who === A_NUM ? 'Andi' : 'Budi', mv, who))
        await sleep(200)
    }
    check('2. X menang, room selesai', ttt.getRoom(ch.code).status === 'done')
    const winMsg = sent.map(s => s.text).reverse().find(t => /MENANG/.test(t))
    check('2. pengumuman menang + hadiah', !!winMsg && /\+2 poin/.test(winMsg))

    // --- 3. TOLAK ---
    let ch2 = ttt.baseRoom(G, A_NUM, B_NUM, 'pvp'); ttt.putRoom(ch2)
    await ttt.handleText(bob, {}, ctxFor(B_NUM, 'Budi', 'n', B_NUM))
    check('3. room selesai + pesan tolak',
        ttt.getRoom(ch2.code).status === 'done' && sent.some(s => /menolak/.test(s.text)))

    // --- 4. ILEGAL ---
    let ch3 = ttt.baseRoom(G, A_NUM, B_NUM, 'pvp')
    ch3.status = 'playing'; ttt.putRoom(ch3)
    await ttt.handleText(bob, {}, ctxFor(A_NUM, 'Andi', '1', A_NUM)); await sleep(200)
    sent.length = 0
    await ttt.handleText(bob, {}, ctxFor(B_NUM, 'Budi', '1', B_NUM))
    check('4a. kotak terisi ditolak', sent.some(s => /terisi/.test(s.text)))
    sent.length = 0
    await ttt.handleText(bob, {}, ctxFor(A_NUM, 'Andi', '2', A_NUM))
    check('4b. bukan giliran ditolak', sent.some(s => /Bukan giliran/.test(s.text)))
    ttt.endRoom(ch3.code)

    // --- 5. LINTAS CHAT ---
    sent.length = 0
    let rm = ttt.baseRoom(DMA, A_NUM, null, 'room')
    rm.o = null; rm.names[A_NUM] = 'Andi'; ttt.putRoom(rm)
    const rj = ttt.getRoom(rm.code)
    rj.o = B_NUM; rj.names[B_NUM] = 'Budi'; rj.chatB = DMB; rj.status = 'playing'; ttt.putRoom(rj)
    await ttt.handleText(bob, {}, ctxFor(A_PN, 'Andi', '5', A_NUM)); await sleep(200)
    check('5. broadcast kedua chat', !!boards(DMA).pop() && !!boards(DMB).pop())
    await ttt.handleText(bob, {}, ctxFor(DMB, 'Budi', '1', B_NUM)); await sleep(200)
    check('5. B melangkah dari chat lain', (boards(DMA).pop() || '').split('\n')[3].startsWith('⭕'))
    ttt.endRoom(rm.code)

    // --- 6. KEDALUWARSA + DB ---
    let old = ttt.baseRoom(G, A_NUM, B_NUM, 'pvp')
    old.createdAt = Date.now() - 200000; ttt.putRoom(old)
    check('6. basi disapu', ttt.sweepExpired().length === 1)
    const db = require('../lib/database').loadDB()
    check('7. db.ttt persist', !!(db.ttt && db.ttt.rooms && db.ttt.stats))

    console.log(`\nHASIL: ${pass} OK, ${fail} GAGAL`)
    for (const r of ttt.activeRooms()) ttt.endRoom(r.code)
    process.exit(fail ? 1 : 0)
})().catch(e => { console.log('FAIL:', e.message); process.exit(1) })
