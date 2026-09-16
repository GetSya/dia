// Login Puter SEKALI untuk bot. Run: node scratch/puter-login.js
// Membuka browser -> login akun Puter pemilik bot -> token disimpan ke
// session/puter-token.txt (JANGAN di-share / di-commit).
// Semua pemakaian AI bot memakai kuota/akun ini (user-pays model).
const fs = require('fs')
const path = require('path')
const { getAuthToken } = require('@heyputer/puter.js/src/init.cjs')

;(async () => {
    try {
        console.log('Membuka browser untuk login Puter...')
        console.log('(login dengan akun Puter pemilik bot di jendela yang terbuka)')
        const token = await getAuthToken()
        if (!token) {
            console.log('Login gagal atau dibatalkan.')
            process.exit(1)
        }
        const out = path.join(__dirname, '..', 'session', 'puter-token.txt')
        fs.mkdirSync(path.dirname(out), { recursive: true })
        fs.writeFileSync(out, String(token).trim())
        console.log('OK! Token tersimpan di session/puter-token.txt')
        console.log('Restart bot, lalu tes dengan perintah #ai halo')
        process.exit(0)
    } catch (e) {
        console.log('Gagal:', (e && e.message) || e)
        process.exit(1)
    }
})()
