const fs = require('fs')
const path = require('path')

const ANON_DB_PATH = path.join(__dirname, '..', 'assets', 'db', 'anon.json')

function loadAnon() {
    try {
        if (!fs.existsSync(ANON_DB_PATH)) {
            const initial = { waiting: [], sessions: [] }
            fs.mkdirSync(path.dirname(ANON_DB_PATH), { recursive: true })
            fs.writeFileSync(ANON_DB_PATH, JSON.stringify(initial, null, 2))
            return initial
        }
        const raw = fs.readFileSync(ANON_DB_PATH, 'utf8').trim()
        const data = raw ? JSON.parse(raw) : { waiting: [], sessions: [] }
        if (!Array.isArray(data.waiting)) data.waiting = []
        if (!Array.isArray(data.sessions)) data.sessions = []
        return data
    } catch (e) {
        console.error('[anonymous] Error reading anon.json:', e?.message || e)
        return { waiting: [], sessions: [] }
    }
}

function saveAnon(data) {
    try {
        fs.mkdirSync(path.dirname(ANON_DB_PATH), { recursive: true })
        fs.writeFileSync(ANON_DB_PATH, JSON.stringify(data, null, 2))
    } catch (e) {
        console.error('[anonymous] Error writing anon.json:', e?.message || e)
    }
}

function getSession(jid) {
    const data = loadAnon()
    return data.sessions.find(s => s.a === jid || s.b === jid) || null
}

function isWaiting(jid) {
    const data = loadAnon()
    return data.waiting.includes(jid)
}

async function startChat(bob, m, sender, reply) {
    if (m.isGroup) return reply('Fitur Anonymous Chat hanya dapat digunakan di Private Chat (PC).')
    const data = loadAnon()

    // 1. Cek apakah sudah dalam sesi
    const activeSession = data.sessions.find(s => s.a === sender || s.b === sender)
    if (activeSession) {
        return reply('⚠️ Kamu sedang berada dalam obrolan anonymous!\nKetik */next* untuk ganti partner atau */leave* / */stop* untuk mengakhiri.')
    }

    // 2. Cek apakah sudah dalam antrian
    if (data.waiting.includes(sender)) {
        return reply('🔍 Kamu sudah berada dalam antrian mencari partner.\nKetik */leave* atau */stop* untuk membatalkan.')
    }

    // 3. Jika ada user lain yang sedang menunggu
    if (data.waiting.length > 0) {
        const partner = data.waiting.shift()
        if (partner === sender) {
            // Safety check
            data.waiting.push(sender)
            saveAnon(data)
            return reply('🔍 Menunggu partner lain bergabung...')
        }

        const newSession = {
            id: 'anon_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            a: partner,
            b: sender,
            start: new Date().toISOString()
        }
        data.sessions.push(newSession)
        saveAnon(data)

        const matchMsg = `🎉 *Partner Ditemukan!*\n\nObrolan anonymous telah dimulai. Apa pun yang kamu kirim akan diteruskan ke partner.\n\n• Ketik */next* : Cari partner baru\n• Ketik */leave* atau */stop* : Akhiri obrolan`
        try {
            await bob.sendMessage(partner, { text: matchMsg })
        } catch (e) {
            console.log('[anonymous] Gagal mengirim pesan ke partner:', e?.message || e)
        }
        return reply(matchMsg)
    }

    // 4. Jika belum ada yang menunggu, masukkan ke antrian
    data.waiting.push(sender)
    saveAnon(data)
    return reply('🔍 *Mencari partner anonymous...*\nMohon tunggu hingga ada user lain yang bergabung.\n\nKetik */leave* atau */stop* untuk membatalkan pencarian.')
}

async function leaveChat(bob, m, sender, reply) {
    if (m.isGroup) return reply('Fitur Anonymous Chat hanya dapat digunakan di Private Chat (PC).')
    const data = loadAnon()

    // Cek antrian
    if (data.waiting.includes(sender)) {
        data.waiting = data.waiting.filter(u => u !== sender)
        saveAnon(data)
        return reply('❌ Pencarian partner anonymous telah dibatalkan.')
    }

    // Cek sesi aktif
    const sessionIndex = data.sessions.findIndex(s => s.a === sender || s.b === sender)
    if (sessionIndex !== -1) {
        const session = data.sessions[sessionIndex]
        const partner = session.a === sender ? session.b : session.a

        data.sessions.splice(sessionIndex, 1)
        saveAnon(data)

        try {
            await bob.sendMessage(partner, { text: '👋 *Partner telah keluar dari obrolan.*\n\nKetik */start* untuk mencari partner baru.' })
        } catch (e) {}

        return reply('👋 Kamu telah keluar dari obrolan anonymous.\nKetik */start* jika ingin mencari partner lagi.')
    }

    return reply('Kamu sedang tidak berada dalam sesi obrolan anonymous.\nKetik */start* untuk mencari partner.')
}

async function nextChat(bob, m, sender, reply) {
    if (m.isGroup) return reply('Fitur Anonymous Chat hanya dapat digunakan di Private Chat (PC).')
    const data = loadAnon()

    // Jika dalam sesi aktif, lepaskan partner lama
    const sessionIndex = data.sessions.findIndex(s => s.a === sender || s.b === sender)
    if (sessionIndex !== -1) {
        const session = data.sessions[sessionIndex]
        const partner = session.a === sender ? session.b : session.a

        data.sessions.splice(sessionIndex, 1)
        saveAnon(data)

        try {
            await bob.sendMessage(partner, { text: '👋 *Partner telah meninggalkan obrolan (next).*\n\nKetik */start* untuk mencari partner baru.' })
        } catch (e) {}
    } else {
        // Jika sedang waiting, hapus dulu agar di-requeue bersih
        data.waiting = data.waiting.filter(u => u !== sender)
        saveAnon(data)
    }

    // Langsung cari partner baru
    return startChat(bob, m, sender, reply)
}

async function relayMessage(bob, m, sender, session) {
    try {
        const partner = session.a === sender ? session.b : session.a
        if (!partner) return false

        // Teruskan pesan ke partner
        if (bob.copyNForward) {
            await bob.copyNForward(partner, m, false)
            return true
        } else {
            // Fallback teks jika forward tidak tersedia
            const body = m.text || m.body || ''
            if (body) {
                await bob.sendMessage(partner, { text: body })
                return true
            }
        }
    } catch (e) {
        console.error('[anonymous] Gagal relay pesan:', e?.message || e)
    }
    return false
}

module.exports = {
    loadAnon,
    saveAnon,
    getSession,
    isWaiting,
    startChat,
    leaveChat,
    nextChat,
    relayMessage
}
