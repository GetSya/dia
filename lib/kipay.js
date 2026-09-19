/**
 * Kipay.id client (QRIS) — https://kipay.id/docs
 * Base: https://api.kipay.id ; key dipakai sebagai {apiKey} di path.
 * Semua request dari backend (bot), bukan dari user.
 */
const axios = require('axios')

const BASE_URL = 'https://api.kipay.id'

function apiKey() {
    try { require('../config') } catch {}
    if (typeof global !== 'undefined' && global.kipayApiKey) return String(global.kipayApiKey).trim()
    if (process.env.KIPAY_API_KEY) return String(process.env.KIPAY_API_KEY).trim()
    return ''
}

function txBase() {
    const key = apiKey()
    if (!key) throw new Error('Kipay API key belum dipasang (global.kipayApiKey / KIPAY_API_KEY).')
    return `${BASE_URL}/api/pay/${encodeURIComponent(key)}/transactions`
}

// POST /transactions {amount, note?} -> {trx_id, status, amount, qr_payload, qr_url, expires_at, ...}
async function createTransaction(amount, note = '') {
    amount = Math.floor(Number(amount) || 0)
    if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Nominal tidak valid.')
    const body = { amount }
    if (note) body.note = String(note).slice(0, 140)
    const res = await axios.post(txBase(), body, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        timeout: 20000, validateStatus: () => true
    })
    if (res.status === 201 || (res.status >= 200 && res.status < 300)) {
        const d = res.data || {}
        if (!d.trx_id) throw new Error('Respons Kipay tidak berisi trx_id.')
        return d
    }
    throw new Error(kipayErrorMessage(res.status, res.data))
}

// GET /transactions/{trxId} -> status terbaru
async function getTransaction(trxId) {
    if (!trxId) throw new Error('trx_id kosong.')
    const res = await axios.get(`${txBase()}/${encodeURIComponent(trxId)}`, {
        headers: { Accept: 'application/json' },
        timeout: 20000, validateStatus: () => true
    })
    if (res.status >= 200 && res.status < 300) return res.data || {}
    throw new Error(kipayErrorMessage(res.status, res.data))
}

// GET /transactions/{trxId}/qr.png -> Buffer PNG
async function getQrImage(trxOrUrl) {
    let url = trxOrUrl
    if (!/^https?:\/\//i.test(String(trxOrUrl || ''))) {
        url = `${txBase()}/${encodeURIComponent(trxOrUrl)}/qr.png`
    }
    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 20000, validateStatus: () => true })
    if (res.status >= 200 && res.status < 300 && res.data && res.data.length) return Buffer.from(res.data)
    throw new Error(`Gagal mengunduh QR Kipay (${res.status}).`)
}

function kipayErrorMessage(status, data) {
    let detail = ''
    try {
        if (data && typeof data === 'object') detail = data.message || data.error || JSON.stringify(data).slice(0, 200)
        else if (data) detail = String(data).slice(0, 200)
    } catch {}
    if (status === 400) return `Kipay 400: nominal tidak valid / QRIS belum diatur. ${detail}`.trim()
    if (status === 404) return `Kipay 404: API key salah / transaksi tidak ditemukan. ${detail}`.trim()
    if (status === 409) return `Kipay 409: unique_code gagal dibuat, coba lagi. ${detail}`.trim()
    return `Kipay error ${status}. ${detail}`.trim()
}

function formatRupiah(n) {
    return 'Rp' + Math.floor(Number(n) || 0).toLocaleString('id-ID')
}

module.exports = { BASE_URL, apiKey, txBase, createTransaction, getTransaction, getQrImage, formatRupiah }
