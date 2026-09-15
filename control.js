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
const { getBaileys } = require('./lib/ourin')

const fs = require('fs')
const util = require('util')
const path = require('path')
const yts = require("yt-search");
const JoApi = require('@phaticusthiccy/open-apis')
const axios = require('axios')
const apiku = require('betabotz-tools')
const ytdl = require('ytdl-core')
const gugel = require('googlethis')
const tiktoku = require("@tobyg74/tiktok-api-dl")
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
const { addLogin, deleteLogin, checkLogin, addRegis, checkRegister } = require("./lib/login-reg.js")
const { upload } = require("./lib/uploads.js")
const ytdlp = require("./lib/ytdlp.js")
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
const { ChatSession, CompletionService } = require('langxlang')
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
const joDatabase = require('./lib/database')
const anon = require('./lib/anonymous')
const aiTagbot = require('./lib/ai-tagbot')
  const replicate = new Replicate({
  auth: "r8_IrWhmFuiXDTW4y0ZVXvBB6ODmH56ifn1mTjWa", //Api Gueh
});


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
    apiKey: `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`,
  });

const linkiyan = `https://api.yanzbotz.my.id`
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, otpkode, makeid, getRandom, getGroupAdmins } = require('./lib/function')
const { P } = require('pino')
const { decode } = require('punycode')
const { choices } = require('yargs')




/// DATABASE    
// NOTE: setting grup (welcome/left/antilink/mute/chatbot) sudah pindah ke database.json (joDatabase.getGroup)
let truth = JSON.parse(fs.readFileSync('./assets/db/truth.json'));
let dare = JSON.parse(fs.readFileSync('./assets/db/dare.json'));
let premium = JSON.parse(fs.readFileSync('./assets/db/premium.json'));
let commandsDB = JSON.parse(fs.readFileSync('./assets/db/commands.json'));
let loginulti = JSON.parse(fs.readFileSync('./assets/db/login.json'));
let regulti = JSON.parse(fs.readFileSync('./assets/db/register.json'));
let prem2 = JSON.parse(fs.readFileSync('./assets/db/prem2.json'));
let token = JSON.parse(fs.readFileSync('./assets/db/token.json'));
let limit = JSON.parse(fs.readFileSync('./assets/db/limit.json'));
let balance = JSON.parse(fs.readFileSync('./assets/db/balance.json'));
let glimit = JSON.parse(fs.readFileSync('./assets/db/glimit.json'));


module.exports = bob = async (bob, m, chatUpdate, store, welcome, mentioned) => {
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
    } = getBaileys()
    try {
        const body = ((m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == "interactiveResponseMessage") ? JSON.parse(m.message[m.mtype].nativeFlowResponseMessage?.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '') || ''
        const content = JSON.stringify(m.message)
        var budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%/^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶/∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "/" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const CmD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        // hanya user yang pakai command yang masuk database.json + sync JVault
        if (isCmd) { try { joDatabase.addUser(m.sender, pushname, m.chat) } catch {} }
        const botNumber = await bob.decodeJid(bob.user.id)
        // Normalisasi nomor pengirim agar tahan JID LID/device baru WA.
        // WA baru sering kirim JID @lid, jadi resolve dulu ke nomor HP asli.
        async function resolveSenderPN(jid) {
            try {
                let d = bob.decodeJid(jid || '')
                if (d && d.endsWith('@lid') && bob.signalRepository && bob.signalRepository.lidMapping && bob.signalRepository.lidMapping.getPNForLID) {
                    const pn = await bob.signalRepository.lidMapping.getPNForLID(d).catch(() => null)
                    if (pn) d = bob.decodeJid(pn)
                }
                return String(d || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
            } catch { return String(jid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '') }
        }
        // Kumpulkan semua kandidat JID (sender + participantPn bila ada),
        // cocokkan bila SALAH SATU resolve ke nomor owner/premium.
        const senderCandidates = [m.sender, m.participant, m.key && m.key.participant, m.key && m.key.participantPn, m.participantPn].filter(Boolean)
        const senderNums = []
        for (const cand of senderCandidates) {
            try {
                const n = await resolveSenderPN(cand)
                if (n && !senderNums.includes(n)) senderNums.push(n)
            } catch {}
        }
        const senderNum = senderNums[0] || ''
        const ownerNums = [botNumber, ...global.owner].map(v => String(v || '').replace(/[^0-9]/g, ''))
        const premNums = [botNumber, ...prem2].map(v => String(v || '').replace(/[^0-9]/g, ''))
        const isCreator = ownerNums.some(n => n && senderNums.includes(n))
        const isPremium = premNums.some(n => n && senderNums.includes(n))
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const tgl = moment.tz('Asia/Jakarta').format('DD/MM/YY')
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
        const isMedia = /image|video|sticker|audio/.test(mime)

        const chats = m.type === "conversation" && m.message.conversation ? m.message.conversation : m.type === "imageMessage" && m.message.imageMessage.caption ? m.message.imageMessage.caption : m.type === "videoMessage" && m.message.videoMessage.caption ? m.message.videoMessage.caption : m.type === "extendedTextMessage" && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : m.type === "buttonsResponseMessage" && quotedMsg.fromMe && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : 
        m.type === "templateButtonReplyMessage" && quotedMsg.fromMe && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : m.type === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId : m.type === "listResponseMessage" && quotedMsg.fromMe && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : "";
        const mentionByTag = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionUser = m.type == "extendedTextMessage" ? m.message.extendedTextMessage.contextInfo.mentionedJid || [] : [] 

        // Group
        const more = String.fromCharCode(8206)
        const readmore = more.repeat(4001)
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const groupMetadata = m.isGroup ? await bob.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : []

        // Kumpulkan semua kemungkinan identitas bot (JID, LID, device JID, nomor telepon)
        const botJid = (bob.user && bob.user.id) ? (await bob.decodeJid(bob.user.id) || bob.user.id) : botNumber
        const botLid = (bob.user && bob.user.lid) ? (await bob.decodeJid(bob.user.lid) || bob.user.lid) : ''
        const botNumClean = String(botJid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
        const botLidClean = String(botLid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')

        const botIdList = [
            botNumber,
            botJid,
            botLid,
            botNumClean,
            botLidClean,
            bob.user && bob.user.id,
            bob.user && bob.user.lid,
            String(bob.user && bob.user.id || '').split(':')[0],
            String(bob.user && bob.user.lid || '').split(':')[0],
            `${botNumClean}@s.whatsapp.net`,
            `${botLidClean}@lid`
        ].filter(Boolean)

        const isBotAdmins = m.isGroup ? botIdList.some(id => groupAdmins.includes(id)) : false
        const isBotGroupAdmins = isBotAdmins

        // Kumpulkan semua kemungkinan identitas pengirim (JID, LID, nomor telepon)
        const userIdList = [
            m.sender,
            sender,
            senderNum,
            `${senderNum}@s.whatsapp.net`,
            ...senderCandidates,
            ...senderNums,
            ...senderNums.map(n => `${n}@s.whatsapp.net`),
            ...senderNums.map(n => `${n}@lid`)
        ].filter(Boolean)

        const isGroupAdmins = m.isGroup ? (isCreator || userIdList.some(id => groupAdmins.includes(id))) : false
        // Setting grup dibaca dari database.json (per chat)
        const gset = joDatabase.getGroup(m.chat)
        const isAntiLink = m.isGroup ? !!gset.antilink : false
        const isToken = token.includes(q) || false
        const isMuted = m.isGroup ? !!gset.mute : false
        const isWelcome = m.isGroup ? !!gset.welcome : false
        const isLeft = m.isGroup ? !!gset.left : false
        const isChatBot = !!gset.chatbot




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

        // Anonymous Chat Relay (hanya di private chat & bukan command)
        if (!m.isGroup && !isCmd) {
            const anonSession = anon.getSession(sender)
            if (anonSession) {
                await anon.relayMessage(bob, m, sender, anonSession)
                return
            }
        }

        
        const konten = `Kamu adalah Jojo Bot, kamu merupakan sebuah Robot WhatsApp yang membantu semua user,
        Jam sekarang : ${jam},
        Tanggal sekarang : ${tgl},
        Nomor User adalah : ${sender.split("@")[0]},
        Nama User Adalah : ${pushname},
        Nomor Owner Bot : 0882-1477-2441,
        Harga Sewa Bot : 
        Price List Jojo :
        1 Minggu : -
        1 Bulan : Rp. 10.000
        Permanent : Rp. 20.000

        Pembayaran Melalui
        1. Spay : 0882-1329-2687
        2. Gopay : 0882-1329-2687
        3. Dana : 0882-1329-2687
        `

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

        const mediafiredl = async (url) => {
            const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
            const $ = cheerio.load(res.data);
            const link = $('#downloadButton').attr('href');
            const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
            const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
            const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
            let mime = '';
            let rese = await axios.head(link)
            mime = rese.headers['content-type']
            return { name ,size ,date ,mime ,link };
            }
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

         
          if (isMuted){
            if (!isGroupAdmins && !isCreator) return
            if (m.text.toLowerCase().startsWith(prefix+'unmute')){
                joDatabase.setGroup(m.chat, { mute: false })
                m.reply(`Bot telah diunmute di group ini, Dan yang bisa pakai hanyalah admin`)
            }
        }
        // Anti link
        if (m.isGroup && !isCreator && isAntiLink && !isGroupAdmins && isBotGroupAdmins){
            if (body.includes(`https://chat.whatsapp.com`)) {
                bob.sendMessage(m.chat, {text: `*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`})
                var number = m.sender
      bob.groupParticipantsUpdate(m.chat, [number], "remove")
            }
        }
        // Anti media (gambar/audio/video/document/voice note/sticker)
        // Hapus pesan media dari member biasa. Syarat: bot harus jadi admin.
        if (m.isGroup && !m.key.fromMe && !itsMe && !isCreator && !isGroupAdmins && isBotGroupAdmins) {
            try {
                const am = (gset && gset.antimedia) ? gset.antimedia : {}
                const isVN = isAudio && m.msg && (m.msg.ptt === true || m.msg.ptt === 'true')
                let violated = null
                if (isSticker && am.sticker) violated = 'sticker'
                else if (isImage && am.gambar) violated = 'gambar'
                else if (isVideo && am.video) violated = 'video'
                else if (isDocument && am.document) violated = 'dokumen'
                else if (isAudio && isVN && am.vn) violated = 'voice note'
                else if (isAudio && !isVN && am.audio) violated = 'audio'
                if (violated) {
                    await bob.sendMessage(m.chat, {
                        delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant || m.participant || m.sender }
                    }).catch(() => {})
                    await bob.sendMessage(m.chat, {
                        text: `*「 ANTI MEDIA 」*\n\n@${sender.split('@')[0]}, media *${violated}* tidak diizinkan di grup ini dan telah dihapus.`,
                        mentions: [sender]
                    }, { quoted: m }).catch(() => {})
                    return
                }
            } catch (e) { console.log('[antimedia]', e?.message || e) }
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
            reply(commandsDB[i].balasan)
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
// Auto-download TikTok via yt-dlp (youtube-dl-exec): user kirim link -> langsung diunduh & dikirim di chat yang sama
const ttMatch = String(m.text || "").match(/https?:\/\/(www\.|vt\.|vm\.|m\.)?tiktok\.com\/\S+/i)
if (ttMatch && !isCmd && !m.key.fromMe) {
    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return console.log(`Limit beliau sudah habis jir`)
    limitAdd(sender, limit)
    const ttUrl = ttMatch[0].replace(/[),.!?]+$/, "")
    let ttFile = null
    try {
        await bob.sendMessage(m.chat, { text: `⏳ _Mengunduh video TikTok..._` }, { quoted: m }).catch(() => {})
        const ttInfo = await ytdlp.getInfo(ttUrl)
        const ttDl = await ytdlp.downloadTikTok(ttUrl, ttInfo)
        ttFile = ttDl.file
        const ttCap = `🎬 *${ttInfo.title || "TikTok Video"}*\n👤 @${ttInfo.uploader || "-"}\n⏳ ${ytdlp.fmtDuration(ttInfo.duration)}`
        await bob.sendMessage(m.chat, { video: fs.readFileSync(ttDl.file), mimetype: "video/mp4", caption: ttCap }, { quoted: m })
    } catch (e) {
        console.log("[auto-tt]", e?.message || e)
        try {
            const data = await tiktoku.Downloader(ttUrl, { version: "v2" })
            if (data && data.result && data.result.video) {
                await bob.sendMessage(m.chat, { video: { url: data.result.video }, caption: `Sukses Mendownload Video TikTok.` }, { quoted: m })
            } else throw e
        } catch { reply(`Gagal mengunduh TikTok: ${e.message}`) }
    } finally { ytdlp.cleanup(ttFile) }
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
  
async function loading() {
    const { key } = await bob.sendMessage(m.chat, {text: '「▱▱▱▱▱▱▱▱▱▱」'}, { quoted: m });
         await delay(1000);
         await bob.sendMessage(m.chat, { text: '「▰▰▱▱▱▱▱▱▱▱」20%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▱▱▱▱」60%', edit: key})
         await bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」100%', edit: key})
        bob.sendMessage(m.chat, { text: '「▰▰▰▰▰▰▰▰▰▰」Success✓', edit: key})
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
// Menu otomatis: setiap case baru di bawah marker ===== MENU:X ===== langsung muncul di sini
const menuSections = require('./lib/menu').renderMenuSections(prefix)
const menuku = `${ucapanWaktu} ${pushname}

───────────────────
*⦿ Nama :* ${pushname}
*⦿ Tag :* @${sender.split('@')[0]}
*⦿ Status :* ${premi}
*⦿ Jam :* ${jam}
*⦿ Poin :* ${isPremium || isCreator ? 'Unlimited' : LimitKu}
*⦿ Tanggal :* ${tgl}
───────────────────
${readmore}

${menuSections}

`
var tekos = `╔══ 『 Fitur Tambahan  』\n`
for (let i = 0; i < commandsDB.length ; i ++){
tekos += `║- ${commandsDB[i].pesan}\n`
}

// ========== AI TAG BOT (tag @bot / reply jawaban AI) ==========
// Hook "before": jalan untuk setiap pesan sebelum switch command.
// Command (diawali prefix) tidak dibajak — tetap diproses switch di bawah.
try {
    if (await aiTagbot.handleTagbot({ m, bob, isCmd, botNumber })) return
} catch (e) { console.log('[ai-tagbot]', e?.message || e) }

// ========== ANONYMOUS CHAT helper ==========
// Sesi disimpan di ./assets/db/anonymous.json (bukan ./json/* agar konsisten).
const ANON_DB_PATH = './assets/db/anonymous.json'
function loadAnonDB() {
    try {
        if (!fs.existsSync(ANON_DB_PATH)) { fs.writeFileSync(ANON_DB_PATH, '{}'); return {} }
        return JSON.parse(fs.readFileSync(ANON_DB_PATH, 'utf8') || '{}')
    } catch { return {} }
}
function saveAnonDB(d) { try { fs.writeFileSync(ANON_DB_PATH, JSON.stringify(d, null, 2)) } catch {} }
function anonJid() { try { return m.sender.split('@')[0].split(':')[0] + '@s.whatsapp.net' } catch { return m.sender } }

// Relay: teruskan pesan ke partner yang sedang chatting (bukan command, bukan pesan bot sendiri, private only)
if (!m.isGroup && !isCmd && m.key && !m.key.fromMe) {
    try {
        const adb0 = loadAnonDB()
        const myJid0 = anonJid()
        const room0 = adb0[myJid0]
        if (room0 && room0.status === 'chatting') {
            const partner0 = room0.a === myJid0 ? room0.b : room0.a
            if (partner0 && adb0[partner0] && adb0[partner0].status === 'chatting') {
                if (m.text) await bob.sendMessage(partner0, { text: m.text })
                else { try { await m.copyNForward(partner0, true) } catch {} }
                return
            }
        }
    } catch {}
}

// ========== STICKER CMD helper ==========
// Normalisasi fileSha256 stiker (Buffer/Uint8Array/base64/hex) jadi kunci hex.
// Wajib dipakai di semua case setcmd/delcmd/lockcmd + trigger agar konsisten.
function stickerHashOf(val) {
    try {
        if (!val) return null
        if (Buffer.isBuffer(val)) return val.toString('hex')
        if (val instanceof Uint8Array) return Buffer.from(val).toString('hex')
        if (typeof val === 'string') {
            const s = val.trim()
            if (/^[0-9a-fA-F]{32,}$/.test(s)) return s.toLowerCase()
            return Buffer.from(s, 'base64').toString('hex')
        }
        if (Array.isArray(val)) return Buffer.from(val).toString('hex')
    } catch {}
    return null
}

// Auto-trigger: stiker yang hash-nya terdaftar di database.json → balas teks tersimpan
if (isSticker && m.msg && m.msg.fileSha256) {
    try {
        const sh = stickerHashOf(m.msg.fileSha256)
        if (sh) {
            const scdb = joDatabase.loadDB()
            const hit = scdb.sticker && scdb.sticker[sh]
            if (hit && hit.text) {
                await bob.sendMessage(m.chat, { text: hit.text, mentions: hit.mentionedJid || [] }, { quoted: m })
                return
            }
        }
    } catch {}
}

// Terima/tolak tawaran ikan (teks polos tanpa prefix ATAU tap tombol Terima/Tolak)
if (!isCmd && typeof body === 'string' && body.trim()) {
    try {
        const mancingLib = require('./lib/mancing')
        if (await mancingLib.handleSellResponse(bob, m, body)) return
    } catch {}
}

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
            
            // ===== MENU:Owner Menu =====
            case 'addplugins': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
            case 'owner1': {
                sendContact(m.chat, global.owner[0], 'Arasyaa [ OWNER SEWA ]')
               
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
            
            case 'menu': case 'help':  {
                var menunya = `╔═⧎ *${global.botName}* ⧎═\n║\n╠═⧎ Hallo *${pushname}*\n║\n╠═⧎ Aku Adalah *${global.botName}* \n║ Silahkan Pilih List Menu\n║ Untuk Melihat Daftar Menu.\n║\n╠═⧎ *Harap Login Terlebih*\n║ *Dahulu Sebelum Memulai Bot* \n║ *JOJO Untuk Mendapatkan* \n║ *Limit Dan Balance!*\n║\n╚═⧎ Thanks For Using ${global.botName}\n───────────────────\n\n「 *${tgl}* 」\n「 *${jam}* 」`
                var sections = [
                    {
                    title: "Buka Menu",
                    description: `Menampilkan List Menu`,
                    id: `${prefix}allmenu`
                },
                {
                    title: "Login",
                    description: `Login User`,
                    id: `${prefix}login`
                }
                ]
                var ownermenu = [
                {
                    title: "Arasya Owner Sewa",
                    description: `Owner Jojo Sewa`,
                    id: `${prefix}owner1`
                },
                ]
                var money = [
                    {
                        title: "Donate",
                        description: `Donasi Jojo`,
                        id: `${prefix}donasi`
                    },
                    {
                        title: "Sewa",
                        description: `Sewa Bot Jojo`,
                        id: `${prefix}sewa`
                    },
                    {
                        title: "Rules",
                        description: `Peraturan Sebelum Menggunakan Jojo`,
                        id: `${prefix}Rules`
                    },
                ]
                const unduh = {
                    title: "Click Here",
                    sections: [
                    {
                    title: "New Jojo",
                    highlight_label: `New Jo Reborn`,
                    rows: sections,
                    },
                    {
                    title: "Owner Bot",
                    rows: ownermenu,
                    },
                    {
                    title: "Buy",
                    rows: money,
                    },
                    ]
                }
                    
                bob.sendListButtonv2(m.chat, menunya, unduh, "> Join Grup Jojo\nhttps://chat.whatsapp.com/Famd1qzPzScBX4TSual41k", {quoted: fake})
            }
            break
            case 'allmenu': {
               /* bob.sendMessage(m.chat, {text: menuku, mentions: [sender], contextInfo: {
                    externalAdReply: {
                        title: `Hello ${pushname}`,
                        body: `-`,
                        sourceUrl: "https://chat.whatsapp.com/Famd1qzPzScBX4TSual41k",
                        showAdAttribution: true,
                        mediaType: 1
                    }
                }}, {quoted: m})*/
                var link = fs.readFileSync(`./media/new-jobot.png`)
                bob.sendMessage(m.chat, {image: link, caption: menuku, mentions: [sender]}, {quoted: m})
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
                case 'button':{
                    var btn =  [
                        {
                            "name": "single_select",
                            "buttonParamsJson": "{\"title\":\"title\",\"sections\":[{\"title\":\"title\",\"highlight_label\":\"label\",\"rows\":[{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\"id\"},{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\"id\"}]}]}"
                          },
                          {
                            "name": "quick_reply",
                            "buttonParamsJson": "{\"display_text\":\"quick_reply\",\"id\":\"message\"}"
                          },
                          {
                             "name": "cta_url",
                             "buttonParamsJson": "{\"display_text\":\"url\",\"url\":\"https://www.google.com\",\"merchant_url\":\"https://www.google.com\"}"
                          },
                          {
                             "name": "cta_call",
                             "buttonParamsJson": "{\"display_text\":\"call\",\"id\":\"message\"}"
                          },
                          {
                             "name": "cta_copy",
                             "buttonParamsJson": "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\"message\"}"
                          },
                          {
                             "name": "cta_reminder",
                             "buttonParamsJson": "{\"display_text\":\"cta_reminder\",\"id\":\"message\"}"
                          },
                          {
                             "name": "cta_cancel_reminder",
                             "buttonParamsJson": "{\"display_text\":\"cta_cancel_reminder\",\"id\":\"message\"}"
                          },
                          {
                             "name": "address_message",
                             "buttonParamsJson": "{\"display_text\":\"address_message\",\"id\":\"message\"}"
                          },
                          {
                             "name": "send_location",
                             "buttonParamsJson": ""
                          }
            
                    ]
                    bob.sendButton(m.chat, `P`,'@arsrfii','> Quotes',btn)
                }
                break
                /*
                case 'btn':{
                    var sections = [
                        {
                        title: "list",
                        description: `Test`,
                        id: `.menu`
                    },
                    {
                        title: "list",
                        description: `Test`,
                        id: `.menu`
                    },
                    ]
                    const unduh = {
                        title: "Click Here",
                        sections: [
                        {
                        title: "Semua Fiture",
                        highlight_label: `Promo 2%`,
                        rows: sections,
                        },
                        ]
                    }
                        
                    bob.sendListButtonv2(m.chat, `testi`, unduh, "anu", {quoted: m})
                }
                break*/
                    case 'qr':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (!q) throw (`Silahkan Masukan Text\nExample : ${CmD} Mine`)
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://api.qrserver.com/v1/create-qr-code/?size=790x790&data=${q}`}}, {quoted: m})
                    }
                    break
                    

                    break
                    // Game
                    // ===== MENU:Game Menu =====
                    case 'dadu': case 'dice': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        reply(mess.wait)
                        try {
                            const angka = Math.floor(Math.random() * 6) + 1
                            const diceUrl = `https://www.random.org/dice/dice${angka}.png`
                            await bob.sendImageAsSticker(m.chat, diceUrl, m, { packname: global.packname, author: global.author })
                            reply(`🎲 Dadu berhenti di angka *${angka}*`)
                        } catch (e) {
                            console.log(e)
                            reply('Gagal mengocok dadu, coba lagi nanti.')
                        }
                    }
                    break
                    // ===== FISHING GAME (database.json) =====
                    case 'mancing': case 'fishing': case 'fish': {
                        await require('./lib/mancing').cmdMancing(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'inventory': case 'inv': case 'kantong': case 'tas': {
                        await require('./lib/mancing').cmdInventory(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'buyumpan': case 'buybait': case 'beliumpan': {
                        await require('./lib/mancing').cmdBuyumpan(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'buangumpan': case 'dropbait': {
                        await require('./lib/mancing').cmdBuangumpan(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'pindah': case 'pindahlokasi': case 'goto': case 'pergi': {
                        await require('./lib/mancing').cmdPindah(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'jualikan': case 'sellfish': case 'jual': {
                        await require('./lib/mancing').cmdJualikan(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'rodinfo': case 'pancingan': case 'cekpancing': case 'rod': {
                        await require('./lib/mancing').cmdRodinfo(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'repairing': case 'repair': case 'perbaiki': case 'fixrod': {
                        await require('./lib/mancing').cmdRepairing(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'statmancing': case 'fishstats': case 'statpancing': {
                        await require('./lib/mancing').cmdStatmancing(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'daftarikan': case 'listfish': case 'ikanlist': {
                        await require('./lib/mancing').cmdDaftarikan(bob, m, { prefix, q, args, sender, pushname, reply })
                    }
                    break
                    case 'tebakgambar': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    // ===== MENU:Other Menu =====
                    case 'removebg': case 'rb':{
                    if (!isPremium) return reply(`Fitur Ini Hanya Di Gunakan Oleh Pengguna Premium`)
                    if (!isQuotedImage && !isImage) return reply(`Kirim Gambar dengan caption ${prefix}removebg atau reply gambar dengan text ${prefix}removebg!`)
                    reply(global.mess.wait)
                    try {
                        const { uploadFile } = require('./lib/tourl')
                        let qq = (m.quoted && ((m.quoted.msg || m.quoted).mimetype)) ? m.quoted : m
                        let buffer = qq.download ? await qq.download() : await bob.downloadMediaMessage(qq.msg || qq)
                        if (!buffer || !buffer.length) return reply('Gagal download gambar.')
                        const { link } = await uploadFile(buffer, 'jpg')
                        const r = await axios.get('https://api-faa.my.id/faa/removebg', { params: { url: link }, timeout: 90000, validateStatus: () => true })
                        if (r.status !== 200 || !r.data.status || !r.data.url) throw new Error('API gagal memproses gambar.')
                        await bob.sendMessage(m.chat, { image: { url: r.data.url }, caption: `✅ Background terhapus!\nHasil: ${r.data.url}` }, { quoted: m })
                    } catch (e) {
                        console.error('REMOVEBG ERROR:', e.message || e)
                        reply('❌ Gagal hapus background.\n' + (e.message || e))
                    }
                    }
                    break
                    case 'tomp3': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Masukan Nama\nExample : ${CmD} ${pushname}`)
                    var link = `https://api.memegen.link/images/custom/Bajingan_Lu/${q}.png?background=https://telegra.ph/file/d608ec3cb57ff6b9ac708.jpg`
                    bob.sendImageAsSticker(m.chat, link, m, { packname: global.packname, author: global.author })
                    }
                    break
                    case 'sholat':
                        case 'sholatku':
                            case 'jadwalsholat': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (!isQuotedMsg) return reply(`Reply Pesan.`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        translate.translate(quoted.text, {to: `id`}).then ( data => {
                            bob.sendMessage(m.chat, {text: data.text}, {quoted: m})
                        })
                    }
                    break
                    case 'quotes': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        var kotes2 = JSON.parse(fs.readFileSync('./assets/quotes.json'))
                        var hasil = pickRandom(kotes2)
                        var img = fs.readFileSync('./media/icon.png')
                        console.log(img)
                        var btn =  [
                            {
                             "name": "quick_reply",
                             "buttonParamsJson": "{\"display_text\":\"Berikan Lagi\",\"id\":\"#quotes\"}"
                           }
                        ]
                        bob.sendButton(m.chat, hasil.quotes + `\n\n` + `~ ${hasil.author}`,'@arsrfii','> Quotes',btn)
                    }
                    break
                    case 'tts': case 'sbot' :{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!args.length === "12") return reply(`Text Terlalu Panjang`)
                        config(tiktokresi);
                        createAudioFromText(q, 'media/myAudio', 'id_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`media/myAudio.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: m})
                    }
                    break
                    case 'on':{
                    if (!isPremium && !isCreator)
                    fakereply(`Sukses.\nBot Telah Menyala Dan Sudah Terverifikasi.`)
                    }
                    break
                    case 'vn':{
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        config(tiktokresi);
                        createAudioFromText(q, 'songb', 'id_001')
                        await sleep(3000)
                        bob.sendMessage(m.chat, {audio: fs.readFileSync(`songb.mp3`), mimetype: 'audio/mp4'}, {quoted: m})
                    }
                    break
                    case 'menfess': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                        if (!q) return reply(`Masukan Text!\nExample : ${prefix}menfess no|pesan`)
                        var number = q.split('|')[0] ? q.split('|')[0] : q
                        var textnyaku = q.split('|')[1] ? q.split('|')[1] : ''
                        if (number.startsWith('08')) return reply(`Awali Dengan 62! bukan 08\nContoh : ${sender.split("@")[0]}`)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var ppcpnya =  await fetchJson(`https://raw.githubusercontent.com/VamsesOfficial/database2/master/image/ppcp.js`)
                    var randomppcp = pickRandom(ppcpnya)
                    bob.sendMessage(m.chat, {image: {url: randomppcp.cowo}, caption: `Cowo`})
                    bob.sendMessage(m.chat, {image: {url: randomppcp.cewe}, caption: `Cewe`})
                    }
                    break
                    case 'addsticker': {
                        if (!isQuotedSticker ) return reply('Reply Imagenya!')
                        if (isQuotedSticker || isSticker ) {
                            var mediaku = await downloadAndSaveMediaMessage("sticker", "media/menu.webp")
                            }
                    }
                    break
                    case 'pinterest': case 'pin': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                var linkjs = await fetchJson(`https://api.waifu.pics/sfw/waifu`)
                    reply(`Mencari Waifu Kamu... 🔍`)
                    bob.sendMessage(m.chat, {image: {url: linkjs.url}}, {quoted: m})
                    }
                    break
                    /*
                    case 'esrgan': case 'remini': case 'tohd': case 'bagusin':{
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
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
                    break*/
                    case 'remini': case 'tohd':{
                    // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${CmD} atau Reply Gambar dengan text ${CmD}`)
                    reply(mess.wait)
                    try {
                    if (isImage || isQuotedImage) {
                        var kdm = otpkode(5)
                        var donglot = await downloadAndSaveMediaMessage("image", kdm + ".jpg")
                        var tot = await upload(fs.readFileSync(kdm + '.jpg'))
                        apiku.remini(tot).then ( data => {
                            bob.sendMessage(m.chat, {image: {url : data.image_data}, caption: `Sukses.\nSize : ${data.image_size}`})
                        })
                        await fs.unlinkSync(kdm + ".jpg")
                    }} catch (error) {
                        reply(`Gagal Upload Gambar`)
                    }
                    }
                    break
  
                    case 'ssweb': case 'ss': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Masukan Text!\nExample ${CmD} https://youtube.com`)
                    if (q.includes('xnxx') && q.includes('pornhub')) return reply("Bokep Mulu Pikiran nya")
                    reply(global.mess.wait)
                    bob.sendMessage(m.chat, {caption: q, image: {url: `https://image.thum.io/get/width/1900/crop/1000/fullpage/` + q}})
                    }
                    break
                    case 'google': case 'ggl':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    gugel.search(q).then ( data => {
                        var gugelnya = `*[ GOOGLE ]*\n\nSearch : *${q}*\n\nJudul : *${data.results[1].title}*\n\nDeskripsi :\n` + monospace(`${data.results[1].description}`) + `\n\nLink : _${data.results[0].url}_`
                        reply(gugelnya)
                    })
                    }
                    break
                    case 'stiksearch': case 'searchstik':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var linkstik = stickersearch(q)
                    stickersearch(q).then ( data => {
                    var asu = pickRandom(data.sticker_url)
                    bob.sendImageAsSticker(m.chat, asu, m, { packname: global.packname, author: global.author })
                    }).catch( err => reply(`Sticker Nya Gada.`))}
                    break
                    case 'liputanku': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                var title = q.split("@")[0]
                    var link = q.split("@")[1]
                    var desk = q.split("@")[2]
                    var label = q.split("@")[3]
                    var textnyah = `*NEWS BY JO*\n\n` + monospace(`Baca Berita Hari Ini, Untuk Menginformasi Dan Mengupdate Seluruh Berita Indonesia Maupun Diluar Negara.\n\n`) + `ツ *Title :* ${title}\nツ *Link :* ${link}\nツ *Deskripsi :* ${desk}\nツ *Label :* ${label}\n`
                    sendbut(m.chat, textnyah, `/menu`, `Back To Menu 🔙`, tgl + ' ' + jam)
                    }
                    break
                    case 'addstik': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    case 'tourl': case 'tolink': {
                // Upload media -> URL publik (Catbox permanen -> fallback Uguu)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    try {
                        const { uploadFile } = require('./lib/tourl')
                        let qq = (m.quoted && ((m.quoted.msg || m.quoted).mimetype)) ? m.quoted : m
                        let mmime = ((qq.msg || qq).mimetype) || ''
                        if (!mmime) return reply(`Reply / kirim media (gambar/video/audio/dokumen) dengan caption ${prefix}tourl`)
                        reply(global.mess.wait)
                        let buffer
                        if (qq.download) {
                            buffer = await qq.download()
                        } else {
                            buffer = await bob.downloadMediaMessage(qq.msg || qq)
                        }
                        if (!buffer || !buffer.length) return reply('Gagal download media.')
                        let ext = (mmime.split('/')[1] || 'bin').split(';')[0]
                        if (ext === 'jpeg') ext = 'jpg'
                        const { link, host } = await uploadFile(buffer, ext)
                        await bob.sendMessage(m.chat, { text: `🔗 *LINK HASIL UPLOAD*\n📦 ${mmime} (${(buffer.length / 1024).toFixed(1)} KB)\n🌐 Host: ${host}\n\n${link}` }, { quoted: m })
                    } catch (e) {
                        console.error('TOURL ERROR:', e)
                        reply('❌ Gagal upload ke server.\n' + (e.message || e))
                    }
                    }
                    break

                    case 'stcmeme': case 'smeme': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    case 'register': {
                        // New system: daftar via website https://bot.acamedia.xyz
                        if (checkLogin(sender, loginulti)) return reply(`✅ Kamu sudah login, tidak perlu register lagi.`)
                        const phone = sender.split('@')[0]
                        const webUrl = `${global.registWebsite || global.botWebsite}?phone=${phone}&name=${encodeURIComponent(pushname)}&ref=jojo`
                        const btn = [
                            { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "🌐 Daftar di Website", url: webUrl, merchant_url: global.botWebsite }) },
                            { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "✅ Sudah Daftar", id: `${prefix}login` }) },
                            { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ℹ️ Cara Daftar", id: `${prefix}rules` }) }
                        ]
                        // fallback manual tetap didukung: #register username|password
                        if (q && q.includes('|')) {
                            var username = q.split('|')[0].trim()
                            var password = q.split('|')[1].trim()
                            if (username && password) {
                                if (checkRegister(username, regulti)) return reply(`❌ Username *${username}* sudah ada, coba username lain.`)
                                var kodeunik = `LGN${otpkode(6)}JO`
                                addRegis(username, password, sender, kodeunik, regulti)
                                try { joDatabase.addUser(sender, pushname, m.chat) } catch {}
                                return bob.sendButton(m.chat, `*[ DAFTAR MANUAL BERHASIL ]*\n\nUsername: ${username}\nPassword: ${password}\nNomor: ${phone}\nKode: ${kodeunik}\n\nAtau kamu juga bisa daftar via website agar terverifikasi:`, '> JojoBot', 'REGISTER MANUAL', [
                                    { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "🌐 Buka Website", url: webUrl }) },
                                    { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "🔐 Login", id: `${prefix}login` }) }
                                ])
                            }
                        }
                        await bob.sendButton(m.chat,
                            `*📌 REGISTER JOJO BOT*\n\nHalo *${pushname}* 👋\nNomor: wa.me/${phone}\n\nCara daftar:\n1. Klik tombol *Daftar di Website* di bawah\n2. Isi data di *${global.botWebsite}*\n3. Kembali ke sini & klik *Sudah Daftar* atau ketik *${prefix}login*\n\n_Tips: Kamu otomatis tercatat di database.json, tapi verifikasi via website akan mengaktifkan fitur premium._`,
                            `> JojoBot • ${global.botWebsite}`,
                            'DAFTAR SEKARANG', btn)
                    }
                    break
                    case 'reg-on': {
                        // Auto register -> arahkan ke website (tetap buat akun lokal untuk kompatibilitas)
                        if (checkLogin(sender, loginulti)) return reply(`✅ Kamu sudah login.`)
                        var username = (q.split('|')[0] || pushname).trim()
                        var password = (q.split('|')[1] || `REG${otpkode(6)}JO`).trim()
                        var kodeunik = `LGN${otpkode(6)}JO`
                        if (checkRegister(username, regulti)) username = pushname + otpkode(3)
                        addRegis(username, password, sender, kodeunik, regulti)
                        try { joDatabase.addUser(sender, pushname, m.chat) } catch {}
                        const phone2 = sender.split('@')[0]
                        const webUrl2 = `${global.botWebsite}?phone=${phone2}&name=${encodeURIComponent(pushname)}&auto=1`
                        var btn2 = [
                            { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "🌐 Verifikasi di Website", url: webUrl2 }) },
                            { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "🔐 Login", id: `${prefix}login` }) }
                        ]
                        await bob.sendButton(m.chat, `*[ AUTO REGISTER BERHASIL ]*\n\nUsername: ${username}\nPassword: ${password}\nNomor: ${phone2}\nKode: ${kodeunik}\n\nAkun lokal dibuat. Untuk aktivasi penuh, verifikasi di website juga ya!`, '> JojoBot', `Hai ${pushname}`, btn2)
                    }
                    break
                    case 'login': {
                        const phoneL = sender.split('@')[0]
                        const webUrlL = `${global.botWebsite}?phone=${phoneL}&name=${encodeURIComponent(pushname)}`
                        // cek sudah login
                        if (checkLogin(sender, loginulti)) {
                            var btnL1 = [
                                { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "🌐 Buka Dashboard", url: global.botWebsite }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "📋 Menu", id: `${prefix}menu` }) }
                            ]
                            return bob.sendButton(m.chat, `✅ *Kamu sudah login!*\nNomor: ${phoneL}\nSelamat datang kembali *${pushname}* 🎉`, '> JojoBot', 'LOGIN AKTIF', btnL1)
                        }
                        // cek apakah pernah chat / terdaftar di database.json atau register.json atau JVault
                        const dbLocal = joDatabase.loadDB()
                        const isInLocal = !!dbLocal.users[sender]
                        const isInReg = checkLogin(sender, regulti) || checkRegister(pushname, regulti) || isInLocal
                        let isInVault = false
                        try {
                            const remote = await require('./lib/jvault').fetchBin().catch(()=>null)
                            if (remote && remote.users && remote.users[sender]) isInVault = true
                        } catch {}
                        if (!isInReg && !isInVault) {
                            var btnNeedReg = [
                                { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "📝 Daftar di Website", url: webUrlL }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "🔄 Coba Lagi", id: `${prefix}login` }) }
                            ]
                            return bob.sendButton(m.chat, `*❌ BELUM TERDAFTAR*\n\nHalo *${pushname}*, nomor *${phoneL}* belum terdaftar.\n\nSilakan daftar dulu via website resmi agar data kamu masuk ke database pusat.`, '> JojoBot', 'REGISTER DULU', btnNeedReg)
                        }
                        // proses login
                        addLogin(`true`, `true`, sender, `true`, loginulti)
                        try { joDatabase.addUser(sender, pushname, m.chat) } catch {}
                        const { key } = await bob.sendMessage(m.chat, {text: '🔍 Memverifikasi data...'}, { quoted: m });
                        await delay(1200);
                        await bob.sendMessage(m.chat, { text: `✅ *[ LOGIN BERHASIL ]*\nSelamat datang *${pushname}*!\nNomor: ${phoneL}\nKamu sekarang bisa pakai semua fitur JojoBot.`, edit: key })
                        await sleep(600)
                        var btnDone = [
                            { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "📋 Menu", id: `${prefix}menu` }) },
                            { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "🌐 Dashboard", url: global.botWebsite }) }
                        ]
                        await bob.sendButton(m.chat, `Mau kemana selanjutnya, *${pushname}*?`, '> JojoBot', 'LOGIN SUKSES', btnDone)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    var link = JSON.parse(fs.readFileSync(`./assets/darkjokes.json`))
                    var randomeme = pickRandom(link)
                    bob.sendMessage(m.chat, {image: {url: randomeme.result}}, {quoted: m})
                    }
                    break
                    case 'emojimix':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    // ===== MENU:Poin Menu =====
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
                    case 'poin': case 'limit': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                var limitPrib = `${getLimit(m.sender, limitCount, limit)}/${limitCount}`
                  //  reply(`Limit : ${limitPrib}\nBalance : $${getBalance(m.sender, balance)}\n\nKamu dapat membeli poin dengan cara ketik ${prefix}buypoin`)
                    var textbro = 
`✨ *𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗦𝗜 𝗣𝗢𝗜𝗡 ✨

💰 Poin Ku : ${isPremium || isCreator ? '*Unlimited*' : limitPrib}\n\n` + monospace(`POIN Akan Di Reset Setiap Harinya!\nCapai Top 1 Pengguna JOJO BOT!.\nKetik #top Untuk Melihat Saingan Kamu!`)
                    reply(textbro)
                    }
                    break
                    case 'top':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    fs.writeFileSync('./assets/db/login.json', JSON.stringify(limitkosong))
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
                    // ===== MENU:Group Menu =====
                    case 'setppgc': case 'setppgrup':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                    case 'welcome': case 'left': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        const currentWelcome = !!gset.welcome
                        const currentLeft = !!gset.left

                        if (q.toLowerCase() === "on") {
                            joDatabase.setGroup(m.chat, { welcome: true, left: true })
                            reply(`Sukses mengaktifkan fitur Welcome & Left di grup ini ✅`)
                        } else if (q.toLowerCase() === "off") {
                            joDatabase.setGroup(m.chat, { welcome: false, left: false })
                            reply(`Sukses menonaktifkan fitur Welcome & Left di grup ini ❌`)
                        } else {
                            const statusText = `*PENGATURAN WELCOME & LEFT*\n\nStatus saat ini:\n• Welcome Card : *${currentWelcome ? 'ON ✅' : 'OFF ❌'}*\n• Left/Goodbye : *${currentLeft ? 'ON ✅' : 'OFF ❌'}*\n\nSilakan pilih opsi tombol di bawah untuk mengaktifkan atau menonaktifkan fitur ini:`
                            const btnWelcome = [
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ON ✅", id: `${prefix}welcome on` }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "OFF ❌", id: `${prefix}welcome off` }) }
                            ]
                            let sent = false
                            try {
                                if (bob.sendButton) {
                                    await bob.sendButton(m.chat, statusText, '> JojoBot', 'WELCOME & LEFT', btnWelcome)
                                    sent = true
                                }
                            } catch (e) {}
                            if (!sent) {
                                try {
                                    if (bob.sendButtonText) {
                                        const buttons = [
                                            { buttonId: `${prefix}welcome on`, buttonText: { displayText: 'ON ✅' }, type: 1 },
                                            { buttonId: `${prefix}welcome off`, buttonText: { displayText: 'OFF ❌' }, type: 1 }
                                        ]
                                        await bob.sendButtonText(m.chat, buttons, statusText, '> JojoBot', m)
                                        sent = true
                                    }
                                } catch (e) {}
                            }
                            if (!sent) {
                                reply(`${statusText}\n\n• Ketik *${prefix}welcome on* untuk aktifkan\n• Ketik *${prefix}welcome off* untuk nonaktifkan`)
                            }
                        }
                    }
                    break
                    case 'setwelcome': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (!q) {
                            return reply(`*PENGATURAN TEKS CUSTOM WELCOME*\n\nGunakan command ini untuk mengatur pesan selamat datang.\n\n*Contoh:*\n${prefix}setwelcome Halo @user, selamat datang di grup @group!\nDeskripsi: @desc\nTanggal: @date (@time)\nJumlah member: @member\n\n*Placeholder yang didukung:*\n• @user : Mention nomor peserta (@628...)\n• @name : Nama asli peserta\n• @group : Nama grup\n• @desc : Deskripsi grup\n• @date : Tanggal hari ini\n• @time : Waktu sekarang (WIB)\n• @member : Jumlah total member\n\n_Ketik *${prefix}setwelcome reset* untuk mengembalikan pesan ke default._`)
                        }
                        if (q.toLowerCase() === 'reset') {
                            joDatabase.setGroup(m.chat, { welcomeText: '' })
                            reply('Sukses mengembalikan pesan welcome ke default.')
                        } else {
                            joDatabase.setGroup(m.chat, { welcomeText: q })
                            reply(`Sukses mengatur pesan custom welcome! ✅\n\n*Template Tersimpan:*\n${q}`)
                        }
                    }
                    break
                    case 'setleft': case 'setgoodbye': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (!q) {
                            return reply(`*PENGATURAN TEKS CUSTOM GOODBYE/LEFT*\n\nGunakan command ini untuk mengatur pesan perpisahan.\n\n*Contoh:*\n${prefix}setleft Selamat tinggal @user, terima kasih sudah menjadi bagian dari @group!\n\n*Placeholder yang didukung:*\n• @user : Mention nomor peserta (@628...)\n• @name : Nama asli peserta\n• @group : Nama grup\n• @desc : Deskripsi grup\n• @date : Tanggal hari ini\n• @time : Waktu sekarang (WIB)\n• @member : Jumlah total member\n\n_Ketik *${prefix}setleft reset* untuk mengembalikan pesan ke default._`)
                        }
                        if (q.toLowerCase() === 'reset') {
                            joDatabase.setGroup(m.chat, { leftText: '' })
                            reply('Sukses mengembalikan pesan left ke default.')
                        } else {
                            joDatabase.setGroup(m.chat, { leftText: q })
                            reply(`Sukses mengatur pesan custom left/goodbye! ✅\n\n*Template Tersimpan:*\n${q}`)
                        }
                    }
                    break
                    case 'antidelete': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        const isAntiDelete = !!gset.antidelete
                        if (q.toLowerCase() === "on") {
                            joDatabase.setGroup(m.chat, { antidelete: true })
                            reply(`Sukses mengaktifkan fitur Anti-Delete di grup ini ✅`)
                        } else if (q.toLowerCase() === "off") {
                            joDatabase.setGroup(m.chat, { antidelete: false })
                            reply(`Sukses menonaktifkan fitur Anti-Delete di grup ini ❌`)
                        } else {
                            const statusText = `*FITUR ANTI-DELETE*\n\nStatus saat ini: *${isAntiDelete ? 'ON ✅' : 'OFF ❌'}*\n\nKetika aktif, pesan yang dihapus oleh member akan otomatis dikirimkan kembali ke grup oleh bot.\n\nSilakan pilih tombol di bawah:`
                            const btnAD = [
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ON ✅", id: `${prefix}antidelete on` }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "OFF ❌", id: `${prefix}antidelete off` }) }
                            ]
                            let sent = false
                            try {
                                if (bob.sendButton) {
                                    await bob.sendButton(m.chat, statusText, '> JojoBot', 'ANTI-DELETE', btnAD)
                                    sent = true
                                }
                            } catch (e) {}
                            if (!sent) {
                                try {
                                    if (bob.sendButtonText) {
                                        const buttons = [
                                            { buttonId: `${prefix}antidelete on`, buttonText: { displayText: 'ON ✅' }, type: 1 },
                                            { buttonId: `${prefix}antidelete off`, buttonText: { displayText: 'OFF ❌' }, type: 1 }
                                        ]
                                        await bob.sendButtonText(m.chat, buttons, statusText, '> JojoBot', m)
                                        sent = true
                                    }
                                } catch (e) {}
                            }
                            if (!sent) {
                                reply(`${statusText}\n\n• Ketik *${prefix}antidelete on* untuk aktifkan\n• Ketik *${prefix}antidelete off* untuk nonaktifkan`)
                            }
                        }
                    }
                    break
                    // ========== ANONYMOUS CHAT ==========
                    case 'start': {
                        if (m.isGroup) return
                        return anon.startChat(bob, m, sender, reply)
                    }
                    case 'leave': {
                        if (m.isGroup) return
                        return anon.leaveChat(bob, m, sender, reply)
                    }
                    case 'next': {
                        if (m.isGroup) return
                        return anon.nextChat(bob, m, sender, reply)
                    }
                    case 'stop': {
                        if (m.isGroup) return
                        return anon.leaveChat(bob, m, sender, reply)
                    }

                    case 'ai':{
                        // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                        if (!q) return reply(`Apa Yang Mau Di Ulas?\nExample : ${CmD} Kamu bisa apa?`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        limitAdd(sender, limit)
                        try {
                        const service = new CompletionService({gemini: [`AIzaSyD9aD12un3L9CVK49fhC4JkkrlNGZgQ6vQ`] })
                        const [response] = await service.requestCompletion(
                            'gemini-1.0-pro', '', q
                        )
                        reply(response.text)
                        } catch(e) {
                        reply(`Layanan AI sedang gangguan, coba lagi nanti.`)
                        }
                    }
                    break
                    case 'editimg': {
                        const editimg = require('./lib/ai-editimg')
                        // 1. Validasi cepat DULU (tidak makan slot/kuota kalau input salah)
                        const eq = (m.quoted && m.quoted.mimetype) ? m.quoted : m
                        const emime = ((eq.msg || eq).mimetype) || ''
                        let prompt = (q || '').trim() || 'Edit karakter ini jadi tersenyum'
                        const isMedia = /image/.test(emime)
                        let urlFromText = null
                        if (!isMedia) {
                            const urlMatch = (q || '').match(/https?:\/\/\S+/)
                            if (urlMatch) {
                                urlFromText = urlMatch[0]
                                prompt = q.replace(urlFromText, '').trim() || prompt
                            }
                        }
                        if (!isMedia && !urlFromText) return reply(`Kirim / reply foto yang mau diedit dengan caption:\n${prefix}editimg <prompt>\n\nContoh:\n${prefix}editimg Edit karakter ini jadi tersenyum`)
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                        // 2. Cek kuota editimg (owner = unlimited)
                        const cek = editimg.peekQuota(m.sender, isCreator)
                        if (!cek.ok) return reply(`🚫 *JATAH HABIS!*\neditimg hanya bisa dipakai *${editimg.BATAS_PAKAI}x dalam 6 jam*.\nJatahmu pulih dalam *${editimg.sisaWaktu(cek.resetMs)}*.\nSisa jatah: *0/${editimg.BATAS_PAKAI}*`)
                        // 3. Ambil slot giliran chat ini
                        const slot = editimg.ambilSlot(m.chat)
                        if (!slot) return reply(`⏳ *ANTRIAN PENUH!*\nSedang ada render berjalan + ${editimg.MAKS_ANTRI} orang menunggu di chat ini.\nTunggu sebentar lalu coba lagi ya.`)
                        if (slot.position > 1) await reply(`⏳ Kamu antrian *#${slot.position}* di chat ini, tunggu giliranmu ya...`)
                        await slot.prev // <-- tunggu giliran
                        // 4. Potong kuota atomik saat giliran tiba
                        const take = editimg.consumeQuota(m.sender, isCreator)
                        if (!take.ok) {
                            slot.release()
                            return reply(`🚫 *JATAH HABIS!*\neditimg hanya bisa dipakai *${editimg.BATAS_PAKAI}x dalam 6 jam*.\nJatahmu pulih dalam *${editimg.sisaWaktu(take.resetMs)}*.`)
                        }
                        limitAdd(sender, limit)
                        try {
                            let imageUrl = urlFromText
                            if (isMedia) {
                                const tmp = `editimg_${Date.now()}.jpg`
                                await downloadAndSaveMediaMessage('image', tmp)
                                const buf = fs.readFileSync(tmp)
                                try { fs.unlinkSync(tmp) } catch {}
                                // upload via catbox (telegra.ph sedang error 400)
                                const { uploadFile } = require('./lib/tourl')
                                const up = await uploadFile(buf, 'jpg')
                                imageUrl = up.link
                                if (!imageUrl || !/^https?:\/\//.test(imageUrl)) throw 'Gagal upload gambar!'
                            }
                            await reply('Tunggu sebentar, sedang mengedit foto...')
                            const promptEnc = encodeURIComponent(prompt)
                            const urlEnc = encodeURIComponent(imageUrl)
                            let res = await axios.get(`https://api-faa.my.id/faa/editfoto?url=${urlEnc}&prompt=${promptEnc}`, { responseType: 'arraybuffer', timeout: 150000, validateStatus: () => true })
                            if (res.status !== 200 || !res.data || !String(res.headers['content-type'] || '').includes('image')) {
                                console.log('editfoto gagal, coba nano-banana...', res.status)
                                res = await axios.get(`https://api-faa.my.id/faa/nano-banana?url=${urlEnc}&prompt=${promptEnc}`, { responseType: 'arraybuffer', timeout: 180000, validateStatus: () => true })
                            }
                            if (res.status !== 200 || !res.data || !String(res.headers['content-type'] || '').includes('image')) {
                                throw `Gagal mengedit foto! (server: ${res.status})`
                            }
                            await bob.sendMessage(m.chat, {
                                image: Buffer.from(res.data),
                                caption: isCreator ? `Selesai mengedit foto ✨\n👑 Owner: unlimited` : `Selesai mengedit foto ✨\n🎫 Sisa jatah: *${take.sisa}/${editimg.BATAS_PAKAI}* (reset 6 jam)`
                            }, { quoted: m })
                        } catch (e) {
                            console.log(e)
                            reply(typeof e === 'string' ? e : 'Terjadi error, coba lagi nanti.')
                        } finally {
                            slot.release() // <-- bebaskan giliran
                        }
                    }
                    break
                    case 'chatai':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (!m.isGroup) {
                if (q.toLowerCase() === "on") {
                          if (isChatBot) return reply(`ChatBot Telah aktif`)
                          joDatabase.setGroup(m.chat, { chatbot: true })
                          reply(`Sukses mengaktifkan ChatBot di grup ini`)
                        } else if (q.toLowerCase() === "off") {
                          if (!isChatBot) return reply(`CHATBOT GPT telah nonaktif`)
                          joDatabase.setGroup(m.chat, { chatbot: false })
                          reply(`Sukses menonaktifkan GPT BOT di grup ini`)
                        } else {
                          reply(`Pilih on atau off\nExample : ${CmD} on`)
                        }
                    } else 
                        if (!isGroupAdmins) return reply (mess.admin)
                        if (m.isGroup){
                            if (q.toLowerCase() === "on") {
                                if (isChatBot) return reply(`ChatBot Telah aktif`)
                                joDatabase.setGroup(m.chat, { chatbot: true })
                                reply(`Sukses mengaktifkan ChatBot di grup ini`)
                              } else if (q.toLowerCase() === "off") {
                                if (!isChatBot) return reply(`CHATBOT GPT telah nonaktif`)
                                joDatabase.setGroup(m.chat, { chatbot: false })
                                reply(`Sukses menonaktifkan GPT BOT di grup ini`)
                              } else {
                                reply(`Pilih on atau off\nExample : ${CmD} on`)
                              }
                        }
                    }
                    
                    break
                    case 'chatbot':{
                        if (!m.isGroup) {
                        var btn =  [{"name": "quick_reply",
                        "buttonParamsJson": "{\"display_text\":\"On\",\"id\":\"#chatai on\"}"
                        }, {"name": "quick_reply",
                        "buttonParamsJson": "{\"display_text\":\"Off\",\"id\":\"#chatai off\"}"
                        },]
                        bob.sendButton(m.chat, `Silahkan Pilih Opsi Berikut`,'', `> *_Haii ${pushname}_*\n` ,btn)
                    } else 
                    if (!isGroupAdmins) return reply (mess.admin)
                    if (m.isGroup){
                        var btn =  [{"name": "quick_reply",
                        "buttonParamsJson": "{\"display_text\":\"On\",\"id\":\"#chatai on\"}"
                        }, {"name": "quick_reply",
                        "buttonParamsJson": "{\"display_text\":\"Off\",\"id\":\"#chatai off\"}"
                        },]
                        bob.sendButton(m.chat, `Silahkan Pilih Opsi Berikut`,'', `> *_Haii ${pushname}_*\n` ,btn)
                    }
                    }
                    break
                    case 'antilink': {
                    if (!m.isGroup) return reply(global.mess.group)
                    if (!isGroupAdmins) return reply(global.mess.admin)
                    if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                if (q.toLowerCase() === 'enable'){
                    if (isAntiLink) return reply(`Status Sudah Aktif.`)
                    joDatabase.setGroup(m.chat, { antilink: true })
					reply('Sukses Menyalakan Antilink Grup, Jika Ada Member Yg Send Link GC, BOT Akan KICK!')
                } else if (q.toLowerCase() === 'disable'){
                    joDatabase.setGroup(m.chat, { antilink: false })
                    reply('Nonaktif.')
                } else {
                    reply(`Pilih enable atau disable\nContoh : ${prefix}antilink enable`)
                }
            }
                break
                    // ===== MENU:Group Menu =====
                    case 'antimedia': {
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        const AM_KEYS = ['gambar', 'audio', 'video', 'document', 'vn', 'sticker']
                        const AM_LABEL = { gambar: 'Gambar 🖼️', audio: 'Audio 🎵', video: 'Video 🎥', document: 'Dokumen 📄', vn: 'Voice Note 🎙️', sticker: 'Sticker 🌟' }
                        const normTipe = (s) => {
                            s = String(s || '').toLowerCase()
                            if (['gambar', 'image', 'foto', 'picture', 'gbr'].includes(s)) return 'gambar'
                            if (['audio', 'musik', 'suara', 'mp3'].includes(s)) return 'audio'
                            if (['video', 'vid', 'vidio', 'mp4'].includes(s)) return 'video'
                            if (['document', 'dokumen', 'doc', 'dok', 'file', 'pdf'].includes(s)) return 'document'
                            if (['vn', 'voicenote', 'voice', 'vnote', 'ptt', 'vnote', 'voice-note', 'voicenot'].includes(s)) return 'vn'
                            if (['sticker', 'stiker', 'sticker', 'stik'].includes(s)) return 'sticker'
                            return null
                        }
                        const normAct = (s) => {
                            s = String(s || '').toLowerCase()
                            if (['on', 'enable', 'aktif', 'aktifkan', '1'].includes(s)) return true
                            if (['off', 'disable', 'mati', 'matikan', 'nonaktif', '0'].includes(s)) return false
                            return null
                        }
                        const curAM = () => joDatabase.getGroup(m.chat).antimedia
                        const statusText = () => {
                            const a = curAM()
                            const ico = (v) => v ? 'ON ✅' : 'OFF ❌'
                            return `*「 ANTI MEDIA 」*\n\nMedia yang *dihapus otomatis* bila dikirim member biasa:\n• Gambar : *${ico(a.gambar)}*\n• Audio : *${ico(a.audio)}*\n• Video : *${ico(a.video)}*\n• Dokumen : *${ico(a.document)}*\n• Voice Note : *${ico(a.vn)}*\n• Sticker : *${ico(a.sticker)}*\n\n_Syarat: bot harus jadi admin agar bisa menghapus pesan._`
                        }
                        const setOne = (key, val) => {
                            const a = curAM()
                            a[key] = val
                            joDatabase.setGroup(m.chat, { antimedia: a })
                        }
                        const setAll = (val) => {
                            const a = {}
                            for (const k of AM_KEYS) a[k] = val
                            joDatabase.setGroup(m.chat, { antimedia: a })
                        }
                        const a0 = String(args[0] || '').toLowerCase()
                        const a1 = String(args[1] || '').toLowerCase()
                        // #antimedia on / off -> semua
                        if (args.length === 1 && normAct(a0) !== null) {
                            setAll(normAct(a0))
                            return reply(`${statusText()}\n\n${normAct(a0) ? 'Semua filter anti-media *DIAKTIFKAN* ✅' : 'Semua filter anti-media *DIMATIKAN* ❌'}`)
                        }
                        // #antimedia <tipe> on/off
                        if (args.length >= 2) {
                            const key = normTipe(a0)
                            const val = normAct(a1)
                            if (!key) return reply(`Tipe tidak dikenal: *${args[0]}*\n\nPilih: gambar, audio, video, document, vn, sticker\nContoh: *${prefix}antimedia gambar on*`)
                            if (val === null) return reply(`Pilih on atau off\nContoh: *${prefix}antimedia ${key} on*`)
                            setOne(key, val)
                            return reply(`${statusText()}\n\nFilter *${AM_LABEL[key]}* ${val ? '*DIAKTIFKAN* ✅' : '*DIMATIKAN* ❌'}`)
                        }
                        if (q && args.length > 0) return reply(`Format salah.\nContoh:\n• *${prefix}antimedia* (buka daftar pilihan)\n• *${prefix}antimedia gambar on*\n• *${prefix}antimedia on* (aktifkan semua)`)
                        // Tanpa argumen -> kirim LIST MESSAGE pilihan
                        const a = curAM()
                        const toggleId = (key) => `${prefix}antimedia ${key} ${a[key] ? 'off' : 'on'}`
                        const listText = `${statusText()}\n\nSilakan pilih media dari daftar di bawah. Media yang *ON* akan dihapus otomatis bila dikirim member.`
                        const listData = {
                            title: 'Pilih Media',
                            sections: [{
                                title: 'Anti Media',
                                highlight_label: 'Anti Media',
                                rows: [
                                    { title: `${a.gambar ? '❌' : '✅'} Gambar`, description: `Saat ini ${a.gambar ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('gambar') },
                                    { title: `${a.audio ? '❌' : '✅'} Audio`, description: `Saat ini ${a.audio ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('audio') },
                                    { title: `${a.video ? '❌' : '✅'} Video`, description: `Saat ini ${a.video ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('video') },
                                    { title: `${a.document ? '❌' : '✅'} Dokumen`, description: `Saat ini ${a.document ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('document') },
                                    { title: `${a.vn ? '❌' : '✅'} Voice Note`, description: `Saat ini ${a.vn ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('vn') },
                                    { title: `${a.sticker ? '❌' : '✅'} Sticker`, description: `Saat ini ${a.sticker ? 'ON — klik untuk matikan' : 'OFF — klik untuk aktifkan'}`, id: toggleId('sticker') },
                                    { title: '✅ Aktifkan Semua', description: 'Hapus semua jenis media di atas', id: `${prefix}antimedia on` },
                                    { title: '❌ Matikan Semua', description: 'Izinkan semua jenis media', id: `${prefix}antimedia off` }
                                ]
                            }]
                        }
                        let sent = false
                        try {
                            if (bob.sendListButtonv2) {
                                await bob.sendListButtonv2(m.chat, listText, listData, '> JojoBot', { quoted: m })
                                sent = true
                            }
                        } catch (e) { console.log('[antimedia list]', e?.message || e) }
                        if (!sent) {
                            try {
                                const btnAM = [
                                    { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Aktifkan Semua ✅', id: `${prefix}antimedia on` }) },
                                    { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Matikan Semua ❌', id: `${prefix}antimedia off` }) }
                                ]
                                if (bob.sendButton) {
                                    await bob.sendButton(m.chat, listText, '> JojoBot', 'ANTI MEDIA', btnAM)
                                    sent = true
                                }
                            } catch (e) {}
                        }
                        if (!sent) {
                            reply(`${listText}\n\n• *${prefix}antimedia gambar on/off*\n• *${prefix}antimedia audio on/off*\n• *${prefix}antimedia video on/off*\n• *${prefix}antimedia document on/off*\n• *${prefix}antimedia vn on/off*\n• *${prefix}antimedia sticker on/off*\n• *${prefix}antimedia on* (semua) / *${prefix}antimedia off*`)
                        }
                    }
                break
                case 'qc': case 'chat': case 'fm': {
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
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
                case 'stalkig': case 'igstalk':{
                // if (checkLogin(sender, loginulti) === false) return reply(mess.reg)
                if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                limitAdd(sender, limit)
                apiku.stalkig(args[0]).then ( data => {
                var teksig = `*[ INSTAGRAM STALKER ]*\n\nUsername : ${data.result.user_info.username}\nLink : https://instagram.com/${data.result.user_info.username}\nFull Name : ${data.result.user_info.full_name}\nBio : ${data.result.user_info.biography}\nPrivasi : ${data.result.user_info.is_private}\nPostingan : ${data.result.user_info.posts}\nFollowers : ${data.result.user_info.followers}\nFollowing : ${data.result.user_info.following}`
                bob.sendMessage(m.chat, {image: {url: data.result.user_info.profile_pic_url}, caption: teksig})
                } ).catch(() => reply(`Username Tidak Ada ❌`))
                }
                break
                case 'igdl': case 'instagram': case 'ig': {
                    if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply (`Poin kamu sudah habis silahkan kirim ${prefix}poin untuk mengecek Point Yang Tersedia`)
                    limitAdd(sender, limit)
                    if (!q) return reply(`Berikan Link\nExample : ${prefix}igdl link`)
                    if (!isUrl(q)) return reply(`Link Ga Sesuai`)
                    if (!q.includes('instagram.com')) return reply(`Link Ga Sesuai`)
                    reply(global.mess.wait)
                    instagram(q).then(data => {
                        if (!data || !data.length) throw new Error('empty')
                        for (let i of data) {
                            if (i.type === "video") {
                                bob.sendMessage(m.chat, { video: { url: i.url } }, { quoted: m })
                            } else if (i.type === "image") {
                                bob.sendMessage(m.chat, { caption: `Sukses, Follow Instagram : @arsrfii`, image: { url: i.url } }, { quoted: m })
                            }
                        }
                    }).catch((ePrimary) => {
                        console.error('IGDL-INDOWN gagal, coba fallback ummy:', ePrimary && ePrimary.message)
                        // fallback langsung: API siputzx/ummy (tanpa lewat lib)
                        ;(async () => {
                            try {
                                const linkMatch = (q || '').match(/https?:\/\/[^\s]+/i)
                                if (!linkMatch) return reply(`ERORR. Postingan tidak Tersedia (link tidak terbaca)`)
                                let link = linkMatch[0]
                                const cm = link.match(/instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/i)
                                const sm = link.match(/instagram\.com\/(stories\/[a-zA-Z0-9_.]+\/\d+)/i)
                                if (cm) link = `https://www.instagram.com/${cm[1].toLowerCase()}/${cm[2]}/`
                                else if (sm) link = `https://www.instagram.com/${sm[1]}`
                                console.log('IGDL-UMMY fetch:', link)
                                const r = await axios.get('https://api.siputzx.my.id/api/d/ummy', {
                                    params: { url: link }, timeout: 90000, validateStatus: () => true
                                })
                                console.log('IGDL-UMMY http:', r.status, 'api:', r.data && r.data.status)
                                if (r.status !== 200 || !r.data || r.data.status !== true || !r.data.data) {
                                    console.error('IGDL-UMMY body:', JSON.stringify(r.data).slice(0, 300))
                                    return reply(`ERORR. API tidak mengembalikan media (kemungkinan: akun privat / postingan dihapus / link story kedaluwarsa)`)
                                }
                                const rawItems = Array.isArray(r.data.data) ? r.data.data : [r.data.data]
                                const medias = []
                                for (const it of rawItems) {
                                    const formats = Array.isArray(it.url) ? it.url : []
                                    const vids = formats.filter(f => f && f.url && /mp4|video/i.test(`${f.type} ${f.ext} ${f.name}`))
                                    vids.sort((a, b) => (Number(b.quality) || 0) - (Number(a.quality) || 0))
                                    const imgs = formats.filter(f => f && f.url && /webp|jpg|jpeg|png|image/i.test(`${f.type} ${f.ext} ${f.name}`))
                                    const picked = vids[0] ? { ...vids[0], kind: 'video' } : imgs[0] ? { ...imgs[0], kind: 'image' } : formats.find(f => f && f.url) ? { ...formats.find(f => f && f.url), kind: 'file' } : null
                                    if (!picked) continue
                                    medias.push({
                                        url: picked.url, kind: picked.kind, ext: picked.ext || 'bin',
                                        title: (it.meta && it.meta.title) || '',
                                        uploader: (it.meta && (it.meta.username || it.meta.source)) || 'Unknown'
                                    })
                                    if (medias.length >= 10) break
                                }
                                if (!medias.length) return reply(`ERORR. API tidak menemukan media di link ini (privat/dihapus?)`)
                                const first = medias[0]
                                const judul = first.title || 'Instagram Media'
                                console.log('IGDL-UMMY medias:', medias.length, medias[0].kind)
                                for (let idx = 0; idx < medias.length; idx++) {
                                    const med = medias[idx]
                                    const cap = idx === 0
                                        ? `*[ INSTAGRAM DOWNLOADER ]*\n\nJudul : ${judul}\nUploader : ${first.uploader}` +
                                          (medias.length > 1 ? `\nMedia ${idx + 1}/${medias.length}` : '')
                                        : `Media ${idx + 1}/${medias.length}`
                                    try {
                                        if (med.kind === 'video') {
                                            await bob.sendMessage(m.chat, { video: { url: med.url }, caption: cap }, { quoted: m })
                                        } else if (med.kind === 'image') {
                                            await bob.sendMessage(m.chat, { image: { url: med.url }, caption: cap }, { quoted: m })
                                        } else {
                                            await bob.sendMessage(m.chat, { document: { url: med.url }, fileName: `instagram.${med.ext}`, caption: cap }, { quoted: m })
                                        }
                                    } catch {
                                        try {
                                            await bob.sendMessage(m.chat, { document: { url: med.url }, fileName: `instagram.${med.ext}`, mimetype: med.kind === 'video' ? 'video/mp4' : undefined, caption: cap }, { quoted: m })
                                        } catch (e2) {
                                            console.error('IGDL-UMMY kirim gagal:', e2.message || e2)
                                            return reply(`ERORR. Media dapat tapi gagal dikirim ke WA, coba lagi nanti`)
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error('IGDL-UMMY ERROR:', e.message || e)
                                reply(`ERORR. Postingan tidak Tersedia`)
                            }
                        })()
                    })
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
                     case 'mute':
                    if (!m.isGroup) return reply(mess.group)
                    if (!isGroupAdmins && !isOwner) return reply(mess.admin)
                    if (isMuted) return reply(`udah Dimute`)
                    joDatabase.setGroup(m.chat, { mute: true })
                    reply(`Bot berhasil dimute di chat ini`)
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
                     case 'add':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        // Kumpulkan target dari: tag/mention, reply pesan, atau nomor manual (boleh banyak, pisah spasi/koma)
                        let targets = []
                        try {
                            const mentioned = []
                            if (Array.isArray(mentionUser)) mentioned.push(...mentionUser)
                            if (m.msg && m.msg.contextInfo && Array.isArray(m.msg.contextInfo.mentionedJid)) mentioned.push(...m.msg.contextInfo.mentionedJid)
                            for (const j of mentioned) {
                                const jid = String(j || '')
                                if (jid.endsWith('@s.whatsapp.net') && !targets.includes(jid)) targets.push(jid)
                            }
                        } catch {}
                        if (q) {
                            for (const part of String(q).split(/[\s,;]+/)) {
                                if (!part || /[a-zA-Z]/.test(part)) continue // lewati teks biasa / nama display hasil tag
                                let num = part.replace(/[^0-9]/g, '')
                                if (!num) continue
                                if (num.startsWith('08')) num = '62' + num.slice(1)
                                else if (!num.startsWith('62') && num.length > 5) num = '62' + num
                                if (num.length < 9) continue
                                const jid = num + '@s.whatsapp.net'
                                if (!targets.includes(jid)) targets.push(jid)
                            }
                        } else if (m.quoted && m.quoted.sender) {
                            // NOTE: pakai m.quoted (null bila tidak reply), bukan variabel `quoted`
                            // yang fallback ke pesan sendiri sehingga add tanpa argumen malah menambah diri sendiri
                            const jid = String(m.quoted.sender)
                            if (!targets.includes(jid)) targets.push(jid)
                        }
                        if (!targets.length) {
                            return reply(`Format salah!\nContoh: ${prefix}add 628xxx atau reply/tag pesan user yang ingin ditambahkan.`)
                        }

                        let meta0 = null
                        try { meta0 = await bob.groupMetadata(m.chat) } catch {}
                        const alreadyIn = new Set((meta0 && meta0.participants ? meta0.participants : []).map(p => p.id))
                        const ok = [], failed = [], invited = [], skipped = []
                        for (const target of targets) {
                            if (alreadyIn.has(target)) { skipped.push(target); continue }
                            try {
                                const res = await bob.groupParticipantsUpdate(m.chat, [target], "add")
                                const first = res && res[0]
                                const st = first && (first.status ?? (first.content && first.content.attrs && first.content.attrs.error))
                                if (String(st) === '200') {
                                    ok.push(target)
                                } else if (String(st) === '403' || String(st) === '401') {
                                    // Privasi grup user: kirim link undangan ke PC-nya
                                    try {
                                        const code = await bob.groupInviteCode(m.chat)
                                        const gname = (meta0 && meta0.subject) || groupName || 'grup'
                                        const msgInvite = `*UNDANGAN GRUP WHATSAPP*\n\nHalo! Kamu diundang oleh admin @${sender.split('@')[0]} untuk bergabung ke grup *${gname}*:\n\nhttps://chat.whatsapp.com/${code}\n\n_Silakan klik tautan di atas untuk bergabung._`
                                        await bob.sendMessage(target, { text: msgInvite, mentions: [sender] })
                                        invited.push(target)
                                    } catch (e2) {
                                        failed.push(`@${target.split('@')[0]} (privasi grup, link gagal dikirim: ${e2.message})`)
                                    }
                                } else if (String(st) === '409') {
                                    skipped.push(target)
                                } else if (String(st) === '408') {
                                    failed.push(`@${target.split('@')[0]} (baru keluar grup, tidak bisa langsung ditambahkan — kirim link manual)`)
                                } else {
                                    failed.push(`@${target.split('@')[0]} (status: ${st})`)
                                }
                            } catch (err) {
                                failed.push(`@${target.split('@')[0]} (${err?.message || err})`)
                            }
                        }
                        const tagAll = [...ok, ...invited, ...skipped]
                        let hasil = ''
                        if (ok.length) hasil += `✅ Berhasil menambahkan: ${ok.map(t => '@' + t.split('@')[0]).join(', ')}\n`
                        if (invited.length) hasil += `📩 Privasi grup aktif, link undangan dikirim ke PC: ${invited.map(t => '@' + t.split('@')[0]).join(', ')}\n`
                        if (skipped.length) hasil += `ℹ️ Sudah di dalam grup: ${skipped.map(t => '@' + t.split('@')[0]).join(', ')}\n`
                        if (failed.length) hasil += `❌ Gagal: ${failed.join(', ')}`
                        ngetag(hasil.trim() || 'Tidak ada yang diproses.', tagAll, true)
                     }
                     break
                     case 'kick':{
                    if (!m.isGroup) return reply(global.mess.group)
                    if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                    if (!isGroupAdmins) return reply(global.mess.admin)
                    if (!q) {
                        bob.groupParticipantsUpdate(m.chat, [quoted.sender], "remove")
                        ngetag(`Sukses Mengeluarkan @${quoted.sender.split('@')[0]}`, [quoted.sender], true)
                    } else {
                        reply(`Reply Messagenya`)
                    }
                     }
                     break
                     case 'promote':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!q) {
                            bob.groupParticipantsUpdate(m.chat, [quoted.sender], "promote")
                            ngetag(`Menambahkan @${quoted.sender.split('@')[0]} Sebagai Admin.`, [quoted.sender], true)
                        } else {
                            if (args[0].startsWith('08')) return reply(`Awali Dengan 62! bukan 08\nContoh : ${sender.split("@")[0]}`)
                            bob.groupParticipantsUpdate(m.chat, [args[0] + `@s.whatsapp.net`], "promote").catch(err => reply(`Gagal`))
                        }
                         }
                         break
                         case 'demote':{
                            if (!m.isGroup) return reply(global.mess.group)
                            if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                            if (!isGroupAdmins) return reply(global.mess.admin)
                            if (!q) {
                                bob.groupParticipantsUpdate(m.chat, [quoted.sender], "demote")
                                ngetag(`Menurunkan Jabatan Admin Kepada : @${quoted.sender.split('@')[0]}`, [quoted.sender], true)
                            } else {
                                reply(`Reply Messagenya`)
                            }
                             }
                             break
                     case 'setname':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        bob.groupUpdateSubject(m.chat, q)
                        reply(`Sukses Mengubah Judul Grup.`)
                     }
                     break
                     case 'linkgc':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        var code = await bob.groupInviteCode(m.chat)
                        reply(`Link GC : \nhttps://chat.whatsapp.com/`+ code)
                     }
                     break
                     case 'opengc':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        bob.groupSettingUpdate(m.chat, 'not_announcement')
                     }
                     break
                     case 'close':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        bob.groupSettingUpdate(m.chat, 'announcement')
                     }
                     break
                     case 'leave':{
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        if (!isCreator) return reply(mess.owner)
                        bob.groupLeave(m.chat)
                     }
                     break
                     case 'join':{
                        if (!isCreator) return reply(mess.own)
                        var linkaja = args[0].split("/")[3]
                        var responsenya = bob.groupAcceptInvite(linkaja)
                        reply(`Sukses Masuk Ke Grup : ${q}`)
                     }
                     break
                     case 'invite':{
                        var response = await bob.groupAcceptInviteV4(sender, m.chat)
                        reply(response)
                     }
                     break
                    //AKHIR GROUP
                    /*
                    case 'login':{
                    if (DaftarAnjay) return reply(`Kamu Sudah Login!.`)
                    daftar.push(sender)
                    fs.writeFileSync('./assets/db/daftar.json', JSON.stringify(daftar))
                    giveLimit(sender, `10`, limit)
                    var daftarnya = `Kamu sukses mendaftar dengan nomor *${sender.split("@")[0]}* Dan Bernama *${pushname}*, sehingga mendapatkan kode yaitu : *${otpkode(5)}*. Setelah itu mendapatkan 10 Poin`
                    await sleep(4000)
                    fakereply(daftarnya)
                    }
                    break*/
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
                    case 'donasi': case 'donate':{
var sewa = `*[ DONASI ]*
Donasi
1. Spay : 0882-1329-2687
2. Gopay : 0882-1329-2687
3. Dana : 0882-1329-2687

Setelah melakukan donasi dari jojo, mohon konfirmasi melalui kontak di bawah ini:
Email: arasyarafi02@gmail.com
Whatsapp: 0882-1477-2441
Link : https://wa.me/6288214772441`
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
                // ===== MENU:Owner Menu =====
                case 'create-token':{
                if (!isCreator) throw mess.owner
                var tokrand = `TKN-${otpkode(5)}`
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
                    0
                    
                    break
                    case 'backup':{
                    if (!isCreator)
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/antilink.json'), fileName: `antilink.json`, mimetype: `json`})
                    await sleep(2000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/limit.json'), fileName: `limit.json`, mimetype: `json`})
                    await sleep(3000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/prem2.json'), fileName: `prem2.json`, mimetype: `json`})
                    await sleep(4000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/token.json'), fileName: `token.json`, mimetype: `json`})
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/commands.json'), fileName: `commands.json`, mimetype: `json`})
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/mute.json'), fileName: `mute.json`, mimetype: `json`})
                    await sleep(5000)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./assets/db/register.json'), fileName: `register.json`, mimetype: `json`})
                    await sleep(5000)
                    joDatabase.saveDB(true)
                    bob.sendMessage(m.chat, {document: fs.readFileSync('./database.json'), fileName: `database.json`, mimetype: `json`})
                    }
                    break
                    // ========== JO DATABASE ==========
                    case 'dbsync': case 'syncdb': {
                        if (!isCreator) return reply(global.mess.owner)
                        await joDatabase.forceSync()
                        reply(`✅ Sync database ke JVault selesai.\nTotal user: ${joDatabase.getUserCount()}`)
                    }
                    break
                    // ========== BRAT STICKER ==========
                    // ===== MENU:Other Menu =====
                    case 'brat': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin kamu habis, ketik ${prefix}poin`)
                        let txt = m.quoted ? (m.quoted.text || m.quoted.caption || '') : q
                        if (!txt) return reply(`Kirim/Reply teks!\nContoh: *${prefix}brat Halo Arasya*`)
                        if (txt.length > 200) return reply('Teks terlalu panjang! Maks 200 karakter.')
                        limitAdd(sender, limit)
                        try {
                            let url = `https://brat.siputzx.my.id/image?text=${encodeURIComponent(txt)}`
                            let buf = await getBuffer(url)
                            await bob.sendImageAsSticker(m.chat, buf, m, { packname: global.packname, author: global.author })
                        } catch (e) { console.log(e); reply(`Gagal brat: ${e.message}`) }
                    }
                    break
                    // ========== PLAY (YT SEARCH + AUDIO) ==========
                    case 'play': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis, ketik ${prefix}poin`)
                        if (!q) return reply(`Contoh: ${prefix}play astaga bercanda thailand style\n\n*Flag (opsional, di akhir):*\n• *--vn* : kirim sebagai voice note\n• *--video* : kirim sebagai video\n• *--doc* : kirim sebagai dokumen`)
                        // Flag output: --vn / --video / --doc (boleh digabung, mis. --video --doc)
                        let mode = 'audio'
                        if (/\s--(vn|voice|ptt)\b/i.test(' ' + q)) mode = 'vn'
                        if (/\s--(video|vid|mp4)\b/i.test(' ' + q)) mode = 'video'
                        if (/\s--(doc|document)\b/i.test(' ' + q)) mode = (mode === 'video' ? 'videodoc' : 'doc')
                        let query = String(q).replace(/\s--(vn|voice|ptt|video|vid|mp4|doc|document)\b/gi, '').trim()
                        if (!query) return reply(`Judul lagunya mana?\nContoh: ${prefix}play astaga bercanda --vn`)
                        limitAdd(sender, limit)
                        reply(global.mess.wait)
                        let dlFile = null
                        try {
                            // Cari metadata via yt-search, unduh via yt-dlp (youtube-dl-exec)
                            let s = await yts(query)
                            let v = s.videos[0]
                            if (!v) throw new Error('Lagu tidak ditemukan')
                            let cap = `✨ *YT PLAY*\n🎵 ${v.title}\n👤 ${v.author.name}\n⏳ ${v.timestamp}\n🔗 ${v.url}`
                            if (v.thumbnail) await bob.sendMessage(m.chat, { image: { url: v.thumbnail }, caption: cap }, { quoted: m }).catch(() => reply(cap))
                            else reply(cap)
                            if (mode === 'video' || mode === 'videodoc') {
                                let dl = await ytdlp.downloadVideo(v.url, { id: v.videoId, title: v.title, uploader: v.author.name, thumbnail: v.thumbnail, webpageUrl: v.url })
                                dlFile = dl.file
                                let buf = fs.readFileSync(dl.file)
                                if (mode === 'videodoc') {
                                    await bob.sendMessage(m.chat, { document: buf, mimetype: 'video/mp4', fileName: `${dl.title}.mp4` }, { quoted: m })
                                } else {
                                    await bob.sendMessage(m.chat, { video: buf, mimetype: 'video/mp4', caption: `🎬 ${dl.title}` }, { quoted: m })
                                }
                            } else {
                                let dl = await ytdlp.downloadAudio(v.url, { id: v.videoId, title: v.title, uploader: v.author.name, thumbnail: v.thumbnail, webpageUrl: v.url })
                                dlFile = dl.file
                                let buf = fs.readFileSync(dl.file)
                                if (mode === 'vn') {
                                    try {
                                        const { toPTT } = require('./lib/converter')
                                        let opus = await toPTT(buf, 'mp3')
                                        await bob.sendMessage(m.chat, { audio: opus, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m })
                                    } catch {
                                        await bob.sendMessage(m.chat, { audio: buf, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
                                    }
                                } else if (mode === 'doc') {
                                    await bob.sendMessage(m.chat, { document: buf, mimetype: 'audio/mpeg', fileName: `${dl.title}.mp3` }, { quoted: m })
                                } else {
                                    await bob.sendMessage(m.chat, { audio: buf, mimetype: 'audio/mpeg', fileName: `${dl.title}.mp3` }, { quoted: m })
                                }
                            }
                        } catch (e) {
                            console.log('[play]', e?.message || e)
                            // Fallback: API eksternal (hanya mode audio/vn/doc)
                            try {
                                if (mode === 'video' || mode === 'videodoc') throw e
                                const api = `https://api-faa.my.id/faa/ytplay?query=${encodeURIComponent(query)}`
                                let res = await axios.get(api, { timeout: 15000 }).catch(() => null)
                                if (res && res.data && res.data.status && res.data.result && res.data.result.mp3) {
                                    let ab = await getBuffer(res.data.result.mp3)
                                    if (ab.length > 50 * 1024 * 1024) return reply(`File terlalu besar`)
                                    if (mode === 'vn') await bob.sendMessage(m.chat, { audio: ab, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
                                    else if (mode === 'doc') await bob.sendMessage(m.chat, { document: ab, mimetype: 'audio/mpeg', fileName: `play.mp3` }, { quoted: m })
                                    else await bob.sendMessage(m.chat, { audio: ab, mimetype: 'audio/mpeg' }, { quoted: m })
                                } else throw e
                            } catch { reply(`Gagal play: ${e.message}`) }
                        } finally { ytdlp.cleanup(dlFile) }
                    }
                    break
                    // ========== YTMP3 (youtube-dl-exec / yt-dlp) ==========
                    case 'ytmp3': case 'yta': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis`)
                        let url = q || (m.quoted && m.quoted.text) || ''
                        let mUrl = String(url).match(/https?:\/\/(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\/\S+/)
                        if (!mUrl) return reply(`Kirim URL YouTube!\nContoh: ${prefix}ytmp3 https://youtu.be/xxxx`)
                        url = mUrl[0]
                        limitAdd(sender, limit)
                        reply(global.mess.wait)
                        let dlFile = null
                        try {
                            let info = await ytdlp.getInfo(url)
                            reply(`🎵 *${info.title}*\n👤 ${info.uploader || '-'}\n⏳ ${ytdlp.fmtDuration(info.duration)}\n\n_Mengunduh audio via yt-dlp..._`)
                            let dl = await ytdlp.downloadAudio(url, info)
                            dlFile = dl.file
                            await bob.sendMessage(m.chat, { audio: fs.readFileSync(dl.file), mimetype: 'audio/mpeg', fileName: `${info.title}.mp3` }, { quoted: m })
                        } catch (e) {
                            console.log('[ytmp3]', e?.message || e)
                            // fallback via api-faa
                            try {
                                let api = `https://api-faa.my.id/faa/ytmp3?url=${encodeURIComponent(url)}`
                                let r = await axios.get(api, { timeout: 15000 })
                                let mp3 = r.data?.result?.download_url || r.data?.result?.mp3
                                if (!mp3) throw new Error('API gagal')
                                let ab = await getBuffer(mp3)
                                await bob.sendMessage(m.chat, { audio: ab, mimetype: 'audio/mpeg' }, { quoted: m })
                            } catch (e2) { reply(`Gagal ytmp3: ${e.message}`) }
                        } finally { ytdlp.cleanup(dlFile) }
                    }
                    break
                    // ========== YTMP4 (youtube-dl-exec / yt-dlp) ==========
                    case 'ytmp4': case 'ytv': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis`)
                        let url = q || ''
                        let mUrl = String(url).match(/https?:\/\/(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\/\S+/)
                        if (!mUrl) return reply(`Kirim URL YouTube!\nContoh: ${prefix}ytmp4 https://youtu.be/xxxx`)
                        url = mUrl[0]
                        limitAdd(sender, limit)
                        reply(global.mess.wait)
                        let dlFile = null
                        try {
                            let info = await ytdlp.getInfo(url)
                            reply(`🎬 *${info.title}*\n👤 ${info.uploader || '-'}\n⏳ ${ytdlp.fmtDuration(info.duration)}\n\n_Mengunduh video via yt-dlp..._`)
                            let dl = await ytdlp.downloadVideo(url, info)
                            dlFile = dl.file
                            await bob.sendMessage(m.chat, { video: fs.readFileSync(dl.file), mimetype: 'video/mp4', caption: `🎬 ${info.title}` }, { quoted: m })
                        } catch (e) {
                            console.log('[ytmp4]', e?.message || e)
                            try {
                                let api = `https://api-faa.my.id/faa/ytmp4?url=${encodeURIComponent(url)}`
                                let r = await axios.get(api, { timeout: 15000 })
                                if (!r.data.status || !r.data.result?.download_url) throw new Error('API gagal')
                                await bob.sendMessage(m.chat, { video: { url: r.data.result.download_url }, mimetype: 'video/mp4', caption: `🎬 ${r.data.result.title || ''}` }, { quoted: m })
                            } catch (e2) { reply(`Gagal ytmp4: ${e.message}`) }
                        } finally { ytdlp.cleanup(dlFile) }
                    }
                    break
                    // ========== TIKTOK MUSIC (api-faa) ==========
                    case 'tiktokmp3': case 'ttmp3': case 'ttmusic': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis`)
                        let url = (q || '').trim().split(/\s+/)[0] || ''
                        if (!url || !/^https?:\/\/(www\.|vt\.|vm\.|m\.)?tiktok\.com\//.test(url)) return reply(`Kirim link TikTok!\nContoh: ${prefix}tiktokmp3 https://vt.tiktok.com/xxxx`)
                        limitAdd(sender, limit)
                        reply(global.mess.wait)
                        try {
                            let r = await axios.get('https://api-faa.my.id/faa/tiktok', { params: { url }, timeout: 25000, validateStatus: () => true })
                            let mus = r.data && r.data.result && r.data.result.music_info
                            if (!r.data.status || !mus || !mus.url) throw new Error('Musik tidak ditemukan di video ini')
                            let title = mus.title && mus.title !== 'Unknown' ? mus.title : (r.data.result.title || 'TikTok Music')
                            let author = mus.author && mus.author !== 'Unknown' ? ` - ${mus.author}` : ''
                            let ab = await getBuffer(mus.url)
                            if (!ab || !ab.length) throw new Error('Gagal mengunduh audio')
                            await bob.sendMessage(m.chat, { audio: ab, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m })
                            reply(`🎵 *${title}${author}*`)
                        } catch (e) { reply(`Gagal tiktokmp3: ${e.message}`) }
                    }
                    break
                    // ========== MENFESS (UTAMA, pakai database tracking) ==========
                    case 'confess': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis`)
                        if (!q || !q.includes('|')) return reply(`Format: ${prefix}menfess 62812xxxx|pesan rahasia`)
                        limitAdd(sender, limit)
                        let [jidRaw, pesan] = q.split('|')
                        if (!jidRaw || !pesan) return reply(`Format: ${prefix}menfess 62812xxxx|Halo`)
                        let target = jidRaw.trim().replace(/[^0-9]/g, '')
                        if (target.startsWith('0')) target = '62' + target.slice(1)
                        let targetJid = target + '@s.whatsapp.net'
                        if (targetJid === m.sender) return reply('Gak bisa ke diri sendiri!')
                        try {
                            let cap = `👋 *Menfess rahasia untukmu!*\n\n💬 _"${pesan.trim()}"_\n\n_Dikirim via Jojo Bot (rahasia)_`
                            let imgPath = './media/surat.jpeg'
                            if (fs.existsSync(imgPath)) {
                                await bob.sendMessage(targetJid, { image: fs.readFileSync(imgPath), caption: cap })
                            } else {
                                await bob.sendMessage(targetJid, { text: cap })
                            }
                            reply('✅ Menfess terkirim!')
                        } catch (e) { reply('❌ Gagal kirim. Nomor salah / belum pernah chat bot.') }
                    }
                    break
                    // ========== BUYPREM (OTOPREM) ==========
                    case 'buyprem': {
                        if (isLimit(m.sender, isCreator, isPremium, limitCount, limit)) return reply(`Poin habis`)
                        limitAdd(sender, limit)
                        reply('💳 *BUYPREM*\nSilakan hubungi owner untuk QRIS:\nhttps://wa.me/' + global.owner[0] + '\nHarga 2k / 30 hari. Bot akan aktifkan manual setelah transfer.')
                    }
                    break
                    // ========== STICKER CMD (database.json -> sticker) ==========
                    case 'setcmd': {
                        if (!m.quoted || !m.quoted.fileSha256) return reply(`Balas stiker dengan ${prefix}setcmd <teks>\nContoh: ${prefix}setcmd menu`)
                        let hash = stickerHashOf(m.quoted.fileSha256)
                        if (!hash) return reply('SHA256 stiker tidak terbaca, coba stiker lain')
                        if (!q) return reply(`Teks tidak boleh kosong`)
                        let db = joDatabase.loadDB()
                        if (db.sticker[hash] && db.sticker[hash].locked) return reply('Stiker ini terkunci')
                        db.sticker[hash] = { text: q, mentionedJid: m.mentionedJid || [], creator: m.sender, at: Date.now(), locked: false }
                        joDatabase.saveDB(true); try{ require('./lib/jvault').syncUsers(db.users, db.sticker) }catch{}
                        reply('✅ setcmd berhasil')
                    }
                    break
                    case 'delcmd': {
                        if (!m.quoted || !m.quoted.fileSha256) return reply('Balas stiker yang mau dihapus')
                        let hash = stickerHashOf(m.quoted.fileSha256)
                        if (!hash) return reply('SHA256 stiker tidak terbaca, coba stiker lain')
                        let db = joDatabase.loadDB()
                        if (!db.sticker[hash]) return reply('Hash tidak ada di database')
                        if (db.sticker[hash].locked) return reply('Tidak ada izin (terkunci)')
                        delete db.sticker[hash]
                        joDatabase.saveDB(true); try{ require('./lib/jvault').syncUsers(db.users, db.sticker) }catch{}
                        reply('✅ delcmd berhasil')
                    }
                    break
                    case 'listcmd': {
                        let db = joDatabase.loadDB()
                        let list = Object.entries(db.sticker)
                        if (!list.length) return reply('Belum ada custom cmd stiker')
                        let teks = `*DAFTAR CMD STIKER*\n\`\`\`\n` + list.map(([k,v],i)=> `${i+1}. ${v.locked?'(🔒) ':''}${k.slice(0,12)} : ${v.text}`).join('\n') + `\n\`\`\``
                        let mentions = list.flatMap(([,v])=> v.mentionedJid || [])
                        await bob.sendMessage(m.chat, { text: teks, mentions }, { quoted: m })
                    }
                    break
                    case 'lockcmd': case 'unlockcmd': {
                        if (!m.quoted || !m.quoted.fileSha256) return reply('Balas stiker!')
                        let hash = stickerHashOf(m.quoted.fileSha256)
                        if (!hash) return reply('SHA256 stiker tidak terbaca, coba stiker lain')
                        let db = joDatabase.loadDB()
                        if (!(hash in db.sticker)) return reply('Hash tidak ada')
                        let lock = command === 'lockcmd'
                        db.sticker[hash].locked = lock
                        joDatabase.saveDB(true)
                        reply(`✅ ${lock ? 'Dikunci' : 'Dibuka'}: ${hash.slice(0,12)}`)
                    }
                    break
                    // ========== WEREWOLF (GROUP GAME) ==========
                    case 'ww': case 'werewolf': {
                        let ww = null
                        try { ww = require('./lib/werewolf') } catch (e) { return reply(`Game WW belum terpasang: ${e.message}`) }
                        await ww.handle(m, bob, { args, command, prefix, sender, pushname, isCreator, isGroupAdmins, isBotAdmins })
                    }
                    break
                    // ========== ANONYMOUS CHAT (private only) ==========
                    case 'start': case 'search': {
                        if (m.isGroup) return reply(global.mess.private)
                        const adb = loadAnonDB()
                        const jid = anonJid()
                        const cur = adb[jid]
                        if (cur && (cur.status === 'chatting' || cur.status === 'waiting')) return reply(`⚠️ Kamu masih berada di dalam obrolan/sesi! Ketik *${prefix}stop* dulu.`)
                        const waitingKey = Object.keys(adb).find(k => k !== jid && adb[k] && adb[k].status === 'waiting')
                        if (waitingKey) {
                            adb[waitingKey] = { a: waitingKey, b: jid, status: 'chatting' }
                            adb[jid] = { a: waitingKey, b: jid, status: 'chatting' }
                            saveAnonDB(adb)
                            try { await bob.sendMessage(waitingKey, { text: '✅ *Partner ditemukan!* Silakan mulai mengobrol.' }) } catch {}
                            return reply('✅ *Partner ditemukan!* Silakan mulai mengobrol.\n\n_Ketik *.stop* untuk mengakhiri atau *.next* untuk cari baru._')
                        }
                        adb[jid] = { status: 'waiting' }
                        saveAnonDB(adb)
                        return reply('🔍 *Mencari partner...* Mohon tunggu sampai ada seseorang yang bergabung.')
                    }
                    break
                    case 'stop': {
                        if (m.isGroup) return reply(global.mess.private)
                        const adb = loadAnonDB()
                        const jid = anonJid()
                        const room = adb[jid]
                        if (!room) return reply('⚠️ Kamu tidak sedang dalam obrolan anonymous.')
                        if (room.status === 'chatting') {
                            const partner = room.a === jid ? room.b : room.a
                            if (partner && adb[partner]) delete adb[partner]
                            try { await bob.sendMessage(partner, { text: '❌ *Partner telah mengakhiri obrolan.*' }) } catch {}
                        }
                        delete adb[jid]
                        saveAnonDB(adb)
                        return reply('✅ *Obrolan dihentikan.*')
                    }
                    break
                    case 'next': {
                        if (m.isGroup) return reply(global.mess.private)
                        let adb = loadAnonDB()
                        const jid = anonJid()
                        const room = adb[jid]
                        if (!room) return reply(`⚠️ Kamu belum mulai! Ketik *${prefix}start*`)
                        if (room.status === 'chatting') {
                            const partner = room.a === jid ? room.b : room.a
                            if (partner && adb[partner]) delete adb[partner]
                            try { await bob.sendMessage(partner, { text: '❌ *Partner telah mencari obrolan baru.*' }) } catch {}
                        }
                        delete adb[jid]
                        saveAnonDB(adb)
                        // langsung cari partner baru (tanpa rekursi handler)
                        adb = loadAnonDB()
                        const waitingKey = Object.keys(adb).find(k => k !== jid && adb[k] && adb[k].status === 'waiting')
                        if (waitingKey) {
                            adb[waitingKey] = { a: waitingKey, b: jid, status: 'chatting' }
                            adb[jid] = { a: waitingKey, b: jid, status: 'chatting' }
                            saveAnonDB(adb)
                            try { await bob.sendMessage(waitingKey, { text: '✅ *Partner ditemukan!* Silakan mulai mengobrol.' }) } catch {}
                            return reply('✅ *Partner ditemukan!* Silakan mulai mengobrol.\n\n_Ketik *.stop* untuk mengakhiri atau *.next* untuk cari baru._')
                        }
                        adb[jid] = { status: 'waiting' }
                        saveAnonDB(adb)
                        return reply('🔍 *Mencari partner baru...* Mohon tunggu.')
                    }
                    break
                    //Akhir owner menu
                    default:
                    if ( isChatBot ) {
                        if (m.text) {
                            console.log("->[\x1b[1;32mNew\x1b[1;37m]", color('Question From', 'yellow'), color(pushname, 'lightblue'), `: "${m.text}"`)
                            bob.sendPresenceUpdate("composing", m.chat);
                            try {
                                const service = new CompletionService({gemini: [`AIzaSyD9aD12un3L9CVK49fhC4JkkrlNGZgQ6vQ`] })
                        const [response] = await service.requestCompletion(
                            'gemini-1.0-pro', '', m.text
                        )
                        reply(response.text)
                    } catch (e) {
                        console.log()
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