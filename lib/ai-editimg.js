// ╔══════════════════════════════════════════════════╗
// ║  AI EDITIMG - antrian per chat + jatah per user ║
// ║  (port CJS dari handler ESM ai-editimg.js)      ║
// ╚══════════════════════════════════════════════════╝
const joDatabase = require('./database')

// ── ANTRIAN GILIRAN (per chat) ──────────────────────────────
const chatQueues = new Map() // chatId -> { tail: Promise, waiting: number }
const MAKS_ANTRI = 3

function ambilSlot(chatId) {
    let state = chatQueues.get(chatId)
    if (!state) {
        state = { tail: Promise.resolve(), waiting: 0 }
        chatQueues.set(chatId, state)
    }
    if (state.waiting >= MAKS_ANTRI) return null // antrian penuh

    state.waiting++
    const position = state.waiting
    const prev = state.tail
    let done
    const mine = new Promise((res) => { done = res })
    state.tail = prev.then(() => mine)

    return {
        prev, // await ini = tunggu giliran
        position, // nomor antrian (1 = langsung jalan)
        release: () => {
            state.waiting--
            done()
            if (state.waiting <= 0) {
                queueMicrotask(() => { if (state.waiting <= 0) chatQueues.delete(chatId) })
            }
        }
    }
}
// ─────────────────────────────────────────────────────────────

// ── BATAS PAKAI (per user, tersimpan di database.json) ───────
// 5x dalam 6 jam. Owner = unlimited.
const BATAS_PAKAI = 5
const WINDOW_MS = 6 * 60 * 60 * 1000 // 6 jam

function getUsage(user) {
    if (!user.editimgUsage || typeof user.editimgUsage !== 'object') {
        user.editimgUsage = { count: 0, reset: 0 }
    }
    const now = Date.now()
    if (now >= (user.editimgUsage.reset || 0)) {
        user.editimgUsage.count = 0
        user.editimgUsage.reset = now + WINDOW_MS
    }
    return user.editimgUsage
}

function sisaWaktu(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000))
    const h = Math.floor(s / 3600)
    const min = Math.floor((s % 3600) / 60)
    if (h > 0) return `${h} jam ${min} menit`
    if (min > 0) return `${min} menit`
    return `${s} detik`
}

function getUser(jid) {
    const db = joDatabase.loadDB()
    if (!db.users) db.users = {}
    if (!db.users[jid]) db.users[jid] = { jid, number: String(jid).split('@')[0], name: String(jid).split('@')[0] }
    return db.users[jid]
}

// Cek saja (tidak memotong)
function peekQuota(jid, isOwner) {
    if (isOwner) return { ok: true, sisa: Infinity, resetMs: 0 }
    const user = getUser(jid)
    const usage = getUsage(user)
    if (usage.count >= BATAS_PAKAI) return { ok: false, sisa: 0, resetMs: usage.reset - Date.now() }
    return { ok: true, sisa: BATAS_PAKAI - usage.count, resetMs: usage.reset - Date.now() }
}

// Cek + potong atomik (dipanggil saat giliran tiba). Return { ok, sisa, resetMs }
function consumeQuota(jid, isOwner) {
    if (isOwner) return { ok: true, sisa: Infinity, resetMs: 0 }
    const user = getUser(jid)
    const usage = getUsage(user)
    if (usage.count >= BATAS_PAKAI) return { ok: false, sisa: 0, resetMs: usage.reset - Date.now() }
    usage.count++
    try { joDatabase.saveDB() } catch {}
    return { ok: true, sisa: BATAS_PAKAI - usage.count, resetMs: usage.reset - Date.now() }
}

module.exports = { ambilSlot, MAKS_ANTRI, BATAS_PAKAI, WINDOW_MS, getUsage, sisaWaktu, peekQuota, consumeQuota }
