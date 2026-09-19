/**
 * Sesi input multi-langkah (pengganti ketik command panjang).
 * Contoh: /transfer tanpa argumen -> bot tanya target -> user jawab ->
 *          bot tanya jumlah -> user jawab -> transfer dieksekusi.
 * In-memory (hilang saat restart), kedaluwarsa otomatis. Ketik "batal" untuk keluar.
 */
const _sessions = new Map() // sender -> { type, step, data, expiresAt }

const DEFAULT_TTL_MS = 3 * 60 * 1000
const CANCEL_WORDS = new Set(['batal', 'cancel', 'gajadi', 'ga jadi', 'tidak'])

function setPending(sender, type, data = {}, ttlMs = DEFAULT_TTL_MS) {
    _sessions.set(sender, { type, step: data.step || 0, data, expiresAt: Date.now() + ttlMs })
    return _sessions.get(sender)
}

function getPending(sender) {
    const s = _sessions.get(sender)
    if (!s) return null
    if (Date.now() > s.expiresAt) { _sessions.delete(sender); return null }
    return s
}

function clearPending(sender) {
    return _sessions.delete(sender)
}

function isCancel(text) {
    return CANCEL_WORDS.has(String(text || '').trim().toLowerCase())
}

// Ambil angka positif dari teks bebas ("10", "10 poin", "Rp 5.000" -> 5000)
function parseAmount(text) {
    const m = String(text || '').replace(/[^0-9]/g, '')
    if (!m) return 0
    const n = parseInt(m, 10)
    return Number.isSafeInteger(n) ? n : 0
}

module.exports = { setPending, getPending, clearPending, isCancel, parseAmount, DEFAULT_TTL_MS }
