// TTS untuk chatbot --vn via TikTok TTS (id_001) — sesuai request user
const fs = require('fs')
const path = require('path')
const { config, createAudioFromText } = require('tiktok-tts')
const { toPTT } = require('./converter')

function getSession() {
    if (typeof global !== 'undefined' && global.tiktokSessionId) return global.tiktokSessionId
    return "090e661b1c1fe39deee032f958e1bc71"
}

function getSpeaker() {
    if (typeof global !== 'undefined' && global.chatbotVnSpeaker) return global.chatbotVnSpeaker
    return 'id_001'
}

async function ttsVoiceNote(text) {
    const clean = String(text || '').trim()
    if (!clean) throw new Error('Teks kosong')
    if (clean.length > 300) throw new Error('Teks terlalu panjang (max 300 karakter)')
    config(getSession())
    const speaker = getSpeaker()
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })
    const tmpBase = path.join(tmpDir, `tts_${Date.now()}_${Math.floor(Math.random() * 1e6)}`)
    try {
        await createAudioFromText(clean, tmpBase, speaker)
        const mp3Path = tmpBase + '.mp3'
        if (!fs.existsSync(mp3Path)) throw new Error('File mp3 tidak terbuat (session expired?)')
        const mp3Buf = fs.readFileSync(mp3Path)
        if (!mp3Buf.length) throw new Error('File mp3 kosong')
        // MP3 mentah tidak stabil sebagai VN di WA -> convert ke opus
        const opus = await toPTT(mp3Buf, 'mp3')
        return opus
    } finally {
        try { if (fs.existsSync(tmpBase + '.mp3')) fs.unlinkSync(tmpBase + '.mp3') } catch {}
    }
}

// compat: kode lama import ttsNahidaUrl — arahkan ke tiktok juga
async function ttsNahidaUrl(text) {
    // kembalikan path tmp mp3 agar kompatibel, tapi utama pakai ttsVoiceNote
    config(getSession())
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })
    const tmpBase = path.join(tmpDir, `tts_${Date.now()}_${Math.floor(Math.random() * 1e6)}`)
    await createAudioFromText(String(text || '').trim(), tmpBase, getSpeaker())
    return tmpBase + '.mp3'
}

module.exports = { ttsVoiceNote, ttsNahidaUrl }
