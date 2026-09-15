// Instagram downloader via https://api.siputzx.my.id/api/d/ummy?url=...
// (backend ummy — menangani signature server-side, verified working)
// Respons: { status:true, data:[{url:[{url,name,type,ext,quality}], meta, thumb}] }
//   -> post carousel: data = array; reels/video: data = object tunggal
const axios = require('axios')

const API_URL = 'https://api.siputzx.my.id/api/d/ummy'

function isValidInstagramUrl(url) {
    const patterns = [
        /^(https?:\/\/)?(www\.)?instagram\.com\/reel\/[a-zA-Z0-9_-]+\/?/i,
        /^(https?:\/\/)?(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/i,
        /^(https?:\/\/)?(www\.)?instagram\.com\/tv\/[a-zA-Z0-9_-]+\/?/i,
        /^(https?:\/\/)?(www\.)?instagram\.com\/stories\/[a-zA-Z0-9_.]+\/\d+\/?/i
    ]
    return patterns.some((p) => p.test(url || ''))
}

// Normalisasi link: buang query (?igshid, ?utm, ...) yang sering bikin gagal
function canonUrl(url) {
    try {
        const m = String(url).match(/instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/i)
        if (m) return `https://www.instagram.com/${m[1].toLowerCase()}/${m[2]}/`
        const s = String(url).match(/instagram\.com\/(stories\/[a-zA-Z0-9_.]+\/\d+)/i)
        if (s) return `https://www.instagram.com/${s[1]}`
    } catch {}
    return String(url).split('?')[0]
}

// Pilih format terbaik: mp4 kualitas tertinggi > gambar > lainnya
function pickFormat(formats) {
    if (!Array.isArray(formats) || !formats.length) return null
    const videos = formats.filter((f) => f && f.url && /mp4|video/i.test(`${f.type} ${f.ext} ${f.name}`))
    if (videos.length) {
        videos.sort((a, b) => (Number(b.quality) || 0) - (Number(a.quality) || 0))
        return { ...videos[0], kind: 'video' }
    }
    const images = formats.filter((f) => f && f.url && /webp|jpg|jpeg|png|image/i.test(`${f.type} ${f.ext} ${f.name}`))
    if (images.length) return { ...images[0], kind: 'image' }
    const any = formats.find((f) => f && f.url)
    return any ? { ...any, kind: 'file' } : null
}

async function igdl(url) {
    if (!isValidInstagramUrl(url)) throw new Error('Link Instagram tidak valid. Contoh: https://instagram.com/reel/xxxx')
    const canon = canonUrl(url)

    let res
    try {
        const r = await axios.get(API_URL, {
            params: { url: canon },
            timeout: 90000, validateStatus: () => true
        })
        res = r.data
    } catch (e) {
        throw new Error('Server downloader tidak merespons, coba lagi nanti.')
    }
    if (!res || res.status !== true || !res.data) {
        throw new Error('Gagal mengambil media. Pastikan link publik & benar.')
    }
    const rawItems = Array.isArray(res.data) ? res.data : [res.data]
    const medias = []
    for (const it of rawItems) {
        const fmt = pickFormat(it.url)
        if (!fmt) continue
        medias.push({
            url: fmt.url,
            kind: fmt.kind,
            ext: fmt.ext || '',
            title: (it.meta && it.meta.title) || '',
            uploader: (it.meta && (it.meta.username || it.meta.source)) || 'Unknown',
            thumb: it.thumb || ''
        })
        if (medias.length >= 10) break
    }
    if (!medias.length) throw new Error('Tidak ada media yang bisa diunduh dari link ini.')

    const first = medias[0]
    return {
        title: first.title || 'Instagram Media',
        uploader: first.uploader,
        thumbnail: first.thumb,
        medias
    }
}

module.exports = { igdl, isValidInstagramUrl, canonUrl, API_URL }
