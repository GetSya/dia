// ╔══════════════════════════════════════════════════╗
// ║        AI TAG BOT - JOJO BOT (CJS port)          ║
// ║  Tag nomor bot -> bot menjawab via Gemini AI     ║
// ║  Reply pesan AI bot -> lanjut obrolan            ║
// ╚══════════════════════════════════════════════════╝
const axios = require('axios')
const { execFile } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const execFileAsync = promisify(execFile)

// ── KONFIG ──────────────────────────────────────
const GEMINI_COOKIE = 'sidts-CjIBXMw41UT6szxuJ-l_JdAeBV0yOEXrWgCgVwUCqkEGd2r8h2gFCNogjwEBKa_9PjtW_RAA'
const PROMPT_SYSTEM = 'kamu adalah jojo, bot whatsapp yang ramah, santai, dan helpful. Bahasa: Indonesia santai. ATURAN UTAMA: jawab SESINGKAT mungkin — langsung ke inti jawaban, tanpa basa-basi, tanpa kalimat pembuka atau penutup yang tidak perlu. Default maksimal 1-3 kalimat pendek. Jangan gunakan format markdown berlebihan (tanpa heading, tanpa daftar panjang, tanpa bold di mana-mana) kecuali diminta. KECUALI: jika user secara eksplisit meminta penjelasan detail — misalnya dengan kata "jelaskan", "jelaskan secara detail", "elaborasikan", "panjang", "lengkap", "step by step" — maka jawab SELENGKAP dan SEDETAIL mungkin dengan struktur yang rapi. Jangan pernah menyebut kamu AI atau model bahasa kecuali ditanya.'
// ─────────────────────────────────────────────────

const cooldown = new Map() // sender -> timestamp (anti spam / flood API)
const COOLDOWN_MS = 5000

// ID pesan jawaban AI bot -> timestamp (deteksi reply lanjutan)
const aiReplies = new Map()
const AI_REPLY_TTL_MS = 15 * 60 * 1000
const AI_REPLY_MAX = 200

function rememberAiReply(msgId) {
    if (!msgId) return
    const now = Date.now()
    for (const [id, ts] of aiReplies) {
        if (now - ts > AI_REPLY_TTL_MS) aiReplies.delete(id)
    }
    while (aiReplies.size >= AI_REPLY_MAX) {
        aiReplies.delete(aiReplies.keys().next().value)
    }
    aiReplies.set(msgId, now)
}

function isAiReply(quotedId) {
    if (!quotedId) return false
    const ts = aiReplies.get(quotedId)
    if (!ts) return false
    if (Date.now() - ts > AI_REPLY_TTL_MS) {
        aiReplies.delete(quotedId)
        return false
    }
    return true
}

// Ambil nomor dari JID (buang device id ":xx" & domain)
const num = (jid = '') => String(jid).split('@')[0].split(':')[0].replace(/[^0-9]/g, '')

// ── TTS: jawaban AI -> voice note (default model ana: pelan & natural) ──
const TTS_MODEL = (typeof global !== 'undefined' && global.chatbotVnModel) || 'ana'
const TTS_FALLBACKS = ['ana', 'nami', 'elon_musk', 'nahida']
async function ttsNahidaUrl(text, model = TTS_MODEL) {
    const res = await axios.get('https://api-faa.my.id/faa/tts-legkap', {
        params: { text }, timeout: 30000, validateStatus: () => true
    })
    if (res.status !== 200) throw new Error(`TTS API ${res.status}`)
    const list = res.data?.result || []
    let pick = list.find?.((r) => r?.model === model && r?.url)
    if (!pick?.url) {
        for (const m of TTS_FALLBACKS) {
            pick = list.find?.((r) => r?.model === m && r?.url)
            if (pick?.url) break
        }
    }
    if (!pick?.url) throw new Error(`Model ${model} gagal generate suara`)
    return pick.url
}

async function ttsVoiceNote(text) {
    const url = await ttsNahidaUrl(text)
    const dl = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000, validateStatus: () => true })
    if (dl.status !== 200) throw new Error('Download hasil TTS gagal')
    const wav = Buffer.from(dl.data)
    if (!wav.length) throw new Error('File TTS kosong')
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })
    const base = path.join(tmpDir, `tts_${Date.now()}_${Math.floor(Math.random() * 1e6)}`)
    const inWav = base + '.wav'
    const outOgg = base + '.ogg'
    try {
        fs.writeFileSync(inWav, wav)
        const tempo = (typeof global !== 'undefined' && Number(global.chatbotVnTempo)) || 0.9
        await execFileAsync('ffmpeg', ['-y', '-loglevel', 'error', '-i', inWav, '-filter:a', `atempo=${tempo}`, '-c:a', 'libopus', '-b:a', '48k', '-f', 'ogg', outOgg])
        if (!fs.existsSync(outOgg)) throw new Error('Konversi opus gagal')
        const ogg = fs.readFileSync(outOgg)
        if (!ogg?.length) throw new Error('Hasil opus kosong')
        return ogg
    } finally {
        for (const p of [inWav, outOgg]) {
            try { if (fs.existsSync(p)) fs.unlinkSync(p) } catch {}
        }
    }
}

const TTS_MAX_CHAR = 400

async function askGemini(question) {
    const res = await axios.get('https://api.siputzx.my.id/api/ai/gemini', {
        params: { text: question, cookie: GEMINI_COOKIE, promptSystem: PROMPT_SYSTEM },
        timeout: 60000, validateStatus: () => true
    })
    if (res.status !== 200) throw new Error(`API error ${res.status}`)
    const answer = res.data?.data?.response
    if (!answer) throw new Error('Respons API kosong.')
    return answer
}

/**
 * Hook "before": dipanggil untuk setiap pesan sebelum switch command.
 * @returns true jika pesan di-handle (pemanggil harus return), false jika lanjut.
 */
async function handleTagbot({ m, bob, isCmd, botNumber }) {
    const replyAi = async (query) => {
        const last = cooldown.get(m.sender) || 0
        if (Date.now() - last < COOLDOWN_MS) return true
        cooldown.set(m.sender, Date.now())
        try { await bob.sendPresenceUpdate('composing', m.chat) } catch {}
        const answer = await askGemini(query)
        // 1. Coba voice note (model nahida), jawaban pendek saja
        if (answer.length <= TTS_MAX_CHAR) {
            try {
                try { await bob.sendPresenceUpdate('recording', m.chat) } catch {}
                const vn = await ttsVoiceNote(answer)
                const sent = await bob.sendMessage(m.chat,
                    { audio: vn, mimetype: 'audio/ogg; codecs=opus', ptt: true },
                    { quoted: m })
                rememberAiReply(sent?.key?.id)
                return true
            } catch (e) {
                console.error('[ai-tagbot][vn] gagal, fallback teks:', e?.message || e)
            }
        }
        // 2. Fallback teks (juga untuk jawaban panjang)
        const sent = await bob.sendMessage(m.chat, { text: answer }, { quoted: m })
        rememberAiReply(sent?.key?.id)
        return true
    }

    try {
        if (!m.text || m.isBaileys || m.fromMe) return false
        // Jangan bajak command
        if (isCmd) return false
        const botNum = num(botNumber || (bob?.user?.id) || '')
        if (!botNum) return false
        const mentioned = m.mentionedJid || []
        const tagBot = mentioned.some((jid) => num(jid) === botNum)
        if (tagBot) {
            const query = m.text.replace(/@\d+/g, '').trim()
            if (!query) {
                await bob.sendMessage(m.chat, {
                    text: `Halo! Aku *${global.botName || 'JOJO BOT'}*.\nTag aku + tulis pertanyaanmu, contoh:\n@${botNum} siapa kamu?`
                }, { quoted: m })
                return true
            }
            return await replyAi(query)
        }
        // Lanjutan obrolan: reply ke jawaban AI bot
        const q = m.quoted
        if (q?.id && isAiReply(q.id) && (q.fromMe || num(q.sender) === botNum)) {
            const clean = m.text.replace(/@\d+/g, '').trim()
            if (!clean) return false
            const prev = (q.text || '').trim().slice(0, 800)
            const query = prev
                ? `Konteks percakapan sebelumnya:\n"${prev}"\nPertanyaan lanjutan: ${clean}`
                : clean
            return await replyAi(query)
        }
    } catch (e) {
        console.error('[ai-tagbot]', e?.message || e)
        try {
            await bob.sendMessage(m.chat, { text: 'Maaf, AI lagi error. Coba lagi nanti ya.' }, { quoted: m })
        } catch {}
        return true
    }
    return false
}

module.exports = { handleTagbot, isAiReply, rememberAiReply, ttsVoiceNote, ttsNahidaUrl, TTS_MAX_CHAR }
