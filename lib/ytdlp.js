// ============================================================
// Helper download YouTube via youtube-dl-exec (yt-dlp).
// Dipakai oleh case play / ytmp3 / ytmp4 di control.js.
// ============================================================
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const youtubedl = require('youtube-dl-exec')

const MAX_AUDIO_BYTES = 25 * 1024 * 1024  // 25 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024  // 50 MB

function isYouTubeUrl(s) {
    return /^https?:\/\/(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\//i.test(String(s || '').trim())
}

// Cari binary ffmpeg agar yt-dlp bisa extract mp3 / merge mp4.
// Urutan: env FFMPEG_PATH -> lokasi umum Windows -> PATH.
let _ffmpeg = null
function findFfmpeg() {
    if (_ffmpeg !== undefined && _ffmpeg !== null) return _ffmpeg
    const cands = []
    if (process.env.FFMPEG_PATH) cands.push(process.env.FFMPEG_PATH)
    if (process.platform === 'win32') {
        cands.push('C:\\ffmpeg\\bin\\ffmpeg.exe', 'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe')
    }
    cands.push('ffmpeg')
    for (const c of cands) {
        try {
            if (path.isAbsolute(c)) {
                if (fs.existsSync(c)) { _ffmpeg = c; return _ffmpeg }
            } else {
                execFileSync(process.platform === 'win32' ? 'where' : 'which', [c], { stdio: 'ignore' })
                _ffmpeg = c
                return _ffmpeg
            }
        } catch {}
    }
    _ffmpeg = null
    return _ffmpeg
}

function baseFlags(extra = {}) {
    const f = {
        noWarnings: true,
        noCheckCertificates: true,
        noPlaylist: true, // URL watch+list hanya unduh 1 video, bukan se-playlist
        socketTimeout: 30,
        retries: 3,
        concurrentFragments: 4,
        ...extra
    }
    const ff = findFfmpeg()
    if (ff) f.ffmpegLocation = ff
    return f
}

function pickThumb(thumbs) {
    if (!Array.isArray(thumbs) || !thumbs.length) return null
    const sorted = [...thumbs].filter(t => t && t.url).sort((a, b) => (b.width || 0) - (a.width || 0))
    return sorted.length ? sorted[0].url : null
}

function tmpOut(ext, tag) {
    const name = `ytdlp-${tag}-${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`
    return path.join(os.tmpdir(), name)
}

function checkSize(file, max, label) {
    const st = fs.statSync(file)
    if (st.size > max) {
        try { fs.unlinkSync(file) } catch {}
        throw new Error(`File ${label} terlalu besar (${(st.size / 1048576).toFixed(1)} MB, maks ${(max / 1048576).toFixed(0)} MB)`)
    }
    return st.size
}

async function getInfo(url) {
    const out = await youtubedl(url, baseFlags({ dumpSingleJson: true, skipDownload: true }))
    return {
        id: out.id,
        title: out.title || 'audio',
        duration: out.duration || null,
        uploader: out.uploader || out.channel || null,
        viewCount: out.view_count || null,
        thumbnail: pickThumb(out.thumbnails) || null,
        webpageUrl: out.webpage_url || url
    }
}

// Cari 1 video teratas untuk query (dipakai #play).
async function searchOne(query) {
    const out = await youtubedl(`ytsearch1:${query}`, baseFlags({ dumpSingleJson: true, flatPlaylist: true }))
    const entries = (out && out.entries) ? out.entries : []
    const first = entries[0]
    if (!first || !first.id) throw new Error('Lagu tidak ditemukan')
    const videoUrl = first.url || `https://www.youtube.com/watch?v=${first.id}`
    // Ambil metadata lengkap (thumbnail, durasi) dari halaman video
    try {
        const info = await getInfo(videoUrl)
        return { ...info, url: info.webpageUrl }
    } catch {
        return {
            id: first.id,
            title: first.title || query,
            duration: first.duration || null,
            uploader: first.uploader || null,
            viewCount: first.view_count || null,
            thumbnail: (first.thumbnails && first.thumbnails[0] && first.thumbnails[0].url) || null,
            url: videoUrl
        }
    }
}

// Unduh audio -> file .mp3 lokal. Return { file, size, ...info }.
async function downloadAudio(url, info = null) {
    const meta = info || await getInfo(url)
    const outFile = tmpOut('mp3', meta.id || 'audio')
    await youtubedl(url, baseFlags({
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 5,
        output: outFile,
        windowsFilenames: process.platform === 'win32' ? true : undefined
    }))
    if (!fs.existsSync(outFile)) throw new Error('yt-dlp gagal menyimpan file audio')
    const size = checkSize(outFile, MAX_AUDIO_BYTES, 'audio')
    return { ...meta, file: outFile, size }
}

// Unduh video -> file .mp4 lokal (maks 720p, progresif bila tersedia). Return { file, size, ...info }.
// Tahan gagal intermiten: coba beberapa selector format, dan bila yt-dlp keluar tanpa file,
// cari file saudara (beda ekstensi) sebelum menyerah — dengan log diagnostik.
async function downloadVideo(url, info = null, maxHeight = 720) {
    const meta = info || await getInfo(url)
    const tag = String(meta.id || 'video').replace(/[^a-zA-Z0-9_-]/g, '') || 'video'
    const formatTries = [
        // Prioritas: mp4 progresif <=720p, lalu gabungan video+audio (perlu ffmpeg)
        `b[ext=mp4][height<=${maxHeight}]/b[height<=${maxHeight}]/bv*[ext=mp4][height<=${maxHeight}]+ba[ext=m4a]/bv*[height<=${maxHeight}]+ba/b[height<=${maxHeight}]/bv*+ba/b`,
        'bv*+ba/b',
        'best'
    ]
    let lastErr = null
    for (const fmt of formatTries) {
        const outFile = tmpOut('mp4', tag)
        try {
            await youtubedl(url, baseFlags({
                format: fmt,
                mergeOutputFormat: 'mp4',
                output: outFile,
                windowsFilenames: process.platform === 'win32' ? true : undefined
            }))
            const found = fs.existsSync(outFile) ? outFile : findSibling(outFile, tag)
            if (!found) throw new Error(`yt-dlp selesai tanpa file (${outFile})`)
            if (found !== outFile) console.log(`[ytdlp] pakai file saudara: ${found}`)
            const size = checkSize(found, MAX_VIDEO_BYTES, 'video')
            return { ...meta, file: found, size }
        } catch (e) {
            cleanup(outFile)
            lastErr = e
            console.log(`[ytdlp] format "${fmt}" gagal: ${shortErr(e)}`)
        }
    }
    throw lastErr
}

// Cari file hasil unduhan yang namanya mirip tapi ekstensinya beda
// (mis. merge menghasilkan .mkv karena ffmpeg tak tersedia).
function findSibling(outFile, tag) {
    try {
        const dir = path.dirname(outFile)
        const cands = fs.readdirSync(dir)
            .filter(n => n.startsWith(`ytdlp-${tag}-`) && /\.(mp4|mkv|webm|mov)$/i.test(n))
            .map(n => ({ n, t: fs.statSync(path.join(dir, n)).mtimeMs }))
            .sort((a, b) => b.t - a.t)
        return cands.length ? path.join(dir, cands[0].n) : null
    } catch { return null }
}

function shortErr(e) {
    return String((e && e.message) || e || '').split('\n').map(l => l.trim()).filter(l => l && !/deprecat/i.test(l)).slice(-3).join(' | ').slice(0, 300)
}

function cleanup(file) {
    try { if (file && fs.existsSync(file)) fs.unlinkSync(file) } catch {}
}

// Unduh video TikTok -> file .mp4 lokal (tanpa watermark). Return { file, size, ...info }.
async function downloadTikTok(url, info = null) {
    const meta = info || await getInfo(url)
    const outFile = tmpOut('mp4', (meta.id || 'tiktok').replace(/[^a-zA-Z0-9_-]/g, ''))
    await youtubedl(url, baseFlags({
        format: 'best[ext=mp4]/best',
        mergeOutputFormat: 'mp4',
        output: outFile,
        windowsFilenames: process.platform === 'win32' ? true : undefined
    }))
    if (!fs.existsSync(outFile)) throw new Error('yt-dlp gagal menyimpan file TikTok')
    const size = checkSize(outFile, MAX_VIDEO_BYTES, 'video TikTok')
    return { ...meta, file: outFile, size }
}

function fmtDuration(sec) {
    if (!sec && sec !== 0) return '-'
    sec = Math.floor(sec)
    const h = Math.floor(sec / 3600), mnt = Math.floor((sec % 3600) / 60), s = sec % 60
    return h ? `${h}:${String(mnt).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${mnt}:${String(s).padStart(2, '0')}`
}

// Bersihkan pesan error yt-dlp: buang warning Python/deprecation,
// ambil baris ERROR yang relevan saja agar ramah dibaca user.
function cleanError(err) {
    let msg = String((err && err.message) || err || 'Gagal')
    const lines = msg.split('\n').map(l => l.trim()).filter(Boolean)
    const errors = lines.filter(l => /^ERROR\b/i.test(l))
    let picked = errors.length ? errors : lines
    picked = picked.filter(l => !/deprecat/i.test(l) || /^ERROR\b/i.test(l))
    msg = (picked.length ? picked : lines).join(' ').trim()
    if (/unsupported url/i.test(msg) && /tiktok/i.test(msg)) {
        msg += ' (kemungkinan postingan foto/slideshow — hanya video yang didukung)'
    }
    return msg.slice(0, 300) || 'Gagal'
}

module.exports = { isYouTubeUrl, getInfo, searchOne, downloadAudio, downloadVideo, downloadTikTok, cleanup, fmtDuration, findFfmpeg, cleanError }
