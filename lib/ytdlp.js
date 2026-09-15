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
async function downloadVideo(url, info = null, maxHeight = 720) {
    const meta = info || await getInfo(url)
    const outFile = tmpOut('mp4', meta.id || 'video')
    await youtubedl(url, baseFlags({
        // Prioritas: mp4 progresif <=720p, lalu gabungan video+audio (perlu ffmpeg)
        format: `b[ext=mp4][height<=${maxHeight}]/b[height<=${maxHeight}]/bv*[ext=mp4][height<=${maxHeight}]+ba[ext=m4a]/bv*[height<=${maxHeight}]+ba/b[height<=${maxHeight}]/bv*+ba/b`,
        mergeOutputFormat: 'mp4',
        output: outFile,
        windowsFilenames: process.platform === 'win32' ? true : undefined
    }))
    if (!fs.existsSync(outFile)) throw new Error('yt-dlp gagal menyimpan file video')
    const size = checkSize(outFile, MAX_VIDEO_BYTES, 'video')
    return { ...meta, file: outFile, size }
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

module.exports = { isYouTubeUrl, getInfo, searchOne, downloadAudio, downloadVideo, downloadTikTok, cleanup, fmtDuration, findFfmpeg }
