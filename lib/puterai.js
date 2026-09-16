// ============================================================
// AI via Puter.js (https://developer.puter.com) — gratis,
// tanpa API key. Auth: token akun Puter pemilik bot (sekali
// login via: node scratch/puter-login.js).
//
// Sesi percakapan (conversations):
//  - Private chat -> 1 sesi per NOMOR HP pengirim
//  - Grup         -> 1 sesi per ID GRUP (AI ingat obrolan grup,
//                     tiap pesan user diawali nama pengirim)
// Riwayat disimpan di assets/db/puterai.json (maks 20 pesan/sesi).
// ============================================================
const fs = require('fs')
const path = require('path')

const SESS_PATH = path.join(__dirname, '..', 'assets', 'db', 'puterai.json')
const TOKEN_FILE = path.join(__dirname, '..', 'session', 'puter-token.txt')

const MODEL = process.env.PUTER_MODEL || 'openai/gpt-5.4-nano'
const MAX_HISTORY = 20 // jumlah pesan (user+assistant) per sesi

const SYSTEM_PROMPT =
    'Kamu adalah AI dengan persona anak Gen Z Indonesia. ' +
    'Gaya komunikasi: santai, natural, dan terasa seperti ngobrol dengan teman. ' +
    'Gunakan bahasa Indonesia sehari-hari, bukan bahasa formal atau kaku. ' +
    'Boleh menggunakan slang Gen Z seperti "wkwk", "anjir", "gila sih", "valid", "literally", "relate", "gas", "btw", "ngl", "fr", "bro", "bestie", dan sejenisnya, tetapi jangan dipaksakan. ' +
    'Sesuaikan slang dengan konteks. Jangan setiap kalimat memakai slang. ' +
    'Gunakan lowercase sesekali jika membuat percakapan terasa lebih natural. ' +
    'Boleh mencampur bahasa Indonesia dan Inggris secara ringan (Indo-English), seperti percakapan Gen Z di media sosial. ' +
    'Hindari bahasa yang terlalu textbook, terlalu korporat, atau terdengar seperti robot. ' +
    'Respons harus terasa spontan, human-like, dan punya personality. ' +
    'Cara merespons: jawab langsung ke inti. Jangan terlalu panjang kecuali pengguna meminta penjelasan detail. ' +
    'Kalau pengguna bercanda, tanggapi dengan humor yang sesuai. ' +
    'Kalau pengguna sedang serius, tetap santai tetapi responsif dan empatik. ' +
    'Aturan emoji KETAT: default TANPA emoji sama sekali. Hanya pakai maksimal 1 emoji ' +
    'bila benar-benar menambah makna atau emosi, bukan sebagai hiasan. ' +
    'Jangan pernah memakai emoji senyum (seperti 😊 🙂 😁) saat bercanda atau ngobrol santai — ' +
    'emoji senyum HANYA dipakai untuk membalas orang yang bahasanya formal/baku. ' +
    'Jangan menempel emoji di setiap kalimat. Jangan menggunakan slang yang terasa dipaksakan atau cringe. ' +
    'Jangan berpura-pura menjadi manusia; tetap transparan bahwa kamu adalah AI jika ditanya. ' +
    'Jangan selalu setuju dengan pengguna. Jika ada informasi yang salah, koreksi dengan cara yang santai dan tidak menggurui. ' +
    'Gunakan analogi, contoh, atau punchline jika membantu menjelaskan sesuatu. ' +
    'Personality: friendly, witty, sedikit playful, cepat nangkep konteks, tidak menghakimi, percaya diri tapi tidak sok tahu, terasa seperti teman ngobrol yang smart. ' +
    'Di grup WhatsApp, pesan user diawali nama pengirim seperti "Rafi: halo" agar kamu ingat siapa berkata apa. ' +
    'PENTING: jangan pernah mengawali jawabanmu dengan nama orang + titik dua (misal "Rafi: ..."). Jawab langsung.'

let _puter = null

function getToken() {
    if (typeof global.puterToken === 'string' && global.puterToken.trim()) {
        return global.puterToken.trim()
    }
    if (process.env.PUTER_TOKEN && process.env.PUTER_TOKEN.trim()) {
        return process.env.PUTER_TOKEN.trim()
    }
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            const t = fs.readFileSync(TOKEN_FILE, 'utf8').trim()
            if (t) return t
        }
    } catch {}
    return null
}

async function getPuter() {
    if (_puter) return _puter
    const token = getToken()
    if (!token) {
        throw new Error(
            'Token Puter belum dipasang. Login sekali via: node scratch/puter-login.js ' +
            '(atau isi env PUTER_TOKEN)'
        )
    }
    const { init } = require('@heyputer/puter.js/src/init.cjs')
    _puter = init(token)
    return _puter
}

function loadStore() {
    try {
        if (!fs.existsSync(SESS_PATH)) return { sessions: {} }
        const raw = fs.readFileSync(SESS_PATH, 'utf8').trim()
        const d = raw ? JSON.parse(raw) : { sessions: {} }
        if (!d.sessions) d.sessions = {}
        return d
    } catch {
        return { sessions: {} }
    }
}

function saveStore(d) {
    try { fs.writeFileSync(SESS_PATH, JSON.stringify(d, null, 2)) } catch {}
}

function getHistory(key) {
    const d = loadStore()
    return Array.isArray(d.sessions[key]) ? d.sessions[key] : []
}

function pushHistory(key, role, content) {
    const d = loadStore()
    const h = Array.isArray(d.sessions[key]) ? d.sessions[key] : []
    h.push({ role, content: String(content || '').slice(0, 4000), ts: Date.now() })
    while (h.length > MAX_HISTORY) h.shift()
    d.sessions[key] = h
    saveStore(d)
}

function resetSession(key) {
    const d = loadStore()
    delete d.sessions[key]
    saveStore(d)
}

function escapeRegExp(s) {
    return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Buang awalan "Nama: " bila AI meniru format nama pengirim di jawabannya.
// Hanya nama pengirim saat ini (who) yang dibuang — isi lain tidak disentuh.
function stripNamePrefix(reply, who) {
    if (!reply || !who) return reply
    const re = new RegExp('^' + escapeRegExp(who.trim()) + '\\s*:\\s*', 'i')
    return String(reply).replace(re, '')
}

function extractText(res) {
    if (!res) return ''
    if (typeof res === 'string') return res
    try {
        const m = res.message || res
        const c = m.content
        if (typeof c === 'string') return c
        if (Array.isArray(c)) {
            return c.map(p => (typeof p === 'string' ? p : (p && (p.text || p.content)) || '')).join('')
        }
        if (typeof res.text === 'string') return res.text
        return ''
    } catch {
        return ''
    }
}

// key: nomor HP (private) atau JID grup. who: nama pengirim (grup) —
// ditempel di depan pesan agar AI ingat siapa berkata apa.
async function chat(key, text, { who = '', model = MODEL } = {}) {
    if (!text || !String(text).trim()) throw new Error('Pesan kosong')
    const puter = await getPuter()
    const userLine = who ? `${who}: ${text}` : String(text)
    const history = getHistory(key)
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: userLine }
    ]
    const res = await puter.ai.chat(messages, { model })
    let reply = extractText(res).trim()
    if (!reply) throw new Error('AI mengembalikan jawaban kosong')
    reply = stripNamePrefix(reply, who)
    pushHistory(key, 'user', userLine)
    pushHistory(key, 'assistant', reply)
    return reply
}

// Pemakaian bulan berjalan (untuk pantau kuota). { total, allowanceUsed }
async function getUsage() {
    const puter = await getPuter()
    const m = await puter.auth.getMonthlyUsage()
    const u = (m && m.usage) || m || {}
    const num = (v) => { const n = Number(v); return isFinite(n) ? n : 0 }
    return { total: num(u.total), allowanceUsed: num(u.allowanceUsed !== undefined ? u.allowanceUsed : u.total), raw: u }
}

module.exports = { chat, resetSession, getHistory, pushHistory, getToken, getUsage, stripNamePrefix, MODEL, MAX_HISTORY }
