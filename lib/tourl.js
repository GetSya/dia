// Upload media -> URL publik. Catbox (utama, permanen) -> fallback Uguu (sementara).
const axios = require('axios')
const FormData = require('form-data')

const uploadCatbox = async (buffer, filename) => {
    const fd = new FormData()
    fd.append('reqtype', 'fileupload')
    fd.append('fileToUpload', buffer, { filename })

    const res = await axios.post('https://catbox.moe/user/api.php', fd, {
        headers: fd.getHeaders(),
        maxBodyLength: 200 * 1024 * 1024,
        maxContentLength: 200 * 1024 * 1024,
        timeout: 90000,
        validateStatus: () => true
    })

    const link = typeof res.data === 'string' ? res.data.trim() : ''
    if (!/^https?:\/\//.test(link)) throw new Error('Catbox: ' + String(link).slice(0, 100))
    return link
}

const uploadUguu = async (buffer, ext = 'bin') => {
    const fd = new FormData()
    fd.append('files[]', buffer, { filename: `file.${ext}` })

    const res = await axios.post('https://uguu.se/upload.php', fd, {
        headers: fd.getHeaders(),
        maxBodyLength: 100 * 1024 * 1024,
        maxContentLength: 100 * 1024 * 1024,
        timeout: 90000,
        validateStatus: () => true
    })

    const link = res.data && res.data.files && res.data.files[0] && res.data.files[0].url
    if (!link) throw new Error('Uguu tidak mengembalikan URL')
    return link
}

const uploadFile = async (buffer, ext) => {
    const filename = `upload.${ext}`
    try {
        return { link: await uploadCatbox(buffer, filename), host: 'catbox.moe' }
    } catch (e) {
        console.error('TOURL catbox gagal, coba uguu:', e.message)
        return { link: await uploadUguu(buffer, ext), host: 'uguu.se (sementara)' }
    }
}

module.exports = { uploadCatbox, uploadUguu, uploadFile }
