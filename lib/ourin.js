/**
 * Bridge CJS -> ESM untuk ourin-baileys (ESM-only, ada top-level await
 * sehingga tidak bisa di-require langsung dari project CommonJS ini).
 *
 * Pakai:
 *   const { loadBaileys } = require('./lib/ourin')
 *   const Baileys = await loadBaileys() // dynamic import('ourin-baileys')
 *
 * Modul lain (control.js, lib/function.js) yang butuh konstanta Baileys
 * (proto, delay, getContentType, dll) WAJIB ambil lewat getBaileys()
 * setelah index.js memanggil loadBaileys(), bukan via require statis.
 */

// Custom pairing code yang diminta user: tampil "RSYA-RAFI".
// WhatsApp / ourin-baileys hanya menerima 8 karakter tanpa tanda hubung,
// jadi yang dikirim ke server adalah "RSYARAFI".
const CUSTOM_PAIRING_DISPLAY = 'RSYA-RAFI'
const CUSTOM_PAIRING_RAW = CUSTOM_PAIRING_DISPLAY.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

if (CUSTOM_PAIRING_RAW.length !== 8) {
    throw new Error(`CUSTOM_PAIRING_RAW harus tepat 8 karakter, dapat: "${CUSTOM_PAIRING_RAW}"`)
}

function formatPairingCode(code) {
    if (!code) return code
    const raw = String(code).replace(/[^A-Za-z0-9]/g, '').toUpperCase()
    if (raw.length === 8) return `${raw.slice(0, 4)}-${raw.slice(4)}`
    return String(code)
}

let cached = null

async function loadBaileys() {
    if (cached) return cached
    cached = await import('ourin-baileys')
    global.Baileys = cached
    return cached
}

// Dipanggil dari modul CJS lain SETELAH loadBaileys() selesai di index.js.
// Tidak boleh dipanggil saat top-level require sebelum Baileys dimuat.
function getBaileys() {
    const b = cached || global.Baileys
    if (!b) {
        throw new Error(
            'ourin-baileys belum dimuat. Pastikan index.js sudah memanggil await loadBaileys() sebelum modul ini dipakai.'
        )
    }
    return b
}

/**
 * Pengganti makeInMemoryStore() yang TIDAK lagi disediakan ourin-baileys.
 * Menyediakan API minimal yang dipakai bot ini:
 *  - store.contacts (object)
 *  - store.bind(ev)
 *  - store.loadMessage(remoteJid, id)
 */
function makeSimpleStore() {
    const messages = new Map()
    const contacts = {}
    const chats = new Map()

    const keyOf = (jid, id) => `${jid}|${id}`

    const saveMessage = (msg) => {
        try {
            const jid = msg?.key?.remoteJid
            const id = msg?.key?.id
            if (jid && id) messages.set(keyOf(jid, id), msg)
        } catch { /* abaikan */ }
    }

    return {
        contacts,
        chats,
        bind(ev) {
            ev.on('messages.upsert', ({ messages: msgs }) => {
                if (Array.isArray(msgs)) msgs.forEach(saveMessage)
            })
            ev.on('messages.update', (updates) => {
                if (Array.isArray(updates)) {
                    for (const u of updates) {
                        const jid = u?.key?.remoteJid
                        const id = u?.key?.id
                        if (jid && id && messages.has(keyOf(jid, id))) {
                            const prev = messages.get(keyOf(jid, id))
                            messages.set(keyOf(jid, id), { ...prev, ...u })
                        }
                    }
                }
            })
            ev.on('contacts.upsert', (list) => {
                if (Array.isArray(list)) {
                    for (const c of list) {
                        if (c?.id) contacts[c.id] = { ...(contacts[c.id] || {}), ...c }
                    }
                }
            })
            ev.on('chats.upsert', (list) => {
                if (Array.isArray(list)) {
                    for (const c of list) {
                        if (c?.id) chats.set(c.id, c)
                    }
                }
            })
        },
        async loadMessage(remoteJid, id) {
            return messages.get(keyOf(remoteJid, id)) || null
        },
    }
}

module.exports = {
    CUSTOM_PAIRING_DISPLAY,
    CUSTOM_PAIRING_RAW,
    formatPairingCode,
    loadBaileys,
    getBaileys,
    makeSimpleStore,
}
