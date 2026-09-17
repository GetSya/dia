/**
   * Create By Dika Ardnt.
   * Contact Me on wa.me/6288292024190
   * Follow https://github.com/DikaArdnt
*/

const fs = require('fs')
//const chalk = require('chalk')


// Other
// Pairing (ourin-baileys): nomor WA bot, digits saja pakai kode negara.
// Bisa juga via env PAIRING_NUMBER / NOMOR_BOT, argumen --pairing-number=62812xxxx,
// atau diketik interaktif saat bot dijalankan. Kode custom yang dipakai: "RSYA-RAFI".
global.pairingNumber = process.env.PAIRING_NUMBER || '6288213292687'
global.pairingCode = 'RSYA-RAFI'
global.owner = ['6288214772441']
global.botName = 'JOJO - BOT'
global.ownerName = 'Arasya'
global.packname = 'My Sticker'
global.author = 'Sticker Saya'
global.limitCount = 25
global.gamewaktu = 50
// Token AI Puter (https://puter.com) untuk fitur #ai / chatbot.
// PERHATIAN: file ini ter-track git — jangan push ke repo publik tanpa menghapus token!
global.puterToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InYyIn0.eyJ0IjoidCIsInYiOiIyIiwidG9rZW5fdWlkIjoiOWE4NDA1YzgtMTg3YS00OTJkLWE3NzgtNjFkM2JjZWQ1NDI4IiwidXUiOiJ4cnladEZBQ1RLTzRPM1pZYXF3cWZRPT0iLCJzdSI6InlSZ3VHMG1ZVDZlT3dXQlVvS0liK1E9PSIsImFpIjoieHJ5WnRGQUNUS080TzNaWWFxd3FmUT09IiwiZnVsbF9hY2Nlc3MiOnRydWUsImlhdCI6MTc4OTUyNjI0NX0.lfjEFtBMMH1G07YJ9dRzbzuy8N6XvNZlrIR9n5wEVbo'
global.prefa = ['#']
global.apikey = `arasyaku`
global.botWebsite = 'https://bot.acamedia.xyz'
global.registWebsite = 'https://bot.acamedia.xyz'
global.jvault = {
    binId: '255feaaa-e64c-4b4e-b2de-5f2ec0ee54b3',
    apiKey: 'jv_59c80af7ea55b398e7e4ebaeb14eb5d6dc88772dd7245a8cb432c1d7f16a',
    url: 'https://jvault.aerialstudio.tech/api'
}
global.mess = {
    success: '✓ Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    reg: 'Anda Belom Login, Silahkan Login terlebih dahulu dengan cara ketik /login',
    wait: 'Tunggu Sebentar Yah Kak!\nSedang Jojo Proses nih',    
    linkinv: 'Link Tidak Valid. Masukan Link Dengan Benar.',    
}
global.thumb = fs.readFileSync('./media/logo.png')
global.visoka = { url: 'https://telegra.ph/file/15209657f9d4f59c7ca1e.mp4' }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`update ${__filename}`)
	delete require.cache[file]
	require(file)
})
