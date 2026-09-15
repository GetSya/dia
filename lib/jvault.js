const axios = require('axios')

function cfg() {
    try { require('../config') } catch {}
    const j = global.jvault || {}
    return {
        binId: j.binId || '255feaaa-e64c-4b4e-b2de-5f2ec0ee54b3',
        apiKey: j.apiKey || 'jv_59c80af7ea55b398e7e4ebaeb14eb5d6dc88772dd7245a8cb432c1d7f16a',
        url: j.url || 'https://jvault.aerialstudio.tech/api'
    }
}

function buildUrl() {
    const { url, binId } = cfg()
    return `${url.replace(/\/$/, '')}?bin_id=${encodeURIComponent(binId)}`
}

function headers() {
    const { apiKey } = cfg()
    return {
        'x-api-key': apiKey,
        'apikey': apiKey,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'JOJO-BOT/1.0'
    }
}

async function fetchBin() {
    try {
        const res = await axios.get(buildUrl(), { headers: headers(), timeout: 12000, validateStatus: () => true })
        if (res.status >= 200 && res.status < 300) {
            const d = res.data
            if (d && typeof d === 'object' && d.data) return d.data
            if (d && typeof d === 'object' && d.record) return d.record
            return d
        }
        // JVault kadang bungkus { success, data }
        if (res.data && res.data.data) return res.data.data
        return null
    } catch (e) {
        console.log('[jvault] fetch gagal:', e.message)
        return null
    }
}

async function pushBin(payload) {
    // hanya kirim users + sticker (tanpa pesan), sesuai permintaan
    try {
        const body = { data: payload }
        const res = await axios({
            method: 'PUT',
            url: buildUrl(),
            headers: headers(),
            data: body,
            timeout: 15000,
            validateStatus: () => true
        })
        if (res.status >= 200 && res.status < 300) return true
        // fallback POST
        if (res.status === 404 || res.status === 405) {
            const r2 = await axios.post(buildUrl(), body, { headers: headers(), timeout: 15000, validateStatus: () => true })
            return r2.status >= 200 && r2.status < 300
        }
        console.log('[jvault] push status', res.status, JSON.stringify(res.data).slice(0, 300))
        return false
    } catch (e) {
        console.log('[jvault] push gagal:', e.message)
        return false
    }
}

async function syncUsers(users, sticker, groups) {
    const payload = {
        users,
        sticker: sticker || {},
        groups: groups || {},
        updatedAt: new Date().toISOString()
    }
    return await pushBin(payload)
}

module.exports = { fetchBin, pushBin, syncUsers, buildUrl }
