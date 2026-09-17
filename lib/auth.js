// Sistem auth baru (pengganti login.json / register.json):
//  - REGISTER: user diarahkan ke https://bot.acamedia.xyz?nomor=<nomor>
//  - LOGIN:    cek nomor di JVault bin 1971982d-eb61-456b-bd54-92ad885fa550.
//              Ada -> login sukses (di-cache di database.json). Belum -> suruh daftar ulang.
const axios = require('axios')
const joDatabase = require('./database')

const REGISTER_BASE = (typeof global !== 'undefined' && (global.registWebsite || global.botWebsite)) || 'https://bot.acamedia.xyz'
const VERIFY_BIN_ID = (typeof global !== 'undefined' && global.authVerifyBinId) || '1971982d-eb61-456b-bd54-92ad885fa550'
const VERIFY_API = (typeof global !== 'undefined' && global.authVerifyApi) || 'https://jvault.aerialstudio.tech/api'

function norm(v) {
    let n = String(v || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (n.startsWith('08')) n = '62' + n.slice(1)
    return n
}

function registerUrl(number) {
    const n = norm(number)
    const sep = REGISTER_BASE.includes('?') ? '&' : '?'
    return `${REGISTER_BASE}${sep}nomor=${encodeURIComponent(n)}`
}

function verifyUrl() {
    return `${VERIFY_API.replace(/\/$/, '')}?bin_id=${encodeURIComponent(VERIFY_BIN_ID)}`
}

function apiKey() {
    try { require('../config') } catch {}
    if (typeof global !== 'undefined' && global.jvault && global.jvault.apiKey) return global.jvault.apiKey
    return null
}

// Cari nomor di struktur data apa pun (objek/array/string) secara rekursif.
// Cocok bila digit yang dinormalisasi sama, atau mengandung nomor tersebut.
function deepContains(data, number, seen = new Set()) {
    const target = norm(number)
    if (!target) return false
    const variants = new Set([target])
    if (target.startsWith('62')) variants.add('0' + target.slice(2))
    if (target.startsWith('0')) variants.add('62' + target.slice(1))

    const stack = [data]
    while (stack.length) {
        const cur = stack.pop()
        if (cur === null || cur === undefined) continue
        if (typeof cur === 'string' || typeof cur === 'number') {
            const digits = String(cur).replace(/[^0-9]/g, '')
            for (const v of variants) {
                if (digits === v || digits.endsWith(v) || v.endsWith(digits) && digits.length >= 9) return true
            }
            // cocokkan juga JID utuh ("628x...@s.whatsapp.net" / "@lid")
            const s = String(cur)
            for (const v of variants) { if (s.includes(v)) return true }
            continue
        }
        if (typeof cur !== 'object') continue
        if (seen.has(cur)) continue
        seen.add(cur)
        if (Array.isArray(cur)) { for (const it of cur) stack.push(it); continue }
        for (const k of Object.keys(cur)) {
            // key seperti "62812...@s.whatsapp.net" langsung cocok
            const kd = String(k).replace(/[^0-9]/g, '')
            for (const v of variants) {
                if (kd === v || (kd.length >= 9 && (kd.endsWith(v) || v.endsWith(kd)))) return true
            }
            stack.push(cur[k])
        }
    }
    return false
}

async function fetchVerifyBin() {
    const key = apiKey()
    const headers = { 'User-Agent': 'JOJO-BOT/1.0' }
    if (key) {
        headers['x-api-key'] = key
        headers['apikey'] = key
        headers['Authorization'] = `Bearer ${key}`
    }
    const res = await axios.get(verifyUrl(), { headers, timeout: 15000, validateStatus: () => true })
    if (res.status < 200 || res.status >= 300) throw new Error(`JVault verify ${res.status}`)
    const d = res.data
    if (d && typeof d === 'object' && d.data) return d.data
    if (d && typeof d === 'object' && d.record) return d.record
    return d
}

async function isRegistered(number) {
    const data = await fetchVerifyBin()
    return deepContains(data, number)
}

// Cache hasil login sukses di database.json agar tidak hit API tiap command.
// Tidak menggantikan JVault — hanya cache. Login ulang = cek ulang ke JVault.
function markVerified(number, name = '') {
    const db = joDatabase.loadDB()
    if (!db.verifiedUsers) db.verifiedUsers = {}
    const n = norm(number)
    db.verifiedUsers[n] = { number: n, name: String(name || ''), at: new Date().toISOString() }
    joDatabase.saveDB()
    return db.verifiedUsers[n]
}

function isVerified(number) {
    try {
        const db = joDatabase.loadDB()
        return !!(db.verifiedUsers && db.verifiedUsers[norm(number)])
    } catch { return false }
}

function unmarkVerified(number) {
    try {
        const db = joDatabase.loadDB()
        if (db.verifiedUsers && db.verifiedUsers[norm(number)]) {
            delete db.verifiedUsers[norm(number)]
            joDatabase.saveDB()
            return true
        }
    } catch {}
    return false
}

module.exports = {
    REGISTER_BASE, VERIFY_BIN_ID, VERIFY_API,
    norm, registerUrl, verifyUrl, fetchVerifyBin, deepContains,
    isRegistered, markVerified, isVerified, unmarkVerified,
}
