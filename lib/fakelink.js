// ============================================================
// Kirim pesan biasa dengan link preview PALSU (custom judul,
// deskripsi & thumbnail) — tanpa fetch ke URL aslinya.
// Adaptasi pola Termai (prepareWAMessageMedia + linkPreview)
// ke Baileys repo ini (bob.sendMessage).
// ============================================================
const { getBaileys } = require('./ourin')
const { getBuffer } = require('./function')
const fs = require('fs')

// Cache hasil upload thumbnail (imageMessage) per sumber —
// NOTE: yang di-cache hanya media upload, BUKAN keseluruhan preview,
// karena title/description bisa beda tiap pesan dengan URL+thumb yang sama.
const _thumbCache = {}

async function getThumbMedia(bob, { thumbUrl, thumbBuffer }) {
    const cacheKey = thumbBuffer ? null : (thumbUrl || '')
    if (cacheKey && _thumbCache[cacheKey]) return _thumbCache[cacheKey]

    let rawBuf = thumbBuffer || null
    if (!rawBuf && thumbUrl) {
        try {
            // URL remote (wajib http/https) ATAU path file lokal
            if (/^https?:\/\//i.test(thumbUrl)) rawBuf = await getBuffer(thumbUrl)
            else if (fs.existsSync(thumbUrl)) rawBuf = fs.readFileSync(thumbUrl)
        } catch {}
    }

    let imgMsg = null
    if (rawBuf) {
        try {
            const { prepareWAMessageMedia } = getBaileys()
            const upload = bob.waUploadToServer
                ? bob.waUploadToServer.bind(bob)
                : undefined
            const resMedia = await prepareWAMessageMedia(
                { image: rawBuf },
                { upload, mediaTypeOverride: 'thumbnail-link' }
            )
            if (resMedia && resMedia.imageMessage) imgMsg = resMedia.imageMessage
        } catch (e) { console.log('[fakelink] prepare media gagal:', e?.message || e) }
    }

    const out = { imgMsg, rawBuf }
    if (cacheKey) _thumbCache[cacheKey] = out
    return out
}

async function buildLinkPreview(bob, { url, title, description, thumbUrl, thumbBuffer }) {
    const { imgMsg, rawBuf } = await getThumbMedia(bob, { thumbUrl, thumbBuffer })
    const preview = {
        'matched-text': url,
        title: title || url,
        description: description || '',
        jpegThumbnail: imgMsg && imgMsg.jpegThumbnail
            ? Buffer.from(imgMsg.jpegThumbnail)
            : rawBuf || undefined,
        highQualityThumbnail: imgMsg
            ? { ...imgMsg, width: 1280, height: 720 }
            : undefined
    }
    return preview
}

// text default: "<url>\n<body>" ; quoted opsional (objek pesan m)
async function sendFakeLink(bob, jid, { url, title, description, thumbUrl, thumbBuffer, text, body, quoted, mentions }) {
    if (!url) throw new Error('URL wajib diisi')
    const linkPreview = await buildLinkPreview(bob, { url, title, description, thumbUrl, thumbBuffer })
    const msgText = text || `${url}\n${body || ''}`.trim()
    const content = { text: msgText, linkPreview }
    if (Array.isArray(mentions) && mentions.length) content.mentions = mentions
    return bob.sendMessage(jid, content, quoted ? { quoted } : {})
}

module.exports = { buildLinkPreview, sendFakeLink }
