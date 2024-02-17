/**
   * Create By Dika Ardnt.
   * Contact Me on wa.me/6288292024190
   * Follow https://github.com/DikaArdnt
*/

const fs = require('fs')
//const chalk = require('chalk')


// Other
global.owner = ['6288214772441','6281909494055']
global.botName = 'JOJO - BOT'
global.ownerName = 'Arasya'
global.packname = 'My Sticker'
global.author = 'Sticker Saya'
global.limitCount = 25
global.gamewaktu = 50
global.prefa = ['#']
global.apikey = `arasyaku`
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
