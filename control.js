/**
 * Very Thanks To Dika Ardnt.
 * Amirul
 * Contact Me on wa.me/6285849261085
 * Original https://github.com/DikaArdnt
 * Remake : Pebri
 */
 
require('@fnc')
require('module-alias/register')
require('./config')
const {
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    downloadContentFromMessage,
    generateWAMessageFromContent,
    proto,
    delay,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const util = require('util')
const path = require('path')
const yts = require("yt-search");
const ytmp4 = require("ytmp4");
const dl = require('@bochilteam/scraper-sosmed');
const JoApi = require('@phaticusthiccy/open-apis')
const axios = require('axios')
const ytdl = require('ytdl-core')
const gugel = require('googlethis')
const fakeyou = require('fakeyou.js')
const cheerio = require('cheerio')
const rmvbg = require('removebg-wrapper')
const translate = require('@vitalets/google-translate-api')
const ms = require("ms")
const os = require("os")
const moment = require("moment-timezone");
const { config, createAudioFromText } = require('tiktok-tts')
const { promisify } = require('util')
const { pipeline } = require('stream')
const { color } = require('./lib/color.js')
const { pinterest, stickersearch, ttdownloader, fbdown, fbDown2, igstalk, igstory, linkwa, styletext } = require("./lib/scraper/nyekrep")
const { vitsUmamusumeVoiceSynthesizer } = require("./lib/scraper/ttswibu")
const { Download } = require("./lib/scraper/download")
const { yanz, check } = require("./lib/scraper/startme")
const { downloadYouTube, starTask, taskStatus } = require("./lib/scraper/youtube")
const { aiovideodl } = require("./lib/scraper/downloader")
const { isTicTacToe, getPosTic } = require("./lib/tictactoe.js");
const { TiktokDL } = require("./lib/scraper/newtt.js");
const { addCommands, checkCommands, deleteCommands } = require("./lib/autoresp.js")
const { upload } = require("./lib/uploads.js")
const { jadianime } = require("./lib/scraper/jadianime.js")
const { youtube, searchResult } = require("./lib/scraper/ytdl.js")
const { TiktokDownloader } = require("./lib/scraper/tiktokdl.js")
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("./lib/game.js");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance } = require("./lib/limit.js");
const { addPrem, deletePrem, checkPrem} = require("./lib/prem2.js");
const { twitter } = require("./lib/scraper/twitter.js")
const { exec, spawn, execSync } = require("child_process")
const tictac = require("./lib/tictac");
const _prem = require("./lib/premium");
const Replicate = require('replicate')
const {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    addExifAvatar
} = require('./lib/converter')
const {
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    floNime
} = require('./lib/uploader')
  const replicate = new Replicate({
  auth: "r8_IrWhmFuiXDTW4y0ZVXvBB6ODmH56ifn1mTjWa", //Api Gueh
});

// Ganti dengan kunci API GPT-3.5 Anda
const apiKey = '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'; 

// Game
let soal = [];
let tebakgambar = []
let tebakkata = []
let siapakahaku = []
let caklontong = []
let teki = []
let tod = []
let tebaklagu = []

//SetGrupBCPOIN
let gcku  = `6281319944917-1610752237@g.us`

//ssession tt
const tiktokresi = "2a78c6d3b550e355dc01cb366b146ab4" //Api Punya Gua anjing


const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: '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',
  });

const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, otpkode, makeid, getRandom, getGroupAdmins } = require('./lib/function')
const { P } = require('pino')
const { decode } = require('punycode')


/// DATABASE
let daftar = JSON.parse(fs.readFileSync('./assets/db/daftar.json'));
let antilink = JSON.parse(fs.readFileSync('./assets/db/antilink.json'));
let truth = JSON.parse(fs.readFileSync('./assets/db/truth.json'));
let dare = JSON.parse(fs.readFileSync('./assets/db/dare.json'));
let premium = JSON.parse(fs.readFileSync('./assets/db/premium.json'));
let commandsDB = JSON.parse(fs.readFileSync('./assets/db/commands.json'));
let prem2 = JSON.parse(fs.readFileSync('./assets/db/prem2.json'));
let token = JSON.parse(fs.readFileSync('./assets/db/token.json'));
let chatbot = JSON.parse(fs.readFileSync('./assets/db/chatbot.json'));
let limit = JSON.parse(fs.readFileSync('./assets/db/limit.json'));
let balance = JSON.parse(fs.readFileSync('./assets/db/balance.json'));
let glimit = JSON.parse(fs.readFileSync('./assets/db/glimit.json'));


module.exports = bob = async (bob, m, chatUpdate, store, welcome, mentioned) => {
    try {
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const content = JSON.stringify(m.message)
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%/^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶/∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "/" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const CmD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await bob.decodeJid(bob.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPremium = [botNumber, ...prem2].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const tgl = moment.tz('Asia/Jakarta').format('DD/MM/YY')
        const isMedia = /image|video|sticker|audio/.test(mime)

        const chats = m.type === "conversation" && m.message.conversation ? m.message.conversation : m.type === "imageMessage" && m.message.imageMessage.caption ? m.message.imageMessage.caption : m.type === "videoMessage" && m.message.videoMessage.caption ? m.message.videoMessage.caption : m.type === "extendedTextMessage" && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : m.type === "buttonsResponseMessage" && quotedMsg.fromMe && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : 
        m.type === "templateButtonReplyMessage" && quotedMsg.fromMe && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : m.type === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId : m.type === "listResponseMessage" && quotedMsg.fromMe && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : "";
        const mentionByTag = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionUser = m.type == "extendedTextMessage" ? m.message.extendedTextMessage.contextInfo.mentionedJid || [] : [] 

        // Group
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const groupMetadata = m.isGroup ? await bob.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = groupAdmins.includes(m.sender)
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isAntiLink = m.isGroup ? antilink.includes(m.chat) : false
        const isToken = token.includes(q) || false
        const DaftarAnjay = daftar.includes(m.sender)
        const isWelcome = m.isGroup ? welcome.includes(m.chat) ? true : false : false
        const isChatBot = chatbot.includes(m.chat) ? true : false




        //Extensi Media Message
        const isImage = (m.mtype == 'imageMessage')
		const isVideo = (m.mtype == 'videoMessage')
		const isSticker = (m.mtype == 'stickerMessage')
		const isAudio = (m.mtype == 'audioMessage')
		const isDocument = (m.mtype == 'documentMessage')
		const isQuotedMsg = (m.mtype == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
    


        // Public & Self
        if (!bob.public) {
            if (!m.key.fromMe) return
        }


        //** cmd
        const CmDPlugins = isCmd ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null

        //** plugins
        for (let name in plugins) {
            let plugin = plugins[name]
            if (plugin.CmD && plugin.CmD.includes(CmDPlugins)) {
                let turn = plugin.CmD instanceof Array ?
                    plugin.CmD.includes(CmDPlugins) :
                    plugin.CmD instanceof String ?
                    plugin.CmD == CmDPlugins :
                    false
                if (!turn) continue 
                try {
                await plugin.exec(m, bob, quoted, pushname, {
                    args,
                    CmD,
                    text,
                    prefix,
                    command
                })
                } catch (e) {
                   m.reply(util.format(`*(⁠☉⁠｡⁠☉⁠)!* Upss... error pada plugins *_${plugin.CmD}_*\n\n${e}`))
                }
                console.log('pesan melalui plugins sistem')
            }
        }

        		// Premium
		_prem.expiredCheck(bob, premium)


        // function
        async function instagram(url) {
            let res = await axios("https://indown.io/");
            let _$ = cheerio.load(res.data);
            let referer = _$("input[name=referer]").val();
            let locale = _$("input[name=locale]").val();
            let _token = _$("input[name=_token]").val();
            let { data } = await axios.post(
              "https://indown.io/download",
              new URLSearchParams({
                link: url,
                referer,
                locale,
                _token,
              }),
              {
                headers: {
                  cookie: res.headers["set-cookie"].join("; "),
                },
              }
            );
            let $ = cheerio.load(data);
            let result = [];
            let __$ = cheerio.load($("#result").html());
            __$("video").each(function () {
              let $$ = $(this);
              result.push({
                type: "video",
                thumbnail: $$.attr("poster"),
                url: $$.find("source").attr("src"),
              });
            });
            __$("img").each(function () {
              let $$ = $(this);
              result.push({
                type: "image",
                url: $$.attr("src"),
              });
            });
          
            return result;
          }

         
          
        // Anti link
        if (m.isGroup && !isCreator && isAntiLink && !isGroupAdmins && isBotGroupAdmins){
            if (body.includes(`https://chat.whatsapp.com`)) {
                bob.sendMessage(m.chat, {text: `*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`})
                var number = m.sender
      bob.groupParticipantsUpdate(m.chat, [number], "remove")
            }
        }
        const reply = (teks) => {
			bob.sendMessage(m.chat, { text: teks }, { quoted: m})
		}
        const fakereply = (teks) => {
			bob.sendMessage(m.chat, { text: teks }, { quoted: fake})
		}
        const sendbut = (jid, text, pref, textbut, footer) => {
			let buttons = [{ buttonId: pref, buttonText: { displayText: textbut }, type: 1 }]
            let buttonMessage = {text: text, footer: footer, buttons: buttons, headerType: 2 }
            bob.sendMessage(jid, buttonMessage, { quoted: m })
        }
        const pickRandom = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function ngetag(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = bob.sendMessage(m.chat, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = bob.sendMessage(m.chat, { text: teks, mentions: mems }, { quoted: m })
		      return res
 		    }
		}
        function monospace(string) {
            return '```' + string + '```'
            }
        const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return bob.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: m })
		}

        async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(m.message.videoMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(m.message.stickerMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(m.message.audioMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
        
        const jimp_1 = require('jimp')
        async function pepe(media) {
        const jimp = await jimp_1.read(media)
        const min = jimp.getWidth()
        const max = jimp.getHeight()
        const cropped = jimp.crop(0, 0, min, max)
        return {
            img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
            preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
        }
    }
    
//fake

const fake2 = {
    key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
            remoteJid: "status@broadcast" //status@broadcast
        } : {})
    },
    message: {
        "extendedTextMessage": {
            "text": `Hallo ${pushname}`,
            "title": `Hmm`,
            'jpegThumbnail': global.thumb
        }
    }
}

const fake = {
    key: { 
    fromMe: false,
    participant: `0@s.whatsapp.net`, ...(m.chat ? 
    { remoteJid: "41798898139-1429460331@g.us" } : {}) 
    },
    message: { 
    "extendedTextMessage": {
    "text": `Hallo _*${pushname} 👋*_`,
    "title": `Hmm`,
    'jpegThumbnail': fs.readFileSync('media/logo.png')
    }
    } 
    }

//test
    

    // GAME 
    cekWaktuGame(bob, tebakgambar)
    if (isPlayGame(m.chat, tebakgambar) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, tebakgambar)) {
    var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, tebakgambar)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /tebakgambar`
    bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
    tebakgambar.splice(getGamePosi(m.chat, tebakgambar), 1)
    giveLimit(sender, parseInt(`2`), limit)
}
}
cekWaktuGame(bob, tebakkata)
if (isPlayGame(m.chat, tebakkata) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, tebakkata)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, tebakkata)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /tebakkata`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
        tebakkata.splice(getGamePosi(m.chat, tebakkata), 1)
        giveLimit(sender, parseInt(`2`), limit)
    }
}
cekWaktuGame(bob, siapakahaku)
if (isPlayGame(m.chat, siapakahaku) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, siapakahaku)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, siapakahaku)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /siapakahaku`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
        siapakahaku.splice(getGamePosi(m.chat, siapakahaku), 1)
        giveLimit(sender, parseInt(`2`), limit)
    }
}
cekWaktuGame(bob, caklontong)
if (isPlayGame(m.chat, caklontong) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, caklontong)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, caklontong)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /caklontong`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
    caklontong.splice(getGamePosi(m.chat, caklontong), 1)
    giveLimit(sender, parseInt(`2`), limit)
}
}
cekWaktuGame(bob, soal)
if (isPlayGame(m.chat, soal) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, soal)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, soal)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /soal`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
    soal.splice(getGamePosi(m.chat, soal), 1)
    giveLimit(sender, parseInt(`2`), limit)
}
}
cekWaktuGame(bob, tebaklagu)
if (isPlayGame(m.chat, tebaklagu) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, tebaklagu)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, tebaklagu)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /tebaklagu`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
        tebaklagu.splice(getGamePosi(m.chat, tebaklagu), 1)
        giveLimit(sender, parseInt(`2`), limit)
        }
    }
cekWaktuGame(bob, teki)
if (isPlayGame(m.chat, teki) ) {
    if (m.text.toLowerCase() == getJawabanGame(m.chat, teki)) {
        var texttg = `*Selamat @${m.sender.split("@")[0]} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(m.chat, teki)}\nKode Game : ${makeid(15)}\n\nIngin bermain lagi? Ketik /tebakkimia`
        bob.sendMessage(m.chat, {text: texttg, mentions: [m.sender]}, {quoted: m}) 
        teki.splice(getGamePosi(m.chat, teki), 1)
        giveLimit(sender, parseInt(`2`), limit)
        }
    }
    //Akhir
    //Auto Respon
    for (var i = 0; i < commandsDB.length ; i++) {
        if (body.toLowerCase() === commandsDB[i].pesan) {
            fakereply(commandsDB[i].balasan)
        }
          }

    // Premium
    _prem.expiredCheck(bob, premium)
    let yutu = `https://youtu${m.text.slice(13)}`

if (m.text.includes(yutu)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = yutu
const streamPipeline = promisify(pipeline);
                        const audioStream = ytdl(yutu, {
                            filter: 'audioonly',
                            quality: 'highestaudio',
                          });
                          const sampah = os.tmpdir();
                          const writableStream = fs.createWriteStream(`${sampah}/${title}.mp3`);
                        
                          await streamPipeline(audioStream, writableStream);
                          bob.sendMessage(m.chat, {audio: {url: `${sampah}/${title}.mp3`}, fileName: title, mimetype: 'audio/mp4'}, {quoted: m})
}
let tt = `https://vt.tiktok${m.text.slice(17)}`

if (m.text.includes(tt)) {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
                var url = tt
                try {
                TiktokDL(url).then ( data => {
                bob.sendMessage(m.chat, {video: {url: data.result.video[1]}}, {quoted: m})
                })
                } catch (e) {
                console.log(`Eror kak, Coba pakai server 2 ketik ${prefix}tiktok2 ${q} `)
                }
}
let tt2 = `https://www.tiktok.com/${m.text.slice(23)}`

if (m.text.includes(tt2)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = tt2
try {
    TiktokDL(url).then ( data => {
    bob.sendMessage(m.chat, {video: {url: data.result.video[1]}}, {quoted: m})
    })
    } catch (e) {
    console.log(`Eror kak, Coba pakai server 2 ketik ${prefix}tiktok2 ${q} `)
    }
}
let tt3 = `https://vm.tiktok${m.text.slice(17)}`

if (m.text.includes(tt3)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = tt3
try {
    TiktokDL(url).then ( data => {
    bob.sendMessage(m.chat, {video: {url: data.result.video[1]}}, {quoted: m})
    })
    } catch (e) {
    console.log(`Eror kak, Coba pakai server 2 ketik ${prefix}tiktok2 ${q} `)
    }
}
let fbdl = `https://www.facebook.com/${m.text.slice(25)}`

if (m.text.includes(fbdl)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = fbdl
dl.savefrom(url).then ( data => {
reply(`*[ FACEBOOK ]*\n\nTitle : ${ data[0].meta.title}\nSize : HD\n\n_Wait A Minute._`)
bob.sendMessage(m.chat, {video: {url: data[0].hd.url}, caption: data[0].meta.title})
})
}
let igdl = `https://www.instagram.com/${m.text.slice(26)}`

if (m.text.includes(igdl)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = igdl
instagram(url).then( data => {
for ( let i of data ) {
if (i.type === "video") {
bob.sendMessage(m.chat, {video: {url: i.url}}, {quoted: m})
} else if (i.type === "image") {
bob.sendMessage(m.chat, {image: { url: i.url }})
}
}
}).catch(() => reply(`Eror mas. P in owner coba`))
}

let twt = `https://twitter.com/${m.text.slice(20)}`

if (m.text.includes(twt)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = twt
dl.savefrom(url).then( data => {
reply(`*[ TWITTER ]*\n\nTitle : ${data[0].meta.title}\n\n_Wait A Minute._`)
if (data[0].url[1].type === "mp4") {
bob.sendMessage(m.chat, {video: {url: data[0].url[1].url}})
} else if (data[0].url[1].type === "jpg") {
bob.sendMessage(m.chat, {image: { url: data[0].url[1].url }})
}
}).catch(() => reply(`Eror mas. P in owner coba`))
}

let cp = `https://www.capcut.com/${m.text.slice(23)}`

if (m.text.includes(cp)) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
                    limitAdd(sender, limit)
var url = cp
capcut(url).then ( data => {
reply(`*[ CAPCUT ]*\n\nUsername : ${data.nama}\nUsed : ${data.used} Pemakai\n\n_Wait A Minute._`)
bob.sendMessage(m.chat, {video: {url: data.video}, caption: `${data.used} Telah Di Pakai`})
} )
}

    
var premi = 'User'
if (isCreator) {
premi = '*_OWNER BOT_*'
} else if ( isPremium ) {
    premi = "*Premium User*"
}
var regis = '*X*'

async function facebook(url) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://aiovideodl.ml/',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        }).then((src) => {
            let a = cheerio.load(src.data)
            let token = a('#token').attr('value')
            axios({
                url: 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
                method: 'POST',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
                },
                data: new URLSearchParams(Object.entries({ 'url': link, 'token': token }))
            }).then(({ data }) => {
                resolve(data)
            })
        })
    })
}

async function joox(query) {
    return new Promise((resolve, reject) => {
      const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
          .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
                    promoses.push(
                        axios.get(get, {
                            headers: {
                                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                            }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    lagu: res.msong,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                    mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    creator: "WH MODS DEV",
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}

async function loading() {
    const { key } = await bob.sendMessage(m.chat, {text: '「▱▱▱▱▱▱▱▱▱▱」Loading...'}, { quoted: m });
         await delay(1000);
         await bob.sendMessage(m.chat, { text: '「▰▰▱▱▱▱▱▱▱▱」20%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▱▱▱▱▱▱」40%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▱▱▱▱」60%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▱▱」80%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」100%', edit: key})
        bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」Success✓', edit: key})
      }
async function meriset2() {
    const { key } = await bob.sendMessage(m.chat, {text: '「▱▱▱▱▱▱▱▱▱▱」Loading...'}, { quoted: m });
         await delay(1000);
         await bob.sendMessage(m.chat, { text: '「▰▰▱▱▱▱▱▱▱▱」20%', edit: key})
         await delay(1000);
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▱▱▱▱▱▱」40%', edit: key})
         await delay(1000);
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▱▱▱▱」60%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▱▱」80%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」100%', edit: key})
        bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」Success Mereset✓\Merestart Bot....', edit: key})
      }
async function loading2() {
    const { key } = await bob.sendMessage(m.chat, {text: 'Mencari 🔍. 0%'}, { quoted: m });
         await delay(1000);
         await bob.sendMessage(m.chat, { text: 'Mencari 🔍. 10%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mencari 🔍. 40%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mencari 🔍. 60%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mencari 🔍. 80%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mencari 🔍. 100%', edit: key})
        bob.sendMessage(m.chat, { text: 'Mencari 🔍.\nKetemu!', edit: key})
      }
async function meriset() {
    const { key } = await bob.sendMessage(m.chat, {text: 'Mereset Poin.... = 0%'}, { quoted: m });
         await delay(2000);
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 5%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 10%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 15%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 20%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 25%', edit: key})
         await delay(2000);
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 30%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 35%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 40%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 45%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 50%', edit: key})
         await delay(2000);
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 55%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 60%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 65%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 70%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 75%', edit: key})
         await delay(2000);
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 80%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 85%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 90%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 95%', edit: key})
         await bob.sendMessage(m.chat, { text: 'Mereset Poin.... = 100%', edit: key})
        bob.sendMessage(m.chat, { text: 'Mereset Poin.... = SUKSES!', edit: key})
        
      }
function randomNomor(min, max = null) {
    if (max !== null) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
    return Math.floor(Math.random() * min) + 1
    }
    }
        // Push Message To Console && Auto Read
        if (m.message) {
            addBalance(m.sender, randomNomor(60), balance)
            bob.readMessages([m.key])           
        }


        /*Privasi User!
        if (!m.isGroup) {
            try {
                await bob.chatModify({
                    delete: true,
                    lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
                },
                m.sender)
            } catch (e) {
                reply(`Habis Restart. Silahkan Ulangi Kembali Command nya ya`)
            } 
        }*/
        
         if (!m.isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ✓ \x1b[1;37m]', color(pushname), 'use', color(command), 'args :', color(args.length))
            if (isCmd && m.isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ✓ \x1b[1;37m]', color(pushname), 'use', color(command), 'in group', color(groupName), 'args :', color(args.length))

var LimitKu = `${getLimit(m.sender, limitCount, limit)}/${limitCount}`
const menuku = 
monospace(`Hallo ${pushname}

Nama : ${pushname}
Poin : ${isPremium || isCreator ? 'Unlimited' : LimitKu}`) + `
${premi}

╔══ 『 Main Menu 』
║
║- ${prefix}sewa
║
║- ${prefix}owner
║
║- ${prefix}rules
║
║- ${prefix}premtoken Tokennya
║
╚════╝

╔══ 『 Other Menu 』
║- ${prefix}quotes   💬
║- ${prefix}pinterest _< Pencarian >_
║- ${prefix}ppcp
║- ${prefix}tomp3
║- ${prefix}sholat _< Nama Kota >_
║- ${prefix}waifu
║- ${prefix}emojimix < 😃+😅 >
║- ${prefix}delete <Reply Bot Message>
║- ${prefix}tourl <Reply Image>
║- ${prefix}menfess <628XX|Text>
║- ${prefix}sticker <Reply Image>  🎨
║- ${prefix}stcmeme <Text Top|Text Bottom>
║- ${prefix}stcmeme2 <Text>
║- ${prefix}memegen <Reply Image>
║- ${prefix}meme
║- ${prefix}toimg <Reply Sticker>
║- ${prefix}ssweb <Link>
║- ${prefix}infogempa  🌍
║- ${prefix}news  📰
║- ${prefix}tstik <Text>
║- ${prefix}removebg <Reply Image>
║- ${prefix}qc <Text>
║- ${prefix}tohd <Reply Image>
║- ${prefix}take <PackName|Author>
║- ${prefix}tts <Text>
║- ${prefix}listprem
║- ${prefix}cekprem
║- ${prefix}chatbot < on/off >
║- ${prefix}ai < Text >
║- ${prefix}translate < Reply Message >
║- ${prefix}google < Search >
║- ${prefix}jo < Text >
║- ${prefix}qr < Text >
║- ${prefix}encode < Text >
║- ${prefix}decode < Text >
╚════╝

╔══ 『 Maker Menu 』
║- ${prefix}sketch-logo <Text>
║- ${prefix}comic-logo <Text>
║- ${prefix}water-logo <Text>
║- ${prefix}style-logo <Text>
║- ${prefix}runner-logo <Text>
║- ${prefix}starwars-logo <Text>
╚════╝

╔══ 『 Game Menu 』
║- ${prefix}tebakgambar  🖼️
║- ${prefix}caklontong
║- ${prefix}tebakkata  📝
║- ${prefix}siapakahaku  🤔
║- ${prefix}tebaklagu  🎵
║- ${prefix}tebakkimia
║- ${prefix}soal
║- ${prefix}tod
╚════╝

╔══ 『 Premium Menu 』
║- ${prefix}hentai
║- ${prefix}addfitur _< Nama Fitur|Respons >_
║- ${prefix}delfitur _< Nama Fitur >_
╚════╝

╔══ 『 Poin Menu 』
║- ${prefix}poin
║- ${prefix}top
╚════╝


╔══ 『 Owner Menu 』
║- ${prefix}setpp <Reply Image>
║- ${prefix}setexif <PackName|Author>
║- ${prefix}join <WhatsApp Group Link>
║- ${prefix}leave
║- ${prefix}addplugins
║- ${prefix}deleteplugins
║- ${prefix}public
║- ${prefix}self
║- ${prefix}create-token
║- ${prefix}unblock <628XXX>
║- ${prefix}resetpoin
║- ${prefix}backup
╚════╝

╔══ 『 Group Menu 』
║- ${prefix}setppgc <Reply Image>
║- ${prefix}welcome <on/off>
║- ${prefix}antilink <Enable/Disable>
║- ${prefix}hidetag <Text>
║- ${prefix}tagall <Message>
║- ${prefix}kick <Reply Message>
║- ${prefix}add <Reply Message>
║- ${prefix}setname <Text>
║- ${prefix}setdesc <Text>
║- ${prefix}open  🔓
║- ${prefix}locked  🔒
║- ${prefix}unlocked  🔓
║- ${prefix}close  🔒
║- ${prefix}totag <Reply Image/Text/Video/Sticker/Audio>
║- ${prefix}promote <Reply Message>
║- ${prefix}demote <Reply Message>
╚════╝

╔══ 『 Downloader Menu 』
║- ${prefix}igstory <Username>
║- ${prefix}ytsearch <Song Title>
║- ${prefix}ytmp3 <Youtube Link>
║- ${prefix}ytmp4 <Youtube Link>
║- ${prefix}igdl <Instagram Link>
║- ${prefix}play <Song Title>
║- ${prefix}tiktok <TikTok Link>
║- ${prefix}tiktok2 <TikTok Link>
║- ${prefix}tiktok3 <TikTok Link>
║- ${prefix}tiktokmp3 <TikTok Link>
╚══════════╝
`
var tekos = `╔══ 『 Fitur Tambahan  』\n`
for (let i = 0; i < commandsDB.length; i ++){
tekos += `║- ${commandsDB[i].pesan}\n`
}
//_< Link MediaFire >_
/*if (!chats) {
    try {
        var url = chats
    var yt = await dl.youtubedl(url).catch(async () => await  dl.youtubedl(url))
    var dl_url = await yt.audio['128kbps'].download()
    bob.sendMessage(m.chat, {image: {url: yt.thumbnail}, caption: `*[ YOUTUBE MP3 ]*\n\nTitle : ${yt.title}\nSize : 128kbps\n_Audio Sedang Dikirim..._`})
    bob.sendMessage(m.chat, {audio: {url: dl_url}, mimetype: 'audio/mp4'}, {quoted: m})
    } catch (e) {
        console.log(`awok`)
    } 
}*/
        switch (command) {

            /*case 'menu': {
                const plugins = []
                let pluginFolder = path.join(__dirname, 'command')
                let pluginFilter = filename => /\.js$/.test(filename)
                for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
                    try {
                        plugins.push(plugins[filename] = require(path.join(pluginFolder, filename)))
                    } catch (e) {
                        console.log(e)
                        delete plugins[filename]
                    }
                }           
                const yaml = require('js-yaml')
                const commandsByCategory = {}
                const uncategorizedCommands = []

                plugins.forEach(plugin => {
                    const { CmD, categori } = plugin
                    if (!categori) {
                        uncategorizedCommands.push(...CmD)
                        return
                    }
                    if (!commandsByCategory[categori]) {
                        commandsByCategory[categori] = []
                    }
                    commandsByCategory[categori].push(...CmD)
                })

                const commandList = Object.entries(commandsByCategory).map(([category, commands]) => {
                    const indentedCommands = commands.map(cmd => `  - ${cmd}`).join('\n\n')
                    const final = `${category} :\n${indentedCommands}\n`
                    return final;
                })
                const pickRandom = (arr) => {
                    return arr[Math.floor(Math.random() * arr.length)]
                }

                if (uncategorizedCommands.length) {
                    const indentedUncategorizedCommands = uncategorizedCommands.map(cmd => `  - ${cmd}`).join('\n')
                    commandList.push(`Uncategorized commands:\n${indentedUncategorizedCommands}`)
                }

                const commandOutput = commandList.join('\n\n')
                const hsl = (yaml.dump(yaml.load(commandOutput)))
                
                var button = [{ buttonId: ".owner", buttonText: { displayText: `Owner 👤` }, type: 1 }]
                        var img = fs.readFileSync('./media/icon.jpg')
                        console.log(img)
                        bob.sendMessage(m.chat, { caption: `*NEW JO ~*\n\n` + menuku, image: img, buttons: button, footer: `~ @arsrfii`}, { quoted : m })
            }
            break */
            
            case 'addplugins': {
                if (!isCreator) return reply(mess.owner)
                  let name = q.split("|")[0]
                  let isi = q.split("|")[1]
                  if(!name) return reply("plugins name?")
                  if(!isi) return reply("the code?")
const Structure = `//** ${name}

${isi}

`            
            fs.writeFile(`./command/${name}.js`, Structure, (err) => { if (err) throw err; });    
            reply('success')        
            }
            break 
            case 'owner': {
                sendContact(m.chat, global.owner[0], 'Arasyaa [ OWNER SEWA ]')
                sendContact(m.chat, global.owner[1], 'Tria [ OWNER SUPPORT ]')
            }
            break
            case 'deleteplugins': {
                if (!isCreator) return reply(mess.owner)
                if (!q) return reply('masukan nama plugin')
                  try{ 
                    fs.unlinkSync(`./command/${q}.js`) 
                  } catch (e) { 
                    reply('terjadi kesalahan *(⁠>⁠0⁠<⁠；⁠)*\nhallo owner perhatian nama plugins yang ingin di hapus') 
                }
                reply('success')
            }
            break
            case 'menu': case 'dashboard': case 'help': case 'm': {
                let send = {
                    text: menuku,
                    mentions: [sender],
                    mimetype: 'application/pdf',
                    contextInfo: {
                        externalAdReply: {
                            title: `${pushname}`,
                            body: `Owner Bot : Arasya`,
                            thumbnail: fs.readFileSync(`./media/logo.png`),
                            sourceUrl: "https://chat.whatsapp.com/Famd1qzPzScBX4TSual41k",
                            mediaUrl: "https://my.arsrfii.repl.co",
                            renderLargerThumbnail: true,
                            showAdAttribution: false,
                            mediaType: 1
                        }
                    },
                }
                bob.sendMessage(m.chat, send, {quoted: fake2})
                }
                break
            case 'public': {
                if (!isCreator) throw mess.owner
                bob.public = true
                reply('Sukse Change To Public Usage')
            }
            break
            case 'self': {
                if (!isCreator) throw mess.owner
                bob.public = false
                reply('Sukses Change To Self Usage')
            }
            break

            case 'otpkode': case 'kodeotp': case 'getotp': {
                var kodeku = otpkode(5)
                
                let buttons = [{ buttonId: `/thx ${kodeku}`, buttonText: { displayText: 'Terima Kasih :>' }, type: 1 }]

                let buttonMessage = {
                    text: "Kode OTP Kamu :\n\n" + `MYOTP${kodeku}`,
                    footer: 'APPM',
                    buttons: buttons,
                    headerType: 2
                }
                bob.sendMessage(m.chat, buttonMessage, {
                    quoted: m
                })
            }
            break;
            
                //Flaming Logo
                case 'sketch-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #sketch-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                    limitAdd(m.sender, limit)
                }
                    break
                case 'comic-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #comic-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=comics-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                    limitAdd(sender, limit)
                }
                    break
                case 'water-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #water-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                }
                    break
                case 'style-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #style-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=style-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                }
                    break
                case 'runner-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #runner-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                }
                    break
                case 'starwars-logo': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) throw (`Silahkan Masukan Text\nExample : #starwars-logo arasyaku`)
                    reply('Tunggu Sebentar!\nSedang Membuat 🔃')
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=star-wars-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`}}, {quoted: m})
                }
                    break
                    case 'qr':{
                    if (!q) throw (`Silahkan Masukan Text\nExample : ${CmD} Mine`)
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://api.qrserver.com/v1/create-qr-code/?size=790x790&data=${q}`}}, {quoted: m})
                    }
                    break
                    

                    break
                    // Game
                    case 'tebakgambar': {
                        if (isPlayGame(m.chat, tebakgambar)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(m.chat, tebakgambar)].m)
                        var tg = JSON.parse(fs.readFileSync('./assets/tebakgambar.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nDeskripsi : ${data.deskripsi}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {caption: teks, image: {url: data.img}}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'TEBAK GAMBAR', jawab, global.gamewaktu, res, tebakgambar)
                    limitAdd(sender, limit)
                    })}
                    break
                    case 'tebakkata': {
                    if (isPlayGame(m.chat, tebakkata)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, tebakkata[getGamePosi(m.chat, tebakkata)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/tebakkata.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*TEBAK KATA*\n\n`+monospace(`Soal : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nDeskripsi : ${data.soal}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'TEBAK KATA', jawab, global.gamewaktu, res, tebakkata)
                    limitAdd(sender, limit)
                    })}
                    break
                    case 'tod': case 'truth': case 'dare':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        var randomtod = ["TRUTH","DARE"]
                        var randomtod2 = pickRandom(randomtod)
var textkuy = `❔ *[ TRUTH OR DARE ]* ❔

_Hasil :_ `
                        const { key } = await bob.sendMessage(m.chat, {text: textkuy + `DARE`}, { quoted: m });
                        await delay(500);
                        await bob.sendMessage(m.chat, { text: textkuy + `TRUTH`, edit: key})
                        await delay(500);
                        await bob.sendMessage(m.chat, { text: textkuy + `DARE`, edit: key})
                        await delay(500);
                        await bob.sendMessage(m.chat, { text: textkuy + `TRUTH`, edit: key})
                        await delay(500);
                        await bob.sendMessage(m.chat, { text: textkuy + `DARE`, edit: key})
                        await delay(500);
                        await bob.sendMessage(m.chat, { text: textkuy + `TRUTH`, edit: key})
                        await delay(500);
                       bob.sendMessage(m.chat, { text: textkuy + `*${randomtod2}*\n\nHASIL NYA ADALAH *${randomtod2}*\n\n_Maka, Lakukanlah Apa Yang Di Lakukan Di RandomBot ini_`, edit: key})
                       await sleep(3000)
                       if ( randomtod2 === "TRUTH") {
                        var truth = JSON.parse(fs.readFileSync(`./assets/db/truth.json`))
                        var randomtrut = pickRandom(truth)
                        bob.sendMessage(m.chat, {text: randomtrut}, {quoted: m})
                       }
                       if ( randomtod2 === "DARE") {
                        var dare = JSON.parse(fs.readFileSync(`./assets/db/dare.json`))
                        var randomdare = pickRandom(dare)
                        bob.sendMessage(m.chat, {text: randomdare}, {quoted: m})
                       }
                       limitAdd(sender, limit)
                     }
                    break
                    case 'siapakahaku': {
                    if (isPlayGame(m.chat, siapakahaku)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, siapakahaku[getGamePosi(m.chat, siapakahaku)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/siapakahaku.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*SIAPA AKU?*\n\n`+monospace(`Deskripsi : Siapakah aku? ${data.soal}\nPetunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'SIAPAKAH AKU?', jawab, global.gamewaktu, res, siapakahaku)
                    limitAdd(sender, limit)

                    })}
                    break
                    case 'caklontong': {
                    if (isPlayGame(m.chat, caklontong)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, caklontong[getGamePosi(m.chat, caklontong)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/caklontong.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*CAK LONTONG*\n\n`+monospace(`Deskripsi : ${data.soal}\nPetunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'CAK LONTONG', jawab, global.gamewaktu, res, caklontong)
                    limitAdd(sender, limit)

                    })}
                    case 'soal': {
                    if (isPlayGame(m.chat, soal)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, soal[getGamePosi(m.chat, soal)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/soal.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.jawaban.split('Jawaban ').join('')
                    var teks = `*MENJAWAB SOAL INI!*\n\n`+monospace(`Deskripsi : ${data.pertanyaan}\nJawaban : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'SOAL RANDOM', jawab, global.gamewaktu, res, soal)
                    limitAdd(sender, limit)

                    })}
                    break
                    case 'tebakkimia': {
                    if (isPlayGame(m.chat, teki)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, teki[getGamePosi(m.chat, teki)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/tebakkimia.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.lambang.split('Jawaban ').join('')
                    var teks = `*TEBAK KIMIA*\n\n`+monospace(`Apa Nama Lambang Dari Unsur Berikut : : ${data.unsur}\nWaktu : ${global.gamewaktu} Detik`)
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(m.chat, 'TEBAK KIMIA', jawab, global.gamewaktu, res, teki)
                    limitAdd(sender, limit)

                    })}
                    break
                    case 'tebaklagu': {
                    if (isPlayGame(m.chat, tebaklagu)) return reply(m.chat, `Masih ada game yang belum diselesaikan`, tebaklagu[getGamePosi(m.chat, tebaklagu)].m)
                    var tg = JSON.parse(fs.readFileSync('./assets/tebaklagu.json'))
                    var data = pickRandom(tg)
                    data.jawaban = data.judul.split('Jawaban ').join('')
                    var teks = `*TEBAK LAGU*\n\n`+monospace(`Artis : ${data.artis}\nPetunjuk : ${data.judul.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : 5 Menit`)
                    bob.sendMessage(m.chat, {audio: {url: data.url}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                    bob.sendMessage(m.chat, {text: teks}, {quoted: m})
                    .then( res => {
                    var jawab = data.judul.toLowerCase()
                    addPlayGame(m.chat, 'TEBAK LAGU', jawab, 300, res, tebaklagu)
                    limitAdd(sender, limit)
                    })}
                    break
                    // Akhir Game
                    //Lain Lain
                    case 'hentai':{
                    if (!isPremium) return reply(`Fitur Ini Hanya Di Gunakan Oleh Pengguna Premium`)
                    var nfsmw = JSON.parse(fs.readFileSync(`./assets/nsfw/hentai.json`))
                    var randnfsmw = pickRandom(nfsmw)
                    reply(`Sebentar.\nMencari Di Internet.... 🔍`)
                    bob.sendMessage(m.chat, {image : {url: randnfsmw}, caption: `Sange`}, {quoted: m})
                    }
                    break
                    case 'removebg': case 'rb':{
                    if (!isPremium) return reply(`Fitur Ini Hanya Di Gunakan Oleh Pengguna Premium`)
                    if (!isQuotedImage && !isImage)return reply(`Kirim Gambar dengan caption ${CmD} atau reply gambar dengan text ${CmD}!`)
                    if (isQuotedImage || isImage ) {
                    reply(global.mess.wait + `\nTunggu 5 Detik`)
                    var tete = await downloadAndSaveMediaMessage('image', 'rmvbg.jpg')
                    var tot = await upload(fs.readFileSync('rmvbg.jpg'))
                    rmvbg.rbFromImageUrl(tot, `5CwCfA9u2xaY9RYfuqpD7wXe`) //ini api punya guehhhhh
                    await sleep(5000)
                    bob.sendMessage(m.chat, {caption: `AI-` + otpkode(6) + `.png`, image: fs.readFileSync('output-2.png')}, {quoted: m})
                    }
                    fs.unlinkSync('output-2.png')
                    fs.unlinkSync('rmvbg.jpg')
                    }
                    break
                    case 'tomp3': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
                        reply(mess.wait)
                        try {
                        let media = await bob.downloadMediaMessage(qmsg)
                        let audio = await toAudio(media, 'mp4')
                        bob.sendMessage(m.chat, {
                            audio: audio,
                            mimetype: 'audio/mp4'
                        }), {
                            quoted: m
                        }
                    } catch (error) {
                        reply(`Size Video Kegedean`)
                    }
        
                    }
                    break
                    case 'bajingan':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Masukan Nama\nExample : ${CmD} ${pushname}`)
                    var link = `https://api.memegen.link/images/custom/Bajingan_Lu/${q}.png?background=https://telegra.ph/file/d608ec3cb57ff6b9ac708.jpg`
                    bob.sendImageAsSticker(m.chat, link, m, { packname: global.packname, author: global.author })
                    }
                    break
                    case 'sholatku':
                        case 'jadwalsholat':
                            case 'sholat': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var tglsholat = moment.tz('Asia/Jakarta').format('YY/MM/DD')
                    if (q) { 
                    try {
                    var linksholat = await fetchJson(`https://api.myquran.com/v1/sholat/kota/cari/${q}`)
                    var linksholat2 = await fetchJson(`https://api.myquran.com/v1/sholat/jadwal/${linksholat.data[0].id}/20` + tglsholat)
                    var teksnya = `*[ JADWAL SHOLAT ${linksholat.data[0].lokasi} ]*

ID : ${linksholat.data[0].id}
LOKASI : ${linksholat.data[0].lokasi}
DAERAH : ${linksholat2.data.daerah}

TANGGAL : ${linksholat2.data.jadwal.tanggal}
IMSAK : ${linksholat2.data.jadwal.imsak}
SUBUH : ${linksholat2.data.jadwal.subuh}
TERBIT : ${linksholat2.data.jadwal.terbit}
DHUHA : ${linksholat2.data.jadwal.dhuha}
DZUHUR : ${linksholat2.data.jadwal.dzuhur}
ASHAR : ${linksholat2.data.jadwal.ashar}
MAGHRIB : ${linksholat2.data.jadwal.maghrib}
ISYA : ${linksholat2.data.jadwal.isya}

Jadwal Ini Di Terbitkan Pada Tanggal : ${linksholat2.data.jadwal.date}

_Cek Jadwal Sholat Lebih Lanjut Di : https://sholatku.arsrfii.repl.co_
                    `
                    reply(teksnya)
                    } catch (error) {
                        reply(`Maaf. Kota Tidak Di Temukan`)
                    }
                } else if (!q){
                    try {
                        var linksholat = await fetchJson(`https://api.myquran.com/v1/sholat/kota/cari/jakarta`)
                        var linksholat2 = await fetchJson(`https://api.myquran.com/v1/sholat/jadwal/${linksholat.data[0].id}/20` + tglsholat)
                        var teksnya = `*[ JADWAL SHOLAT ${linksholat.data[0].lokasi} ]*
    
ID : ${linksholat.data[0].id}
LOKASI : ${linksholat.data[0].lokasi}
DAERAH : ${linksholat2.data.daerah}

TANGGAL : ${linksholat2.data.jadwal.tanggal}
IMSAK : ${linksholat2.data.jadwal.imsak}
SUBUH : ${linksholat2.data.jadwal.subuh}
TERBIT : ${linksholat2.data.jadwal.terbit}
DHUHA : ${linksholat2.data.jadwal.dhuha}
DZUHUR : ${linksholat2.data.jadwal.dzuhur}
ASHAR : ${linksholat2.data.jadwal.ashar}
MAGHRIB : ${linksholat2.data.jadwal.maghrib}
ISYA : ${linksholat2.data.jadwal.isya}

Jadwal Ini Di Terbitkan Pada Tanggal : ${linksholat2.data.jadwal.date}
Noted :  Jika Ingin Berpindah Ke Kota Lain. Silahkan Ketik : 
${CmD} Tangerang
                        `
                        reply(teksnya)
                        } catch (error) {
                            reply(`Maaf. Kota Tidak Di Temukan`)
                        }
                }
                    }
                    break
                    case 'toimg':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!/webp/.test(mime)) return m.reply(`Reply sticker dengan caption *${prefix + command}*`)
                        let media = await bob.downloadAndSaveMediaMessage(qmsg)
                        let ran = await getRandom('.png')
                        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                            fs.unlinkSync(media)
                            if (err) return m.reply(err)
                            let buffer = fs.readFileSync(ran)
                            bob.sendMessage(m.chat, { caption: `Success Convert Sticker To Image`, image: buffer }, { quoted: m })
                            fs.unlinkSync(ran)
                        })
                    }
                    break
                    case 'translate': case 'tr':{
                        if (!isQuotedMsg) return reply(`Reply Pesan.`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        translate.translate(quoted.text, {to: `id`}).then ( data => {
                            bob.sendMessage(m.chat, {text: data.text}, {quoted: m})
                        })
                    }
                    break
                    case 'quotes': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        var kotes2 = JSON.parse(fs.readFileSync('./assets/quotes.json'))
                        var hasil = pickRandom(kotes2)
                        var img = fs.readFileSync('./media/icon.png')
                        console.log(img)
                        bob.sendMessage(m.chat, {text: hasil.quotes + `\n\n` + `~ ${hasil.author}`}, {quoted: m})
                        config(tiktokresi);
                        createAudioFromText(hasil.quotes, 'quotes', 'id_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`quotes.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                    }
                    break
                    case 'tts': case 'sbot' :{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!args.length === "12") return reply(`Text Terlalu Panjang`)
                        config(tiktokresi);
                        createAudioFromText(q, 'myAudio', 'id_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`myAudio.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                    }
                    break
                    case 'on':{
                    if (!isPremium && !isCreator)
                    fakereply(`Sukses.\nBot Telah Menyala Dan Sudah Terverifikasi.`)
                    }
                    break
                    case 'jo':{
                        if (isQuotedMsg) {

                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                            limitAdd(sender, limit)
                            
                            vitsUmamusumeVoiceSynthesizer(quoted.text, `草上飞 Grass Wonder (Umamusume Pretty Derby)`).then ( data => {
                                bob.sendMessage(m.chat, {audio: {url: data.url}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                            })
                        } else if (q) {
                            vitsUmamusumeVoiceSynthesizer(q, `草上飞 Grass Wonder (Umamusume Pretty Derby)`).then ( data => {
                                bob.sendMessage(m.chat, {audio: {url: data.url}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                            })
                        } else {
                            reply(`Masukan Text Setelah Perintah!\nExample : ${CmD} 皆さんこんにちは、私の名前はアラシャ・ラフィです`)
                        }
                    
                    }
                    break
                    case 'ttsjp': case 'jpbot' :{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!args.length === "12") return reply(`Text Terlalu Panjang`)
                        config(tiktokresi);
                        createAudioFromText(q, 'myAudio', 'jp_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`myAudio.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                    }
                    break
                    case 'decode':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Format salah!\n\nKirim perintah: ${prefix}decode *text*\nContoh: ${prefix}debinary 01110100 01100101 01110011`)
                    if (q.length > 2048) return reply('Maximal 2.048 String!')
                    function decodebinary(char) {
                    return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
                    }
                    reply(decodebinary(q))
                    }
                    break
                    case 'encode':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Format salah!\n\nKirim perintah: ${prefix}encode *text*\nContoh: ${prefix}encode i Love you`)
                    if (q.length > 2048) return reply('Maximal 2.048 String!')
                    function encodeBinary(char) {
                    return char.split("").map(str => {
                    const converted = str.charCodeAt(0).toString(2);
                    return converted.padStart(8, "0");
                    }).join(" ")
                    }
                    reply(encodeBinary(q))
                    }
                    break
                    case 'songb': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        config(tiktokresi);
                        createAudioFromText(q, 'songb', 'id_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`songb.mp3`), mimetype: 'audio/mp4'}, {quoted: m})
                    }
                    break
                    case 'menfess': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text!\nExample : ${prefix}menfess no|pesan`)
                        var number = q.split('|')[0] ? q.split('|')[0] : q
                        var textnyaku = q.split('|')[1] ? q.split('|')[1] : ''
                        if (!number) return reply(`Masukan Nomernya.\nExample : ${CmD} ${sender.split("@")[0]}`)
                        if (!textnyaku) return reply(`Masukan Pesan nya.\nExample : ${CmD} ${sender.split("@")[0]}|Haii`)
                        if (m.isGroup)return reply('Hanya Bisa Di Gunakan Private Message')
                        var caption = `*[ FITUR BOT MENFESS/SURAT ]*\n\nDari : Tidak Diketahui\nUntuk : Kamu\nPesan : *${textnyaku}*`
                        var button = [{ buttonId: `.cnfrmmen ${m.sender}`, buttonText: { displayText: `Menfess Confirmasi` }, type: 1 }]
                        var img = fs.readFileSync('./media/surat.jpeg')
                        bob.sendMessage(number.replace(/[-|+| |]/gi, '') + "@s.whatsapp.net", {image: img, caption: caption})
                        reply('Menfess Berhasil Terkirim.')
                    } 
                    break
                    case 'ppcp':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var ppcpnya =  await fetchJson(`https://raw.githubusercontent.com/VamsesOfficial/database2/master/image/ppcp.js`)
                    var randomppcp = pickRandom(ppcpnya)
                    bob.sendMessage(m.chat, {image: {url: randomppcp.cowo}, caption: `Cowo`})
                    bob.sendMessage(m.chat, {image: {url: randomppcp.cewe}, caption: `Cewe`})
                    }
                    break
                    case 'addimg': {
                        if (!isQuotedImage ) return reply('Reply Imagenya!')
                        if (isQuotedImage || isImage ) {
                            var mediaku = await downloadAndSaveMediaMessage("image", "tes.jpg")
                            }
                    }
                    break
                    case 'pinterest': case 'pin': {
                    if (!q) return reply(`Masukan Text\nExample : ${prefix}pinterest Pegunungan`)
                    reply(global.mess.wait)
                        var jumlah;
                        if (q.includes('--')) jumlah = q.split('--')[1]
                        pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
                          if (q.includes('--')) {
                            if (data.length < jumlah) {
                              jumlah = data.length
                              reply(`Hanya ditemukan ${data.length}, foto segera dikirim`)
                            }
                            for (let i = 0; i < jumlah; i++) {
                              bob.sendMessage(m.chat, { image: { url: data[i] }})
                            }
                          } else {
                            var button = [{ buttonId: `#pinterest ${q}`, buttonText: { displayText: `Next ➡️` }, type: 1 }]
                        bob.sendMessage(m.chat, {image: {url: pickRandom(data)}}, {quoted: m})
                          }
                        })
                        
                    }
                    break
                    case 'waifu':{
                    var linkjs = await fetchJson(`https://api.waifu.pics/sfw/waifu`)
                    reply(`Mencari Waifu Kamu... 🔍`)
                    bob.sendMessage(m.chat, {image: {url: linkjs.url}}, {quoted: m})
                    }
                    break
                    case 'esrgan': case 'tohd': case 'bagusin':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    limitAdd(sender, limit)
                    limitAdd(sender, limit)
                    limitAdd(sender, limit)
                        if (!isImage && !isQuotedImage) return reply(`Reply Gambar Atau Kirim Gambar dengan caption ${CmD}`)
                        reply(global.mess.wait + `\nTunggu 1 Menit Kurang`)
                        try {
                            const data = await quoted.download()
                            // Convert the buffer into a base64-encoded string
                            bob.sendMessage(m.chat, {react: { text: '⏳', key: m.key}})
                            const base64 = data.toString("base64");
                             //Set MIME type for PNG image
                            const mimeType = "image/png";
                             //Create the data URI
                            const dataURI = `data:${mimeType};base64,${base64}`;
                            const model = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b";
                            const input = {
                              image: dataURI,
                            };
                            const output = await replicate.run(model, { input });
                            console.log(output)
                            bob.sendMessage(m.chat, { caption: `Sukses!!`, image: { url: output} })
                            } catch (e) {
                            m.reply(`Eror! ukuran gambar terlalu besar atau tidak ada gambar yang dikirim dengan caption ${CmD}`)
                            }
                    }
                    break
  
                    case 'ssweb': case 'ss': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Masukan Text!\nExample ${CmD} https://youtube.com`)
                    if (q.includes('xnxx') && q.includes('pornhub')) return reply("Bokep Mulu Pikiran nya")
                    reply(global.mess.wait)
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://image.thum.io/get/width/1900/crop/1000/fullpage/` + q}})
                    }
                    break
                    case 'gempa': case 'infogempa': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        dl.gempa().then ( data => {
                            var text = `*[ INFO GEMPA TERKINI ]*\n\n*Locate :* ${data[0].locate}\n*Warning :* ${data[0].warning[0]}\n*Tanggal :* ${data[0].date}\n*Magnitude :* ${data[0].magnitude}\n*Jarak :* ${data[0].depth}\n*Desk :* ${data[0].location}`
                            sendbut(m.chat, text, `#dashboard`, `Back To Menu 🔙`, tgl + ' ' + jam)
                            bob.sendMessage(m.chat, {text: text}, {quoted: m})
                        })
                    }
                    break
                    case 'news': case 'liputan6': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!m.isGroup) {
                        
                        var teskd = `YOUTUBE SEARCH\n\n`
                        dl.liputan6().then ( data => {
                        var liput = data
                        var jumlah = 15
                        var list = []
                        for (let i = 0; i < jumlah; i++) {
                        list.push({
                        title: liput[i].title, rowId: `.liputanku ${liput[i].title}@${liput[i].link}@${liput[i].description}@${liput[i].label}`, description: liput[i].description})
                        }
                        var sections = [{title: `Hallo ${pushname} 👋`, rows:list}]
                        var listms = { text: `*NEWS BY JOJO*\n\n` + monospace(`Baca Berita Hari Ini, Untuk Menginformasi Dan Mengupdate Seluruh Berita Indonesia Maupun Diluar Negara.`), footer: tgl + ' ' + jam, buttonText: "Tekan Disini", sections }
                        bob.sendMessage(m.chat, listms, {quoted:m})
                    })
                    } else if (m.isGroup) {
                    dl.liputan6().then( data => {
                        let liputku = data
                        var jumlah = 10
                        if (liputku.length < jumlah) jumlah = liputku.length
                        var no = 0
                        let txt = `*NEWS BY JO*\n\n` + monospace(`Baca Berita Hari Ini, Untuk Menginformasi Dan Mengupdate Seluruh Berita Indonesia Maupun Diluar Negara.`)
                        for (let i = 0; i < jumlah; i++) {
                        no += 1
                        txt += `\n\n\n*ツ No Urutan : ${no.toString()}*\nツ *Title :* ${liputku[i].title}\nツ *Link :* ${liputku[i].link}\nツ *Deskripsi :* ${liputku[i].description}\nツ *Label :* ${liputku[i].label}`
                        }
                        sendbut(m.chat, txt, `/menu`, `Back To Menu 🔙`, tgl + ' ' + jam)
                        })
                    }}
                    break
                    case 'google': case 'ggl':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    gugel.search(q).then ( data => {
                        var gugelnya = `*[ GOOGLE ]*\n\nSearch : *${q}*\n\nJudul : *${data.results[1].title}*\n\nDeskripsi :\n` + monospace(`${data.results[1].description}`) + `\n\nLink : _${data.results[0].url}_`
                        reply(gugelnya)
                    })
                    }
                    break
                    case 'stiksearch': case 'searchstik':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var linkstik = stickersearch(q)
                    stickersearch(q).then ( data => {
                    var asu = pickRandom(data.sticker_url)
                    bob.sendImageAsSticker(m.chat, asu, m, { packname: global.packname, author: global.author })
                    }).catch( err => reply(`Sticker Nya Gada.`))}
                    break
                    case 'liputanku': {
                    var title = q.split("@")[0]
                    var link = q.split("@")[1]
                    var desk = q.split("@")[2]
                    var label = q.split("@")[3]
                    var textnyah = `*NEWS BY JO*\n\n` + monospace(`Baca Berita Hari Ini, Untuk Menginformasi Dan Mengupdate Seluruh Berita Indonesia Maupun Diluar Negara.\n\n`) + `ツ *Title :* ${title}\nツ *Link :* ${link}\nツ *Deskripsi :* ${desk}\nツ *Label :* ${label}\n`
                    sendbut(m.chat, textnyah, `/menu`, `Back To Menu 🔙`, tgl + ' ' + jam)
                    }
                    break
                    case 'addstik': {
                    if (isQuotedSticker) {
                    var donglod = await downloadAndSaveMediaMessage(`sticker`, `sticker/${q}.webp`)
                    reply(`sukses`)
                    }
                    }
                    break
                    case 'sticker': case 's': case 'stickergif': case 'sgif': {
                        if (/image/.test(mime)) {
                             let media = await bob.downloadMediaMessage(qmsg)
                             let encmedia = await bob.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: pushname })
                             await fs.unlinkSync(encmedia)
                         } else if (/video/.test(mime)) {
                         reply(global.mess.wait)
                             if (qmsg.seconds > 11) return reply('Maksimal 10 detik!')
                             let media = await bob.downloadMediaMessage(qmsg)
                             let encmedia = await bob.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: pushname })
                             await fs.unlinkSync(encmedia)
                         } else {
                             reply(`Kirim/Reply Gambar/Video/Gif Dengan Caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
                      }
                         }
                         break
                         case 'take': case 'swm': case 'stickerwm': case 'ambil': {
                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        try {
                        if (!isImage && !isQuotedImage && !isQuotedSticker) return reply(`Kirim/Reply Gambar/Reply Sticker Dengan PackName Dan Author\nExample : ${CmD} ${pushname}|Sticker Aku`)
                            let packnem = q.split("|")[0]
                            let autor = q.split("|")[1]
                            if (/image/.test(mime)) {
                                 let media = await bob.downloadMediaMessage(qmsg)
                                 let encmedia = await bob.sendImageAsSticker(m.chat, media, m, { packname: packnem, author: autor })
                                 await fs.unlinkSync(encmedia)
                             } 
                             else if (/video/.test(mime)) {
                                reply(global.mess.wait)
                                    if (qmsg.seconds > 11) return reply('Maksimal 10 detik!')
                                    let media = await bob.downloadMediaMessage(qmsg)
                                    let encmedia = await bob.sendVideoAsSticker(m.chat, media, m, { packname: packnem, author: autor })
                                    await fs.unlinkSync(encmedia)
                                } else {
                                 reply(`Kirim/Reply Gambar/Reply Sticker Dengan PackName Dan Author\nExample : ${CmD} ${pushname}|Sticker Aku`)
                          }
                             } catch (e) { if (!isImage && !isQuotedImage && !isQuotedSticker) return reply(`Kirim/Reply Gambar/Reply Sticker Dengan PackName Dan Author\nExample : ${CmD} ${pushname}|Sticker Aku`)
                             let packnem = q.split("|")[0]
                             let autor = q.split("|")[1]
                             if (/image/.test(mime)) {
                                  let media = await bob.downloadMediaMessage(qmsg)
                                  let encmedia = await bob.sendImageAsSticker(m.chat, media, m, { packname: `Arasyaaa`, author: `@arsrfii` })
                                  await fs.unlinkSync(encmedia)
                              } else {
                                  reply(`Kirim/Reply Gambar/Reply Sticker Dengan PackName Dan Author\nExample : ${CmD} ${pushname}|Sticker Aku`)
                           }}}
                             break
                    case 'tourl': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!isImage && !isQuotedImage) return reply(`Reply Gambar Atau Kirim Gambar dengan caption ${prefix}tourl`)
                        if ( isImage || isQuotedImage ) {
                            var mek = await downloadAndSaveMediaMessage(`image`, 'upload.jpg')
                            var tot = await upload(fs.readFileSync('upload.jpg'))
                            bob.sendMessage(m.chat, {text: `Sukses Membuat Link\nLink : ${tot}`}, {quoted: m})
                            fs.unlinkSync('upload.jpg')
                            } else if ( isVideo || isQuotedVideo ) {
                            reply(global.mess.wait)
                            var mek = await downloadAndSaveMediaMessage(`video`, 'upload.mp4')
                            var tot = await upload(fs.readFileSync('upload.mp4'))
                            bob.sendMessage(m.chat, {text: `Sukses Membuat Link\nLink : ${tot}`}, {quoted: m})
                            fs.unlinkSync('upload.mp4')
                            } else {
                              reply(`Kirim gambar/video dengan caption: ${command}`)
                            }
                    } 
                    break

                    case 'stcmeme': case 'smeme': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!isImage && !isQuotedImage && !isQuotedSticker) return reply(`Reply Gambar Atau Kirim Gambar dengan caption ${prefix}stcmeme Kamu|Wibu`)
                        let name = q.split("|")[0]
                        let isi = q.split("|")[1]
                        if (!name) return reply("Masukan Text Atas")
                        if (!isi) return reply("Masukan Text Bawah")
                        reply('Proses Membuat...')
                        if (isImage || isQuotedImage) {
                            var meme = await downloadAndSaveMediaMessage("image", "memegen.jpg")
                            var generator = await upload(fs.readFileSync('memegen.jpg'))
                            var link = await getBuffer(`https://api.memegen.link/images/custom/${name}/${isi}.png?background=${generator}`)
                            let encmedia = await bob.sendImageAsSticker(m.chat, link, m, { packname: global.packname, author: global.author })
                        } 
                        setTimeout( () => {
                            fs.unlinkSync(`memegen.jpg`) // ur cods
                            }, 5000) // 1000 = 1s,
                    } 
                    break
                    case 'addrespon':
                    case 'addresp':
                    case 'addfitur':
                    case 'newfitur': {
                    
                    if (!isCreator && !isPremium )return reply(mess.owner)
                    var pesan = q.split('|')[0] ? q.split('|')[0] : q
                    var balas = q.split('|')[1] ? q.split('|')[1] : ''
                    if (!pesan) return reply(`Apa Fiturnya?`)
                    if (!balas) return reply(`Apa Respon nya?`)
                    if (checkCommands(pesan, commandsDB) === true) return reply(`Udah ada`)
                    addCommands(pesan, balas, sender, commandsDB)
                    reply(`Nama Fitur : ${pesan}\nBalas : ${balas}\nSukses Di Tambahankan!`)
                    }
                    break
                    case 'delrespon':
                    case 'delresp':
                    case 'delfitur':
                    case 'deletefitur':  {
                    if (!isCreator && !isPremium)return reply(mess.owner)
                    if (!checkCommands(q, commandsDB)) return reply(`Maaf. Fitur tersebut tidak ada`)
                    deleteCommands(q, commandsDB)
                    reply(`Fitur ${q} telah di hapus.`)
                    }
                    break
                    case 'stcmeme2': case 'smeme2': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!isImage && !isQuotedImage) return reply(`Reply Gambar Atau Kirim Gambar dengan caption ${prefix}stcmeme Kamu|Wibu`)
                        if (!q) return reply(`Masukan Text!\nExample : ${prefix}stcmeme2 Anjay`)
                        reply('Proses Membuat...')
                        if (isImage || isQuotedImage) {
                            var meme = await downloadAndSaveMediaMessage("image", "memegen.jpg")
                            var generator = await upload(fs.readFileSync('memegen.jpg'))
                            var link = await getBuffer(`https://api.memegen.link/images/custom/%E3%85%A4_/${q}.png?background=${generator}`)
                            let encmedia = await bob.sendImageAsSticker(m.chat, link, m, { packname: global.packname, author: global.author })
                            fs.unlinkSync('memegen.jpg')
                        }
                        setTimeout( () => {
                            fs.unlinkSync(`memegen.jpg`) // ur cods
                            }, 5000) // 1000 = 1s,
                    } 
                    break
                    case 'memegen': case 'memeg': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!isImage && !isQuotedImage) return reply(`Reply Gambar Atau Kirim Gambar dengan caption ${prefix}memegen Kamu|Wibu`)
                        reply(global.mess.wait)
                        let name = q.split("|")[0]
                        let isi = q.split("|")[1]
                        if (!name) return reply("Masukan Text Atas")
                        if (!isi) return reply("Masukan Text Bawah")
                        if (isImage || isQuotedImage) {
                            var meme = await downloadAndSaveMediaMessage("image", "memeg.jpg")
                            var generator = await upload(fs.readFileSync('memeg.jpg'))
                            var link = await getBuffer(`https://api.memegen.link/images/custom/${name}/${isi}.png?background=${generator}`)
                            bob.sendMessage(m.chat, {image: link, caption: `${name} ${isi}`}, {quoted: m})
                            setTimeout( () => {
                                fs.unlinkSync(`memeg.jpg`) // ur cods
                                }, 5000) // 1000 = 1s,
                        }
                    } 
                    break
                    case 'tstik': case 'tstick': case 'ttp':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text!\nExample : ${CmD} Aku`)
                        reply(`Bentar`)
                        let encmedia = await bob.sendImageAsSticker(m.chat, `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=comics-logo&doScale=true&scaleWidth=500&scaleHeight=500&fontsize=160&text=${q}`, m, { packname: global.packname, author: global.author })
                    }
                    break
                    ///BANK 
                   /* case 'topbalance': {
                        
                        balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                        let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                        let arrTop = []
                        var total = 10
                        if (balance.length < 10) total = balance.length
                        for (let i = 0; i < total; i ++){
                        top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                        arrTop.push(balance[i].id)
                        }
                        ngetag(top, arrTop, true)
                        
                    }
                    break*/
                    case 'meme':{
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var link = JSON.parse(fs.readFileSync(`./assets/darkjokes.json`))
                    var randomeme = pickRandom(link)
                    bob.sendMessage(m.chat, {image: {url: randomeme.result}}, {quoted: m})
                    }
                    break
                    case 'emojimix':{
                        if (!q) return reply(`Masukan Emojinya, Misalnya\n${CmD} 🤣+😎`)
                        try {
                        var emoji = q.split("+")[0]
                        var emoji2 = q.split("+")[1]
                        if (!emoji) return reply(`Masukan Emoji Pertama!\nMisalnya\n${CmD} 🤣+😎`)
                        if (!emoji2) return reply(`Masukan Emoji Kedua!\nMisalnya\n${CmD} 🤣+😎`)
                        let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`)
                        for ( let i of anu.results ) {
                        let encmedia = await bob.sendImageAsSticker(m.chat, i.url, m, { packname: "My Sticker", author: pushname})
                        }
                    } catch (error) {
                        console.log("Eror");
                        reply("Emmm, sepertinya stickernya gak bisa di mix kak      ")
                    }
                    }
                    break
                    case 'pointop': {
                        
                        limit.sort((a, b) => (a.limit < b.limit) ? 1 : -1)
                        let top = '*── 「 SELAMAT 」 ──*\n\n'
                        let arrTop = []
                        var total = 1
                        if (limit.length < 1) total = limit.length
                        for (let i = 0; i < total; i ++){
                        top += `Selamat Kepada :\n@${limit[i].id.split("@")[0]} Telah Memakai Fitur\nBot Sebanyak: ${limit[i].limit} Fitur\n\nPada Tanggal : ${tgl}`
                        arrTop.push(limit[i].id)
                        }
                        ngetag(top, arrTop, true)
                        
                    }
                    break
                    case 'limit': case 'poin': {
                    var limitPrib = `${getLimit(m.sender, limitCount, limit)}/${limitCount}`
                  //  reply(`Limit : ${limitPrib}\nBalance : $${getBalance(m.sender, balance)}\n\nKamu dapat membeli poin dengan cara ketik ${prefix}buypoin`)
                    var textbro = 
`✨ *𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗦𝗜 𝗣𝗢𝗜𝗡 ✨

💰 Poin Ku : ${isPremium || isCreator ? '*Unlimited*' : limitPrib}\n\n` + monospace(`POIN Akan Di Reset Setiap Harinya!\nCapai Top 1 Pengguna JOJO BOT!.\nKetik #top Untuk Melihat Saingan Kamu!`)
                    reply(textbro)
                    }
                    break
                    case 'top':{
                        limit.sort((a, b) => (a.limit < b.limit) ? 1 : -1)
                        let top = '*── 「 TOP PAKAI 」 ──*\n\n'
                        let arrTop = []
                        var total = 10
                        if (limit.length < 10) total = limit.length
                        for (let i = 0; i < total; i ++){
                        top += `${i + 1}. @${limit[i].id.split("@")[0]} => Telah Memakai : ${limit[i].limit} \n\n`
                        arrTop.push(limit[i].id)
                        }
                        ngetag(top, arrTop, true)
                    }
                    break
                    case 'resetpoin': {
                    if (!isCreator) return reply(mess.owner)
                    limitkosong = [];
                    limit.sort((a, b) => (a.limit < b.limit) ? 1 : -1)
                    let top = '*── 「 SELAMAT 」 ──*\n\n'
                    let arrTop = []
                    var total = 1
                    if (limit.length < 1) total = limit.length
                    for (let i = 0; i < total; i ++){
                    top += `Selamat Kepada :\n@${limit[i].id.split("@")[0]} Telah Memakai Fitur\nBot Sebanyak: ${limit[i].limit} Fitur\n\nPada Tanggal : ${tgl}\nPakai Fitur Bot Sebanyak\n Banyaknya Capai Top 1 Pemakai Bot Paling Banyak!.\n\nKetik #top Untuk Melihat Saingan Mu!\n\nMereset Poin.`
                    arrTop.push(limit[i].id)
                    }
                    bob.sendMessage(gcku, {text: top, mentions: arrTop})
                    await sleep(5000)
                    fs.writeFileSync('./assets/db/limit.json', JSON.stringify(limitkosong))
                    reply(`Poin Berhasil Di Reset.\nMereset Bot.`)
                    await sleep(2000)
                    exec(`pm2 restart index.js`, (err, stdout) => {
                        if (err) return reply(`${err}`)
                        if (stdout) return reply(stdout)
                    })
                    }
                    break
                    /*case 'buylimit': case 'buypoin': {
                    if (!q) return reply(`Kirim perintah *${prefix}buypoint* jumlah poin yang ingin dibeli\n\nHarga 1 poin = $200 balance`)
                    if (!q) return reply(`Jangan menggunakan -`)
                    if (isNaN(q)) return reply(`Harus berupa angka`)
                    let ane = Number(parseInt(q) * 200)
                    if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                    kurangBalance(sender, ane, balance)
                    giveLimit(sender, parseInt(q), limit)
                    reply(monospace(`Pembeliaan Poin sebanyak ${q} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Poin : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
                                        }
                    break
                    case 'cheatbalance':{
                    if (!isCreator) return reply(`Lo Siapa?`)
                    if (quoted) { 
                    addBalance(quoted.sender, `9999999999`, balance)
                    reply(`Sukses Ngecheat BALANCE ke nomer : ${quoted.sender}`)
                    } else {
                        addBalance(q.replace(/[-|+| |]/gi, '') + "@s.whatsapp.net", `9999999999`, balance)
                    reply(`Sukses Ngecheat BALANCE ke nomer : ${q.replace(/[-|+| |]/gi, '') + "@s.whatsapp.net"}`)
                    }
                    }
                    break*/
                    //akhir
                    //GROUP MENU
                    case 'setppgc': case 'setppgrup':{
                    if (!isGroupAdmins) return reply(global.mess.admin)
                    if (!/image/.test(mime)) return reply( `Kirim/Reply Image Dengan Caption ${prefix + command}`)
                    if (/webp/.test(mime)) return reply( `Kirim/Reply Image Dengan Caption ${prefix + command}`)
                    let mediaa = await quoted.download()
                    var { img } = await pepe(mediaa)
                    await bob.query({
                    tag: 'iq',
                    attrs: {
                    to: m.chat,
                    type:'set',
                    xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                    tag: 'picture',
                    attrs: { type: 'image' },
                    content: img
                    }
                    ]
                    })
                    reply(`Done`)
                    }
                    break
                    case 'infogc':
                    case 'infogrup':
                        case 'groupinfo':
                            case 'gcinfo':{
                    var id_gc = groupMetadata.id
                    var judul_gc = groupMetadata.subject
                    var desc = groupMetadata.desc
                    var admin = groupAdmins
                    var pemilik_gc = groupMetadata.owner
                    var buat_grup = moment(groupMetadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
                    var judul_diubah = moment(groupMetadata.subjectTime * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
                    var membernya = groupMetadata.size
                    var mems = []
                    var teksnya = `
*${judul_gc.toUpperCase()}*

🏆 *Nama Grup :* ${judul_gc}
👤 *Pemilik Grup :* @${pemilik_gc.split("@")[0]}
📅 *Di Buat* : ${buat_grup}
✏️ *Judul Diubah :* ${judul_diubah}
👥 *Member :* ${membernya}
👮‍♀️ *Total Admin :* ${admin.length}
📝 *Deskripsi :* ${desc}   

🌟━━━━━━━━━🌟
                    `;
                    
                    
                    bob.profilePictureUrl(m.chat, 'image').then( res => bob.sendMessage(m.chat, {caption: teksnya, image: { url: res }, mentions: [pemilik_gc]}, {quoted: m})).catch(() => bob.sendMessage(m.chat, {caption: teksnya, image: {url: `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`}, mentions: [pemilik_gc]}, {quoted: m}))
                    
                    }
                    break
                    case 'welcome':{
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (q.toLowerCase() === "on") {
                          if (isWelcome) return reply(`Welcome sudah aktif`)
                          welcome.push(m.chat)
                          fs.writeFileSync('./assets/db/welcome.json', JSON.stringify(welcome, null, 2))
                          reply(`Sukses mengaktifkan welcome di grup ini`)
                        } else if (q.toLowerCase() === "off") {
                          if (!isWelcome) return reply(`Welcome sudah nonaktif`)
                          var posi = welcome.indexOf(m.chat)
                          welcome.splice(posi, 1)
                          fs.writeFileSync('./assets/db/welcome.json', JSON.stringify(welcome, null, 2))
                          reply(`Sukses menonaktifkan welcome di grup ini`)
                        } else {
                          reply(`Pilih on atau off\nExample : ${CmD} on`)
                        }
                    }
                    break
                    case 'ai': case 'gpt': case 'chatgpt':{
                        if (!q) return reply(`Apa Yang Mau Di Ulas?\nExample : ${CmD} Kamu bisa apa?`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        console.log("->[\x1b[1;32mNew\x1b[1;37m]", color(`Command ${CmD} Dari`, 'yellow'), color(pushname, 'lightblue'), `: "${m.text}"`)
                        bob.sendPresenceUpdate("composing", m.chat);
                        try { 
                            //isi disini
                            const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: konten },
                { role: 'user', content: q },
            ],
        }),
    });

    const responseData = await response.json();
   reply(responseData.choices[0].message.content)
                } catch (e) {
                    reply("Maaf, lagi dalam perbaikan")
                } 
                    }
                    break
                    case 'chatbot':{
                        if (q.toLowerCase() === "on") {
                          if (isChatBot) return reply(`ChatBot Telah aktif`)
                          chatbot.push(m.chat)
                          fs.writeFileSync('./assets/db/chatbot.json', JSON.stringify(chatbot, null, 2))
                          reply(`Sukses mengaktifkan BOT GPT di grup ini`)
                        } else if (q.toLowerCase() === "off") {
                          if (!isChatBot) return reply(`CHATBOT GPT telah nonaktif`)
                          var posi = chatbot.indexOf(m.chat)
                          chatbot.splice(posi, 1)
                          fs.writeFileSync('./assets/db/chatbot.json', JSON.stringify(chatbot, null, 2))
                          reply(`Sukses menonaktifkan GPT BOT di grup ini`)
                        } else {
                          reply(`Pilih on atau off\nExample : ${CmD} on`)
                        }
                    }
                    break
                    case 'antilink': {
                    if (!m.isGroup) return reply(global.mess.group)
                    if (!isGroupAdmins) return reply(global.mess.admin)
                    if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                if (q.toLowerCase() === 'enable'){
                    if (isAntiLink) return reply(`Status Sudah Aktif.`)
                    antilink.push(m.chat)
					fs.writeFileSync('./assets/db/antilink.json', JSON.stringify(antilink))
					reply('Sukses Menyalakan Antilink Grup, Jika Ada Member Yg Send Link GC, BOT Akan KICK!')
                } else if (q.toLowerCase() === 'disable'){
                    let anu = antilink.indexOf(m.chat)
                    antilink.splice(anu, 1)
                    fs.writeFileSync('./assets/db/antilink.json', JSON.stringify(antilink))
                    reply('Nonaktif.')
                } else {
                    reply(`Pilih enable atau disable\nContoh : ${prefix}antilink enable`)
                }
            }
                break
                case 'chat': case 'qc': case 'fm': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    try{
                        if (!q) return m.reply('Missing parameter text')
                        const name = pushname
                        let q1 = m.quoted ? m.quoted : m
                        let teks = q 
                        const avatar = await bob.profilePictureUrl(quoted.sender, "image").catch(_ => "https://telegra.ph/file/89c1638d9620584e6e140.png")
                        let mime = (q1.m || q1).mimetype || '' 
                        
                        if (/image\/(jpe?g|png)/.test(mime)) { 
                        let media = await bob.downloadAndSaveMediaMessage(quoted,getRandom())
                        let anu = await upload(media)
                        const json = { type: "quote", format: "png", backgroundColor: "#4e4e4e", width: 512, height: 768,  scale: 3, messages: [{ entities: [], media: { url: anu.url }, avatar: true, from: { id: 1, name, photo: { url: avatar }}, text: teks, replyMessage: {} }]}
                         const { data } = await axios.post("https://bot.lyo.su/quote/generate", json, {
                            headers: {
                              "Content-Type": "application/json"
                            }
                          }).catch(e => e.response || {})
                          if(!data.ok) throw data
                        const buffer = Buffer.from(data.result.image, "base64")
                        
                        let encmedia2 = await bob.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author })

                        sleep(1000)
                        fs.unlinkSync(media)
                        
                        } else {
                        const json = { type: "quote", format: "png", backgroundColor: "#FFFFFF", width: 512, height: 768,  scale: 2, messages: [{ entities: [], avatar: true, from: { id: 1, name, photo: { url: avatar }}, text: teks, replyMessage: {} }]}
                        const { data } = await axios.post("https://bot.lyo.su/quote/generate", json, {
                            headers: {
                              "Content-Type": "application/json"
                            }
                          }).catch(e => e.response || {})
                          if(!data.ok) m.reply( data)
                        const buffer = Buffer.from(data.result.image, "base64")
                        let encmedia3 = await bob.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author })
                        }
                        } catch (e){
                            m.reply (`${e}`)
                            console.log(e)
                            return
                            }
                }
                break
                    case 'hidetag': {
                        if (!q) return reply(`Masukan Text\nExample : ${prefix}hidetag Hallo`)
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        let mem = [];
		        participants.map( i => mem.push(i.id) )
				bob.sendMessage(m.chat, { text: q ? q : '', mentions: mem }, {quoted: m})
                    }
                    break
                    case 'totag': case 'tagbot': {
                        if (!isQuotedAudio && !isQuotedImage && !isQuotedSticker && !isQuotedVideo && q) return reply(`Silahkan Reply Audio/Image/Sticker/Video/Text Dengan Text : ${CmD}`)
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (isQuotedSticker) {

                            if (/image/.test(mime)) {
                                let mem = [];
                                participants.map( i => mem.push(i.id) )
                                let media = await bob.downloadMediaMessage(qmsg)
                                let encmedia = await bob.sendImageAsSticker(m.chat, media, m, {packname: `Tag Hide Dari Grup`, author: groupMetadata.subject, mentions: mem })
                                await fs.unlinkSync(encmedia)
                            } else if (/video/.test(mime)) {
                                reply(global.mess.wait)
                                let mem = [];
                                participants.map( i => mem.push(i.id) )
                                let media = await bob.downloadMediaMessage(qmsg)
                                    let encmedia = await bob.sendVideoAsSticker({packname: `Tag Hide Dari Grup`, author: groupMetadata.subject, mentions: mem })
                                    await fs.unlinkSync(encmedia)
                                }
                        
                    } else if (isQuotedImage ) {
                        let mem = [];
                        participants.map( i => mem.push(i.id) )
                        var kodeid = otpkode(5)
                        var mediaku = await downloadAndSaveMediaMessage("image", `${kodeid}` + `.jpg`)
                        bob.sendMessage(m.chat, {caption: quoted.caption, image: fs.readFileSync(kodeid + `.jpg`), mentions: mem})
                        setTimeout( () => {
                            fs.unlinkSync(kodeid + `.jpg`)
                            }, 5000) // 1000 = 1s,
                        } else if (isQuotedVideo ) {
                            let mem = [];
                            participants.map( i => mem.push(i.id) )
                            var kodeid = otpkode(5)
                            var mediaku = await downloadAndSaveMediaMessage("video", `${kodeid}` + `.mp4`)
                            bob.sendMessage(m.chat, {caption: quoted.caption, video: fs.readFileSync(kodeid + `.mp4`), mentions: mem})
                            setTimeout( () => {
                                fs.unlinkSync(kodeid + `.mp4`)
                                }, 5000) // 1000 = 1s,
                            } else if (isQuotedAudio) {
                        let mem = [];
                        participants.map( i => mem.push(i.id) )
                        var kodeid = otpkode(5)
                        var mediaku = await downloadAndSaveMediaMessage("audio", `${kodeid}` + `.mp3`)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(kodeid + `.mp3`), mimetype: `audio/mp4`, ptt: true, mentions: mem})
                        setTimeout( () => {
                        fs.unlinkSync(kodeid + `.mp3`)
                        }, 5000) // 1000 = 1s,
                        } else {
                        let mem = [];
                        participants.map( i => mem.push(i.id) )
                        bob.sendMessage(m.chat, {text: quoted.text, mentions: mem})
                        }
                        
                }
                    break
                     case 'tagall': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        var mems = []
                        var teks = `╔══ *TAG MEMBER*\n╠ Pesan : ${q !== undefined ? q : `Pesan Tidak Ada`}\n║\n`
                        for (let i of participants) {
                            teks += `╠ ≻ @${i.id.split("@")[0]}\n`
                            mems.push(i.id)
                        }
                        bob.sendMessage(m.chat, { text: teks, mentions: mems}, { quoted: m })
                     }
                     break
                     case 'promote': case 'admin': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!quoted) return reply('Reply Pesan')
                         if (quoted) {
                        number = quoted.sender
                        bob.groupParticipantsUpdate(m.chat, [number], "promote")
                        .then( res => bob.sendMessage(m.chat, {text: `Sukses Admin Baru : @${quoted.sender.split("@")[0]}`, mentions: [quoted.sender]}, {quoted: m}))
                        .catch( err => bob.sendMessage(m.chat, {text: `Sukses Admin Baru : @${quoted.sender.split("@")[0]}`, mentions: [quoted.sender]}, {quoted: m}))
                        } else {
                        reply(`balas pesan member yang ingin dijadikan admin grup`)
                        }
                     }
                     break
                     case 'demote': case 'unadmin': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!quoted) return reply('Reply Pesan')
                         if (quoted) {
                        number = quoted.sender
                        bob.groupParticipantsUpdate(m.chat, [number], "demote")
                        .then( res => bob.sendMessage(m.chat, {text: `Sukses Menyingkirkan Admin : @${quoted.sender.split("@")[0]}`, mentions: [quoted.sender]}, {quoted: m}))
                        .catch( err => bob.sendMessage(m.chat, {text: `Sukses Menyingkirkan Admin : @${quoted.sender.split("@")[0]}`, mentions: [quoted.sender]}, {quoted: m}))
                        } else {
                        reply(`balas pesan member yang ingin dijadikan admin grup`)
                        }
                     }
                     break
                     case 'closegc': case 'close': case 'tutup': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        bob.groupSettingUpdate(m.chat, 'announcement')
                        reply('Sukses Menutup Grup')
                     }
                     break
                     case 'opengc': case 'open': case 'buka': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        bob.groupSettingUpdate(m.chat, 'not_announcement')
                        reply('Sukses Membuka Grup')
                     }
                     break
                     case 'lock': case 'locked': case 'kunci': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        bob.groupSettingUpdate(m.chat, 'locked')
                        reply('Sukses Mengunci Edit Setting')
                     }
                     break
                     case 'unlock': case 'unlocked': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        bob.groupSettingUpdate(m.chat, 'unlocked')
                        reply('Sukses Membuka Edit Setting')
                     }
                     break
                     case 'setname': case 'setnamegc': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!q) return reply(`Masukan Text Nama Group!\n${prefix}setname Dia kekasih mu yang Baru`)
                        bob.groupUpdateSubject(m.chat, q)
                        reply(`Nama Grup DiGanti :\n${q}`)
                     }
                     break
                     case 'setdesc': case 'setdesk': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!q) return reply(`Masukan Text Deskripsi Group!\n${prefix}setdesc Dia kekasih mu yang Baru`)
                        bob.groupUpdateDescription(m.chat, q)
                        reply(`Deskripsi DiGanti :\n${q}`)
                     }
                     break
                     case 'delete': case 'd': case 'del': {
                        if (!quoted) return
                        bob.sendMessage(m.chat, { delete: { fromMe: true, id: quoted.id, remoteJid: m.chat }})
                     }
                     break
                     case 'kick': case 'keluar': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!quoted) return reply('Reply Pesan')
                        bob.groupParticipantsUpdate(
                            m.chat, 
                            [quoted.sender],
                            "remove" // replace this parameter with "remove", "demote" or "promote"
                        )
                        ngetag(`Sukses Mengeluarkan @${quoted.sender.split("@")[0]}`, [quoted.sender])
                     }
                     break
                     case 'add': case 'tambahkan': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!quoted) return reply('Reply Pesan')
                        bob.groupParticipantsUpdate(
                            m.chat, 
                            [quoted.sender],
                            "add" // replace this parameter with "remove", "demote" or "promote"
                        )
                        ngetag(`Hallo @${quoted.sender.split("@")[0]} Selamat Datang`, [quoted.sender])
                     }
                     break
                    //AKHIR GROUP
                    //Main
                    case 'daftar':{
                    if (DaftarAnjay) return reply(`Kamu Sudah Daftar!.`)
                    daftar.push(sender)
                    fs.writeFileSync('./assets/db/daftar.json', JSON.stringify(daftar))
                    giveLimit(sender, `10`, limit)
                    var daftarnya = `Kamu sukses mendaftar dengan nomor *${sender.split("@")[0]}* Dan Bernama *${pushname}*, sehingga mendapatkan kode yaitu : *${otpkode(5)}*. Setelah itu mendapatkan 10 Poin`
                    await sleep(4000)
                    fakereply(daftarnya)
                    }
                    break
                    case 'sewa': case 'sewabot':{
var sewa = `Premium Bot

Price List Jojo :
1 Minggu : -
1 Bulan : Rp. 10.000
Permanent : Rp. 20.000


Silakan lakukan pembayaran melalui metode berikut:
1. Spay : 0882-1329-2687
2. Gopay : 0882-1329-2687
3. Dana : 0882-1329-2687

Setelah melakukan pembayaran, mohon konfirmasi melalui kontak di bawah ini:
Email: arasyarafi02@gmail.com
Whatsapp: 0882-1477-2441
Link : https://wa.me/6288214772441

Terima kasih telah menggunakan layanan Sewa Bot!`
fakereply(sewa)
                    }
                    break
                    case 'rules':{
var rules = `*[ PERATURAN BOT JOJO ]*

Berikut adalah beberapa aturan yang berlaku:

1. Dilarang melakukan spam kepada bot WhatsApp. Spam dapat mencakup mengirim pesan berulang-ulang dalam waktu singkat atau menggunakan skrip otomatis untuk mengganggu fungsi bot.
2. Dilarang keras menculik bot WhatsApp. Bot ini disediakan untuk memberikan bantuan dan informasi, jadi jangan mencoba mencuri kendali atasnya atau menyebabkan kerusakan.
3. Jika Anda mengalami kesalahan atau masalah dengan bot WhatsApp, harap laporkan kepada pemilik. Mereka akan membantu memperbaiki masalah tersebut.
4. Poin dalam sistem akan direset setiap hari pada pukul 12 malam (00:00). Pastikan untuk memanfaatkan poin Anda sebelum reset terjadi.
5. Penting untuk bergabung dalam Grup Jojo melalui link berikut: https://chat.whatsapp.com/Famd1qzPzScBX4TSual41k. Grup ini merupakan sumber informasi penting dan pembaruan terbaru yang berkaitan dengan bot WhatsApp.
6. Untuk menggunakan fitur #play, berikan jeda minimal 3 detik antara setiap penggunaan perintah. Ini akan membantu menjaga kinerja dan responsivitas bot.


*[ PENGERTIAN POIN BOT JOJO ]*` + monospace(`

Pengertian Poin : Poin digunakan sebagai mata uang virtual atau 'kredit' di dalam sistem bot ini. Dalam konteks ini, poin mewakili kesempatan Anda untuk menggunakan fitur-fitur tertentu yang disediakan oleh bot.

Setiap kali Anda menggunakan salah satu fitur bot, seperti meminta saran atau informasi, mengajukan pertanyaan, atau meminta bantuan dalam menyelesaikan tugas tertentu, sistem akan mengurangi jumlah poin Anda sebanyak 1.

Misalnya, jika Anda memiliki 10 poin dan menggunakan fitur bot tiga kali, maka poin Anda akan berkurang menjadi 7. Dengan kata lain, setiap penggunaan fitur bot akan menghabiskan 1 poin.

Namun, jika poin Anda sudah habis, jangan khawatir! Anda masih bisa menggunakan fitur daftar. Ketika Anda memanfaatkan fitur daftar, bot akan memberikan imbalan kepada Anda dengan mengirimkan 10 poin secara gratis. Dengan demikian, Anda dapat melanjutkan penggunaan fitur-fitur bot tanpa harus khawatir kehabisan poin.

Penting untuk diingat bahwa poin hanya memiliki nilai di dalam sistem bot ini dan tidak dapat ditukarkan dengan uang sungguhan. Fungsi utama dari poin adalah memberikan batasan pada penggunaan fitur bot agar tetap adil bagi semua pengguna.

Jadi, pastikan Anda mengelola poin Anda dengan bijak dan memanfaatkannya untuk mendapatkan bantuan dan informasi yang Anda butuhkan dari bot ini.

Mohon patuhi aturan-aturan ini agar kita dapat menggunakan bot WhatsApp dengan nyaman dan tanpa masalah. Terima kasih!
`)
fakereply(rules)
                    }
                    break
                    // akhir
                    // DOWNLOADER 
                    case 'ytmp4':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${CmD} https://youtu.be/GDND88fqt1o`)
                        if (!q.includes('yout')) return reply(global.mess.linkinv)
                        reply(global.mess.wait + `\nJika Tidak Dikirim, Maka Ukuran Video Terlalu Besar.`)
                    try {
                        var streamPipeline = promisify(pipeline);
                    var pidioku = ytdl(q, {quality: 'highest'});
                    var sampah = os.tmpdir();
                    var writableStream = fs.createWriteStream(`${sampah}/${title}.mp4`);
                    await streamPipeline(pidioku, writableStream);
                    bob.sendMessage(m.chat, {video: {url: `${sampah}/${title}.mp4`}}, {quoted: m})
                    } catch (error) {
                        reply('Ukuran Video Terlalu Besar.')
                    }
                    }
                    break
                    case 'ytmp3': case 'yta': case'ytaudio': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${CmD} https://youtu.be/GDND88fqt1o`)
                        if (!q.includes('yout')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                        var streamPipeline = promisify(pipeline);
                        var audioStream = ytdl(q, {
                            filter: 'audioonly',
                            quality: 'highestaudio',
                          });
                          var sampah = os.tmpdir();
                          var writableStream = fs.createWriteStream(`${sampah}/${title}.mp3`);
                        
                          await streamPipeline(audioStream, writableStream);
                          bob.sendMessage(m.chat, {audio: {url: `${sampah}/${title}.mp3`}, mimetype: 'audio/mp4'}, {quoted: m})
                    }
                    break
                    case 'tt': case 'tiktok':  {
                        try {
                            
                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                            limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${prefix}tiktok https://vm.tiktok.com/ZS8CoY9UX/`)
                        if (!q.includes('tiktok')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                    TiktokDL(q).then ( data => {
                        bob.sendMessage(m.chat, {caption: `Server 1`, video: {url: data.result.video[1]}}, {quoted: m})
                    })
                } catch (e) {
                    reply(`Eror kak, Coba pakai server 2 ketik ${prefix}tiktok2 ${q} `)
                }
                    }
                    break
                    case 'ttmp3': case 'tiktokmp3':  {
                        try {
                            
                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                            limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${prefix}tiktok https://vm.tiktok.com/ZS8CoY9UX/`)
                        if (!q.includes('tiktok')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                    TiktokDL(q).then ( data => {
                        bob.sendMessage(m.chat, {audio: {url: data.result.music[0]}, mimetype: 'audio/mp4'}, {quoted: m})
                    })
                } catch (e) {
                    reply(`Eror kak, Coba pakai server 2 ketik ${prefix}tiktok2 ${q} `)
                }
                    }
                    break
                    case 'tt2': case 'tiktok2':  {
                        try {
                            
                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                            limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${prefix}tiktok https://vm.tiktok.com/ZS8CoY9UX/`)
                        if (!q.includes('tiktok')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                    TiktokDL(q).then ( data => {
                        bob.sendMessage(m.chat, {caption: `Server 2`, video: {url: data.result.video[0]}}, {quoted: m})
                    })
                } catch (e) {
                    reply(`Eror kak, Coba pakai server 3 ketik ${prefix}tiktok3 ${q} `)
                }
                    }
                    break
                    case 'tt3': case 'tiktok3':  {
                        try {
                            
                            if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                            limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${prefix}tiktok https://vm.tiktok.com/ZS8CoY9UX/`)
                        if (!q.includes('tiktok')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                    TiktokDL(q).then ( data => {
                        bob.sendMessage(m.chat, {caption: `Server 3`, video: {url: data.result.video[2]}}, {quoted: m})
                    })
                } catch (e) {
                    reply(`Eror kak, Coba pakai server 1 ketik ${prefix}tiktok ${q} `)
                }
                    }
                    break
                    case 'igdl': case 'instagram': case 'ig':
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q)return reply(`Berikan Link\nExample : ${CmD} link`)
                    if (!isUrl(q)) return reply(`Link Ga Sesuai`)
                    if (!q.includes('instagram.com')) return reply(`Link Ga Sesuai`)
                    reply(global.mess.wait)
                    instagram(q).then( data => {
                    for ( let i of data ) {
                    if (i.type === "video") {
                    bob.sendMessage(m.chat, {video: {url: i.url}}, {quoted: m})
                    } else if (i.type === "image") {
                    bob.sendMessage(m.chat, { caption: `Sukses, Follow Instagram : @arsrfii`, image: { url: i.url }}, {quoted: m})
                    }
                    }
                    }).catch(() => reply(`ERORR. Postingan tidak Tersedia`))
			    break

                    case 'igstory': case 'igs':
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q)return reply(`Berikan Username nya\nExample : ${CmD} arsrfii`)
                    reply(`Scanning Username ${q}`)
                    var storis = `https://instagram.com/stories/` + q
                    instagram(storis.replace('@', '')).then( data => {
                    for ( let i of data ) {
                    if (i.type === "video") {
                    bob.sendMessage(m.chat, {video: {url: i.url}}, {quoted: m})
                    } else if (i.type === "image") {
                    bob.sendMessage(m.chat, { image: { url: i.url }}, {quoted: m})
                    }
                    }
                    }).catch(() => reply(`Story Eror!, Mungkin karena di private atau username tidak ada dan mungkin bisa saja dia tidak buat story`))
			    break
                    case 'mediafire': {
                        if (!isPremium) return reply(`Fitur Tersebut Khusus Pengguna Premium`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text\nExample ${CmD} https://www.mediafire.com/file/l8b3te4g1p8z354/module.zip/file`)
                        if (!q.includes('mediafire.com')) return reply(global.mess.linkinv)
                        reply(global.mess.wait)
                        dl.mediafiredl(q).then ( data => {
                            reply(`*[ MEDIA FIRE DOWNLOADER ]*\n\nName File : ${data.filename}\nSize : ${data.filesizeH}\n\n_Media Sedang Dikirim!_`)
                            bob.sendMessage(m.chat, {document: {url: data.url}, mimetype: 'zip', fileName: data.filename})
                        })
                    }
                    break
                    case 'play':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text Setelah Perintah!\n\n*Example For Voice Not* : ${CmD} Jakarta Hari Ini - For revenge --vn\n*Example For Document :* ${CmD} Jakarta Hari Ini - For revenge -doc\n*Example For Video :* ${CmD} Jakarta Hari Ini - For revenge --video`)
                        reply(mess.wait)
                        var cariyutup = await yts(q)
                        var url = cariyutup.all[0].url
                        var judul = cariyutup.all[0].title
                        var thumbnailnya = cariyutup.all[0].image
                        var desc = cariyutup.all[0].description
                        var teksyutup = `*[ DOWNLOAD YOUTUBE PLAY ]*\n\n 📛 Judul : ${judul}\n🔗 Link : ${url}\n📃 Deskripsi : ${desc}\n\nSedang Mengirim...`
                        bob.sendMessage(m.chat, {image: {url: thumbnailnya}, caption: teksyutup}, {quoted: m})
                        const streamPipeline = promisify(pipeline);
                        const audioStream = ytdl(url, {
                            filter: 'audioonly',
                            quality: 'highestaudio',
                          });
                          const sampah = os.tmpdir();
                          const writableStream = fs.createWriteStream(`${sampah}/${title}.mp3`);
                        
                          await streamPipeline(audioStream, writableStream);
                          bob.sendMessage(m.chat, {audio: {url: `${sampah}/${title}.mp3`}, fileName: title, mimetype: 'audio/mp4'}, {quoted: m})
                        }
                        break
                    /*case 'play': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text Setelah Perintah!\n\n*Example For Voice Not* : ${CmD} Jakarta Hari Ini - For revenge --vn\n*Example For Document :* ${CmD} Jakarta Hari Ini - For revenge -doc\n*Example For Video :* ${CmD} Jakarta Hari Ini - For revenge --video`)
                        reply(mess.wait)
                        var pasu = `ptt`

                        if (q.includes('--vn')) {
                        var ytserc = await yts(q.replace('--vn', ''))
                        var url = ytserc.all[0].url
                        var yt = await dl.youtubedl(url).catch(async () => await  dl.youtubedl(url))
                        var dl_url = await yt.audio['128kbps'].download()
                        bob.sendMessage(m.chat, {image: {url: yt.thumbnail}, caption: `*[ YOUTUBE PLAY ]*\n\nTitle : ${yt.title}\nSize : 128kbps\nType : Voice Not\n_Audio Sedang Dikirim..._`}, {quoted: m})
                        bob.sendMessage(m.chat, {audio: {url: dl_url}, mimetype: `audio/mp4`, ptt: true}, {quoted: m})
                    } else 
                    if (q.includes('--doc')) {
                        var ytserc = await yts(q.replace('--doc', ''))
                        var url = ytserc.all[0].url
                        var yt = await dl.youtubedl(url).catch(async () => await  dl.youtubedl(url))
                        var dl_url = await yt.audio['128kbps'].download()
                        bob.sendMessage(m.chat, {image: {url: yt.thumbnail}, caption: `*[ YOUTUBE PLAY ]*\n\nTitle : ${yt.title}\nSize : 128kbps\nType : Document\n_Audio Sedang Dikirim..._`}, {quoted: m})
                        bob.sendMessage(m.chat, {document: {url: dl_url}, fileName: yt.title + `.mp3`, caption: yt.title + `\nhttps://my.arsrfii.repl.co`, mimetype: `audio/mp3`})
                    } else 
                    if (q.includes('--video')) {
                        var ytserc = await yts(q.replace('--video', ''))
                        var url = ytserc.all[0].url
                        var yt = await dl.youtubedl(url).catch(async () => await  dl.youtubedl(url))
                        var dl_url = await yt.video['720p'].download()
                        bob.sendMessage(m.chat, {image: {url: yt.thumbnail}, caption: `*[ YOUTUBE PLAY ]*\n\nTitle : ${yt.title}\nSize : 128kbps\nType : Video\nVideo Sedang Dikirim..._`}, {quoted: m})
                        bob.sendMessage(m.chat, {video: {url: dl_url}, caption: yt.title + `\nhttps://my.arsrfii.repl.co`}, {quoted: m})
                    } else {
                        var ytserc = await yts(q)
                        var url = ytserc.all[0].url
                        var yt = await dl.youtubedl(url).catch(async () => await  dl.youtubedl(url))
                        var dl_url = await yt.audio['128kbps'].download()
                        bob.sendMessage(m.chat, {image: {url: yt.thumbnail}, caption: `*[ YOUTUBE PLAY ]*\n\nTitle : ${yt.title}\nSize : 128kbps\nType : Default ( Audio )\n_Audio Sedang Dikirim..._`}, {quoted: m})
                        bob.sendMessage(m.chat, {audio: {url: dl_url}, mimetype: `audio/mp4`}, {quoted: m})
                    }}
                    break*/
                    case 'yts': case 'ytsearch': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Masukan Text\nExample ${prefix}yts Jakarta Hari Ini - For Revenge`)
                    var teskd = `YOUTUBE SEARCH\n\n`
                    yts(q).then( data => {
                        let yt = data.all
                        var jumlah = 15
                        if (yt.length < jumlah) jumlah = yt.length
                        var no = 0
                        let txt = `*YOUTUBE SEARCH*\n\n*Data berhasil didapatkan*\n*Hasil pencarian dari : ${q}*`
                        for (let i = 0; i < jumlah; i++) {
                        no += 1
                        txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
                        }
                        bob.sendMessage(m.chat, { image: { url: yt[0].image }, caption: txt }, { quoted: m })
                        })
                    }
                    break
                    //Akhir Downloader
                    // Owner Menu
                    /*case 'addprem': {
                    if (!q && !isQuotedMsg) return reply(`Masukan Nomor Pengguna Premium Atau Reply Chat\nExample : ${CmD} 6288213292687`)
                    if (!isCreator) throw mess.owner
                    if (!isQuotedMsg) {
                    prem2.push(quoted.sender)
					fs.writeFileSync('./assets/db/prem2.json', JSON.stringify(prem2))
					reply('Sukses Menambahkan Pengguna Premium.')
                    await sleep(1000)
					bob.sendMessage(quoted.sender, {text: `Hallo Kak, Nama kamu sudah\nTerdaftar Di Pengguna premium ya!\n\nSilahkan Konfirmasi dengan cara ketik .jo-done`})
                    } else if (!q) {
                    prem2.push(q.replace(/[-|+| |]/gi, '') + "@s.whatsapp.net")
                    fs.writeFileSync('./assets/db/prem2.json', JSON.stringify(prem2))
                    reply('Sukses Menambahkan Pengguna Premium.')
                    bob.sendMessage(q.replace(/[-|+| |]/gi, '') + `@s.whatsapp.net`, {text: `Hallo Kak, Nama kamu sudah\nTerdaftar Di Pengguna premium ya!\n\nSilahkan Konfirmasi dengan cara ketik .jo-done`})
                    }
                }*/
                case 'create-token':{
                if (!isCreator) throw mess.owner
                var tokrand = otpkode(5)
                var textnya2 = `*[ TOKEN PREMIUM ]*\n\nToken : *${tokrand}*\nExp : *PERMANENT*\n\nMasukan Token Ini\nDengan Cara Ketik\n${prefix}premtoken ${tokrand}\n\n*NOTE :* *_TOKEN INI HANYA BISA DIGUNAKAN SEKALI_*`
                token.push(tokrand)
                fs.writeFileSync('./assets/db/token.json', JSON.stringify(token))
                reply(textnya2)
                await sleep(1000)
                reply(`/premtoken ` + tokrand)
                }
                break
                case 'premtoken':{
                    if (isPremium) return reply(`Kamu Kan Sudah Menjadi Pengguna Premium 🤷‍♂️`)
                    if (!q) return reply(`Masukan Token nya!\nExample : ${CmD} T0K3N`)
                    if (isToken) {
                    prem2.push(quoted.sender)
                    fs.writeFileSync('./assets/db/prem2.json', JSON.stringify(prem2))
                    reply(`*[ PREM TOKEN ]*\n\nSukses!.\nKamu Telah Terdaftar Sebagai Pengguna Premium`)
                    await sleep(2000)
                    let hapustoken = token.indexOf(m.chat)
                    token.splice(hapustoken, 1)
                    fs.writeFileSync('./assets/db/token.json', JSON.stringify(token))
                    } else {
                        reply(`Token Tidak Aktif.`)
                    }
                }
                break
                        case 'cekprem': {
                            if (isPremium) return reply(`Kamu Telah Terdaftar Sebagai Pengguna PREMIUM.`)
                            reply(`Melihat Data Kamu 🔍`)
                            await sleep(5000)
                            reply(`Kamu Belum Terdaftar Sebagai Premium.\nSilahkan Beli Premium Ke Pemilik Bot Ini Ketik ${prefix}owner`)
                            }
                            break
                            case 'listprem': {
                                let txt = `*[ LIST PREMIUM/VIP ]*\nJumlah : ${prem2.length}\n\n`
                                let men = [];
                                for (let i of prem2) {
                                men.push(i)
                                txt += `*ID :* @${i.split("@")[0]}\n*Expire :* PERMANENT\n\n`
                                }
                                ngetag(txt, men, true)
                            }
                                break
                    case 'setpp': case 'setppbot':{
                    if (!isCreator) return reply(global.mess.owner)
                    if (!/image/.test(mime)) return reply( `Kirim/Reply Image Dengan Caption ${prefix + command}`)
                    if (/webp/.test(mime)) return reply( `Kirim/Reply Image Dengan Caption ${prefix + command}`)
                    let mediaa = await quoted.download()
                    var { img } = await pepe(mediaa)
                    await bob.query({
                    tag: 'iq',
                    attrs: {
                    to: botNumber,
                    type:'set',
                    xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                    tag: 'picture',
                    attrs: { type: 'image' },
                    content: img
                    }
                    ]
                    })
                    reply(`Done`)
                    }
                    break
                    
                    case 'setexif': case 'exif': {
                    if (!q) return reply(`Masukan Text!\nExample : ${CmD} StickerKu|Sticker Bersama`)
                    if (!isCreator) return reply(mess.owner)
                    var packname = q.split("|")[0]
                    var author = q.split("|")[1]
                    if (!packname) return reply(`Masukan Text Packname!`)
                    if (!author) return reply(`Masukan Text Author!`)
                    global.packname = packname
                    global.author = author
                    reply(`Sukses Mengganti!\nPackname : *${packname}*\nAuthor : *${author}*`)
                    }
                    break
                    case 'block': {
                        if (!isCreator) return reply(mess.owner)
                        if (!q && !isQuotedMsg) return reply(`Reply Atau Masukan Nomor Yang Mau Di Block`)
                        if (q) {
                            bob.updateBlockStatus(q + "@s.whatsapp.net", "block")
                            reply(`Sukses Block Beliau`)
                            } else if (isQuotedMsg) {
                                if (quoted.sender === global.owner + "@s.whatsapp.net") return reply(`Tidak bisa block Owner`)
                                bob.updateBlockStatus(quoted.sender, "block")
                                reply(`Sukses Block Beliau`)
                            }
                    }
                    break
                    
                    case 'unblock': {
                        if (!isCreator) return reply(global.mess.owner)
                        if (q) {
                            bob.updateBlockStatus(q + "@s.whatsapp.net", "unblock")
                            reply(`Sukses Buka Block Beliau`)
                        } else if (isQuotedMsg) {
                        if (quoted.sender === global.owner + "@s.whatsapp.net") return reply(`Tidak bisa block Owner`)
                        bob.updateBlockStatus(quoted.sender, "unblock")
                        reply(`Sukses Buka Block Beliau`)
                    }
                    }
                    break
                    case 'bc': {
                    if (!q) return reply(`Masukan Text\nExample ${CmD} Hallo Mas Bro`)
                    if (!isCreator) return reply(global.mess.owner)
                    for ( let i of store.chats.all()) {
                    setTimeout( () => {
                        var judule = `*[ JOJO BROADCAST ]*\n\n- _WAJIB BACA!_\n`
                        bob.sendMessage(i.id, {text: judule + q})
                    }, 1000) // 1000 = 1s,
                    }
                    }
                    break
                    case 'backup':{
                    if (!isCreator)
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/daftar.json'), fileName: `daftar.json`, mimetype: `json`})
                    await sleep(1000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/antilink.json'), fileName: `antilink.json`, mimetype: `json`})
                    await sleep(2000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/limit.json'), fileName: `limit.json`, mimetype: `json`})
                    await sleep(3000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/prem2.json'), fileName: `prem2.json`, mimetype: `json`})
                    await sleep(4000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/token.json'), fileName: `token.json`, mimetype: `json`})
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/commands.json'), fileName: `commands.json`, mimetype: `json`})
                    }
                    break
                    //Akhir owner menu
                    default:
                    if ( isChatBot ) {
                        if (m.text) {
                            console.log("->[\x1b[1;32mNew\x1b[1;37m]", color('Question From', 'yellow'), color(pushname, 'lightblue'), `: "${m.text}"`)
                            bob.sendPresenceUpdate("recording", m.chat);
                            try {
                                const response = await openai.createChatCompletion({
                                    model: "gpt-3.5-turbo",
                                    messages: [
                                        {role: "system", content: konten},
                                        {role: "user", content: m.text}
                                    ]
                                })
                                reply(response.data.choices[0].message.content)
                    } catch (e) {
                        reply("Kasih waktu dikit kek buat baca.")
                    } 
                }  
            }
            /*if (!m.isGroup) {
                if (m.text) {
                    bob.sendPresenceUpdate("composing", m.chat);
                    var link = await fetchJson(`https://simsimi.fun/api/v2/?mode=talk&lang=id&filter=true&message=${m.text}`)
                    reply(link.success)
                }
            }*/
            if (budy.startsWith('Jojo')) {
            try {
                    translate.translate(pushname, {to: `ja`}).then ( data => {
                        vitsUmamusumeVoiceSynthesizer(`どうした ${data.text}`, `草上飞 Grass Wonder (Umamusume Pretty Derby)`).then ( data2 => {
                            bob.sendMessage(m.chat, {audio: {url: data2.url}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                        })
                    })
            } catch (e) { 
                console.log(`:v`)
            }
        }
                if (budy.startsWith('x')) {
                    if (!isCreator) return reply(mess.owner)
                    
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return reply(bang)
                    }
                    try {
                        reply(util.format(eval(`(async () => { return ${budy.slice(2)} })()`)))
                    } catch (e) {
                        reply(String(e))
                    }
                }



                if (budy.startsWith('>')) {
                    if (!isCreator) return reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await reply(evaled)
                    } catch (err) {
                        await reply(String(err))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return reply(`${err}`)
                        if (stdout) return reply(stdout)
                    })
                }

        }


    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update ${__filename}`)
    delete require.cache[file]
    require(file)
})