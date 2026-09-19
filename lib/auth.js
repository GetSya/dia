// Auth register/login via website + verifikasi JVault (read-only).
//  - REGISTER: user diarahkan ke https://bot.arasyarafi.xyz?nomor=<nomor user>
//  - LOGIN:    cek nomor di bin verify:
//              https://jvault.aerialstudio.tech/api?bin_id=1971982d-eb61-456b-bd54-92ad885fa550&api_key=jv_59c80af7ea55b398e7e4ebaeb14eb5d6dc88772dd7245a8cb432c1d7f16a
//              Ada di users[] ({phone, registeredAt}) -> bisa login (di-cache).
//              Belum ada -> wajib register dulu, baru login.
const axios = require('axios')
const joDatabase = require('./database')

const REGISTER_BASE = (typeof global !== 'undefined' && (global.registWebsite || global.botWebsite)) || 'https://bot.arasyarafi.xyz'
const VERIFY_BIN_ID = (typeof global !== 'undefined' && global.authVerifyBinId) || '1971982d-eb61-456b-bd54-92ad885fa550'
const VERIFY_API = (typeof global !== 'undefined' && global.authVerifyApi) || 'https://jvault.aerialstudio.tech/api'

function apiKey() {
    try { require('../config') } catch {}
    if (typeof global !== 'undefined' && global.authVerifyApiKey) return global.authVerifyApiKey
    // fallback lama (sebelum migrasi config)
    if (typeof global !== 'undefined' && global.jvault && global.jvault.apiKey) return global.jvault.apiKey
    return 'jv_59c80af7ea55b398e7e4ebaeb14eb5d6dc88772dd7245a8cb432c1d7f16a'
}

function norm(v) {
    let n = String(v || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (n.startsWith('08')) n = '62' + n.slice(1)
    return n
}

function variantsOf(number) {
    const target = norm(number)
    const out = new Set([target])
    if (target.startsWith('62')) out.add('0' + target.slice(2))
    if (target.startsWith('0')) out.add('62' + target.slice(1))
    return out
}

function registerUrl(number) {
    const n = norm(number)
    const sep = REGISTER_BASE.includes('?') ? '&' : '?'
    return `${REGISTER_BASE}${sep}nomor=${encodeURIComponent(n)}`
}

// URL verifikasi persis seperti spec (bin_id + api_key sebagai query param)
function verifyUrl() {
    return `${VERIFY_API.replace(/\/$/, '')}?bin_id=${encodeURIComponent(VERIFY_BIN_ID)}&api_key=${encodeURIComponent(apiKey())}`
}

function unwrap(res) {
    const d = res && res.data
    if (d && typeof d === 'object' && d.data) return d.data
    if (d && typeof d === 'object' && d.record) return d.record
    return d
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
    return unwrap(res)
}

// Cari record user di users[] berdasarkan phone (08/62 toleran).
// Return { phone, registeredAt } bila ketemu, null bila tidak.
function findUserRecord(data, number) {
    const variants = variantsOf(number)
    const users = data && Array.isArray(data.users) ? data.users : []
    for (const u of users) {
        if (!u || typeof u !== 'object') continue
        const p = norm(u.phone || u.number || u.nomor || '')
        if (!p) continue
        for (const v of variants) {
            if (p === v) return { phone: String(u.phone || p), registeredAt: u.registeredAt || null }
        }
    }
    return null
}

// Cari nomor di struktur data apa pun (fallback bila format bin berubah).
function deepContains(data, number, seen = new Set()) {
    const variants = variantsOf(number)
    const target = norm(number)
    if (!target) return false
    const stack = [data]
    while (stack.length) {
        const cur = stack.pop()
        if (cur === null || cur === undefined) continue
        if (typeof cur === 'string' || typeof cur === 'number') {
            const digits = String(cur).replace(/[^0-9]/g, '')
            for (const v of variants) {
                if (digits === v || digits.endsWith(v) || v.endsWith(digits) && digits.length >= 9) return true
            }
            const s = String(cur)
            for (const v of variants) { if (s.includes(v)) return true }
            continue
        }
        if (typeof cur !== 'object') continue
        if (seen.has(cur)) continue
        seen.add(cur)
        if (Array.isArray(cur)) { for (const it of cur) stack.push(it); continue }
        for (const k of Object.keys(cur)) {
            const kd = String(k).replace(/[^0-9]/g, '')
            for (const v of variants) {
                if (kd === v || (kd.length >= 9 && (kd.endsWith(v) || v.endsWith(kd)))) return true
            }
            stack.push(cur[k])
        }
    }
    return false
}

async function isRegistered(number) {
    const data = await fetchVerifyBin()
    // utama: cocok persis di users[].phone
    if (findUserRecord(data, number)) return true
    // fallback: pencarian umum (tahan perubahan format bin)
    return deepContains(data, number)
}

async function getRegistration(number) {
    const data = await fetchVerifyBin()
    return findUserRecord(data, number)
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
    norm, registerUrl, verifyUrl, fetchVerifyBin, findUserRecord, deepContains,
    isRegistered, getRegistration,
    markVerified, isVerified, unmarkVerified,
}
