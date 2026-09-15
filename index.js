/**
   * Create By Dika Ardnt.
   * Contact Me on wa.me/6288292024190
   * Follow https://github.com/DikaArdnt
*/
require('./config')
require('module-alias/register')
const { loadBaileys, makeSimpleStore, CUSTOM_PAIRING_RAW, CUSTOM_PAIRING_DISPLAY, formatPairingCode } = require('./lib/ourin')
const banner = require('./lib/banner')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const { color, bobLog } = require("./lib/color");
const PhoneNumber = require('awesome-phonenumber')
const syntaxerror = require('syntax-error')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function')
let welcome = JSON.parse(fs.readFileSync('./assets/db/welcome.json'));


//*plugins
let pluginFolder = path.join(__dirname, 'command')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    console.log(e)
    delete global.plugins[filename]
  }
}

//-----> SYSTEM PLUGINS
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) console.log(color(`Done Update plugins '${filename}'`, 'aqua'))
      else {
        console.log(color(`deleted plugin '${filename}'`, 'yellow'))
        return delete global.plugins[filename]
      }
    } else console.log(color(`requiring new plugin '${filename}'`, 'lime'))
    let err = syntaxerror(fs.readFileSync(dir), fs.existsSync(dir) ? filename : 'Execution Function')
    if (err) console.log(color(`syntax error while loading '${filename}'\n${err}`, 'red'))
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      console.log(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'command'), global.reload)
//----> END

/*global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')*/

async function startBot() {
    // Banner animasi JojoBot By Arasya — hanya sekali saat boot awal
    if (!global.__jojoBannerShown) {
        global.__jojoBannerShown = true
        await banner.showBanner()
    }
    const spin = banner.createSpinner('Menyiapkan koneksi...')
    spin.start()
    const {
        default: WASocket,
        useMultiFileAuthState,
        DisconnectReason,
        fetchLatestBaileysVersion,
        generateForwardMessageContent,
        generateWAMessageFromContent,
        downloadContentFromMessage,
        jidDecode,
        proto,
        Browsers,
    } = await loadBaileys()
    spin.update('Membaca sesi tersimpan...')
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    const store = makeSimpleStore()

    spin.update('Mengecek versi WhatsApp...')
    let WA_VERSION = [2, 3000, 1043857760]
    try {
        const { version } = await fetchLatestBaileysVersion()
        if (Array.isArray(version)) WA_VERSION = version
    } catch { /* pakai fallback */ }

    spin.update('Menghubungkan ke WhatsApp...')
    const bob = WASocket({
        logger: pino({ level: 'silent' }),
        version: WA_VERSION,
        syncFullHistory: false, // menerima riwayat lengkap
        markOnlineOnConnect: false, // membuat wa bot of, true jika ingin selalu menyala
        connectTimeoutMs: 60_000, // atur jangka waktu timeout
        defaultQueryTimeoutMs: 0, // atur jangka waktu query (0: tidak ada batas)
        keepAliveIntervalMs: 10000, // interval ws
        generateHighQualityLinkPreview: true, // menambah kualitas thumbnail preview
        browser: Browsers.macOS('Chrome'),
       // patch dibawah untuk tambahan jika hydrate/list tidak bekerja
        patchMessageBeforeSending: (message) => {

                const requiresPatch = !!(
                  message.buttonsMessage
              	  || message.templateMessage
              		|| message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
    },
    getMessage: async (key) => {
        if (store) {
           const msg = await store.loadMessage(key.remoteJid, key.id)
           return msg?.message || undefined
        }
        return {
           conversation: "hello, i'm Amirul Dev"
        }
     },
// get message diatas untuk mengatasi pesan gagal dikirim, "menunggu pesan", dapat dicoba lagi
        auth: state
    })

    store.bind(bob.ev)

    // ---- Pairing code custom "RSYA-RAFI" (ourin-baileys) ----
    // ourin-baileys hanya menerima 8 karakter tanpa tanda hubung,
    // jadi yang dikirim ke server: "RSYARAFI", tampil di terminal: "RSYA-RAFI".
    // Nomor bot diambil dari config.js (global.pairingNumber).
    let pairingRequested = false
    let pairingTries = 0
    const isRegistered = () => Boolean(
        (bob.authState && bob.authState.creds && bob.authState.creds.registered) ||
        (state.creds && state.creds.registered)
    )
    // Tunggu socket benar-benar terbuka sebelum request pairing code.
    // requestPairingCode saat WS belum open -> "Connection Closed".
    async function waitSocketOpen(timeoutMs = 25000) {
        const start = Date.now()
        while (Date.now() - start < timeoutMs) {
            try { if (bob.ws && bob.ws.isOpen) return true } catch {}
            await new Promise((r) => setTimeout(r, 500))
        }
        try { return !!(bob.ws && bob.ws.isOpen) } catch { return false }
    }
    async function maybeRequestPairingCode() {
        if (pairingRequested || isRegistered()) return
        pairingRequested = true
        try {
            const nomor = String(global.pairingNumber || '').replace(/\D/g, '')
            if (!nomor) throw new Error('Nomor bot kosong. Isi global.pairingNumber di config.js')
            const open = await waitSocketOpen(25000)
            if (isRegistered()) return
            if (!open) throw new Error('Socket belum terbuka (Connection Closed)')
            spin.stop()
            let code = null
            try {
                code = await bob.requestPairingCode(nomor, CUSTOM_PAIRING_RAW)
            } catch (e) {
                // 400/bad-request biasanya browser/non-kanonik atau kode dipakai; tampilkan jelas
                throw new Error('requestPairingCode ditolak server: ' + (e?.message || e))
            }
            pairingTries = 0
            banner.pairingBox(nomor, (code && formatPairingCode(code)) || CUSTOM_PAIRING_DISPLAY)
            spin.start('Menunggu verifikasi pairing di HP...')
        } catch (e) {
            pairingRequested = false
            pairingTries++
            banner.err('Gagal meminta pairing code: ' + (e?.message || e))
            if (pairingTries < 10 && !isRegistered()) {
                banner.dim(`Mencoba lagi... (${pairingTries}/10)`)
                spin.start('Menghubungkan ke WhatsApp...')
                setTimeout(() => { maybeRequestPairingCode() }, 8000)
            } else if (!isRegistered()) {
                spin.fail('Gagal pairing berkali-kali — cek nomor & koneksi lalu restart')
            }
        }
    }
    if (!isRegistered()) {
        // Dicoba saat socket mulai connecting; connection.update akan memicu lagi bila belum siap.
        setTimeout(() => { maybeRequestPairingCode() }, 3000)
    }
    

    bob.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return

        // === FITUR ANTI-DELETE OTOMATIS ===
        if (mek.message && mek.message.protocolMessage && (mek.message.protocolMessage.type === 0 || mek.message.protocolMessage.type === 14)) {
            const protoKey = mek.message.protocolMessage.key
            const remoteJid = protoKey?.remoteJid
            if (remoteJid && remoteJid.endsWith('@g.us')) {
                const gset = require('./lib/database').getGroup(remoteJid)
                if (gset && gset.antidelete) {
                    try {
                        const deleted = await store.loadMessage(remoteJid, protoKey.id)
                        if (deleted && deleted.message) {
                            const senderJid = protoKey.participant || deleted.key?.participant || mek.key?.participant
                            const senderNum = String(senderJid || '').split('@')[0].split(':')[0]
                            const timeStr = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })
                            const caption = `⚠️ *[ ANTI-DELETE ]*\n\n• Pengirim: @${senderNum}\n• Waktu: ${timeStr} WIB\n\n_Pesan yang dihapus:_`
                            await bob.sendMessage(remoteJid, { text: caption, mentions: senderJid ? [senderJid] : [] })
                            await bob.copyNForward(remoteJid, deleted, false)
                        }
                    } catch (e) {
                        console.log('[antidelete] Gagal teruskan pesan terhapus:', e?.message || e)
                    }
                }
            }
            return
        }
        if (!bob.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        if (mek.key.id.startsWith('Sya')) return
        m = smsg(bob, mek, store)
        require("./control.js")(bob, m, chatUpdate, store, welcome)
        } catch (err) {
            console.log(err)
        }
    })
    bob.ev.on('group-participants.update', async (data) => {
        try {
            const rawId = String(data?.id || '')
            const gid = rawId.endsWith('@g.us') ? rawId : (rawId ? rawId + '@g.us' : rawId)
            const gset = require('./lib/database').getGroup(gid)
            console.log(`[welcome] event action=${data?.action} id=${rawId} parts=${JSON.stringify(data?.participants).slice(0, 300)}`)
            console.log(`[welcome] flags welcome=${!!gset.welcome} left=${!!gset.left}`)
            await require('./lib/welcome').sendWelcomeGoodbye(bob, gid, data?.action, data?.participants)
            // Sinkronkan snapshot roster agar polling roster-diff (di bawah)
            // tidak menganggap join/leave yang sama sebagai kejadian baru -> cegah kirim 2x
            try {
                const joDB = require('./lib/database')
                const md = await bob.groupMetadata(gid).catch(() => null)
                if (md && md.participants) {
                    const g = joDB.getGroup(gid)
                    g.members = md.participants.map(p => String((p && p.id) || p)).filter(Boolean)
                    joDB.saveDB()
                }
            } catch {}
        } catch (e) {
            console.log('[welcome] error:', e?.message || e)
        }
    })

    // Fallback roster-diff: bila event stub tidak datang, deteksi join/leave
    // dengan membandingkan daftar member grup secara berkala.
    global.__jojoBob = bob
    if (!global.__welcomePoll) {
        global.__welcomePoll = true
        setInterval(async () => {
            const curBob = global.__jojoBob
            if (!curBob || global.__welcomePolling) return
            global.__welcomePolling = true
            try {
                const joDB = require('./lib/database')
                const wlib = require('./lib/welcome')
                const groups = (joDB.loadDB().groups) || {}
                for (const gid of Object.keys(groups)) {
                    const g = groups[gid]
                    if (!gid.endsWith('@g.us')) continue
                    if (!g.welcome && !g.left) continue
                    try {
                        const md = await curBob.groupMetadata(gid)
                        const cur = ((md && md.participants) || []).map(p => String((p && p.id) || p)).filter(Boolean)
                        const prev = Array.isArray(g.members) ? g.members : null
                        if (!prev) { g.members = cur; joDB.saveDB(); continue }
                        const joined = cur.filter(id => !prev.includes(id))
                        const leftMem = prev.filter(id => !cur.includes(id))
                        if (joined.length || leftMem.length) { g.members = cur; joDB.saveDB() }
                        if (joined.length && g.welcome) {
                            console.log(`[welcome-poll] +${joined.length} di ${gid}`)
                            await wlib.sendWelcomeGoodbye(curBob, gid, 'add', joined)
                        }
                        if (leftMem.length && g.left) {
                            console.log(`[welcome-poll] -${leftMem.length} di ${gid}`)
                            await wlib.sendWelcomeGoodbye(curBob, gid, 'remove', leftMem)
                        }
                    } catch (e) { /* grup diarsip/bot keluar: lewati */ }
                    await new Promise(r => setTimeout(r, 2000))
                }
            } catch (e) { console.log('[welcome-poll] error:', e?.message || e) }
            global.__welcomePolling = false
        }, 90000)
    }

    // Setting
    bob.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    bob.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = bob.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    bob.getName = (jid, withoutContact  = false) => {
        id = bob.decodeJid(jid)
        withoutContact = bob.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = bob.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === bob.decodeJid(bob.user.id) ?
            bob.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    bob.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await bob.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await bob.getName(i + '@s.whatsapp.net')}\nFN:${await bob.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:okeae2410@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	bob.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    bob.public = true

    bob.serializeM = (m) => smsg(bob, m, store)

    // Anti reconnect ganda: hanya satu restart tertunda dalam satu waktu
    function scheduleReconnect(delayMs = 4000) {
        if (global.__jojoRestarting) return
        global.__jojoRestarting = true
        setTimeout(() => { global.__jojoRestarting = false; startBot() }, delayMs)
    }

    bob.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr, receivedPendingNotifications } = update
        // ourin-baileys: event `qr` tetap dipancarkan dalam mode pairing code,
        // jadi jadikan pemicu permintaan kode custom "RSYA-RAFI".
        if ((qr || connection === 'connecting') && !isRegistered()) {
            spin.update('Menghubungkan ke WhatsApp...')
            await maybeRequestPairingCode()
        }
        if (connection === 'connecting') {
            spin.start('Menghubungkan ke WhatsApp...')
        }
        if (receivedPendingNotifications) {
            banner.dim('Sinkronisasi riwayat selesai')
        }
        if (connection === 'open') {
            const me = ((bob.user && bob.user.id) || '').split(':')[0].split('@')[0] || '-'
            spin.succeed(`Terhubung sebagai ${me}`)
            banner.statusBox('JOJOBOT ONLINE  •  By Arasya', [
                ['Nomor Bot', me],
                ['Waktu', banner.wib()],
                ['Pairing', global.pairingCode || 'RSYA-RAFI'],
            ], 'green')
        }
        if (connection === 'close') {
        // Error polos (mis. "Connection Failure" dari WebSocket) TIDAK punya
        // statusCode asli — jangan samakan dengan badSession (sama-sama 500).
        // Hanya error Boom asli dari server yang boleh memicu logout.
        const rawErr = lastDisconnect?.error
        const reason = (rawErr && rawErr.isBoom && rawErr.output) ? rawErr.output.statusCode : undefined
        const errMsg = (rawErr && (rawErr.message || rawErr.output?.payload?.message)) || 'unknown'
            // Fatal: jangan reconnect, wajib pairing/scan ulang
            if (reason === DisconnectReason.badSession) { spin.fail('Bad Session — hapus folder session & pairing ulang'); try { await bob.logout() } catch {} }
            else if (reason === DisconnectReason.loggedOut) {
                // Sesi mati/rusak: bersihkan folder session lalu mulai fresh
                // (setara hapus session manual). Jangan bob.logout() buta.
                spin.fail('Sesi ditolak server — membersihkan session & pairing ulang fresh...');
                try { fs.rmSync('./session', { recursive: true, force: true }) } catch {}
                try { fs.mkdirSync('./session', { recursive: true }) } catch {}
                spin.start('Menghubungkan ulang fresh...')
                scheduleReconnect(5000)
            }
        else if (reason === DisconnectReason.connectionReplaced) { spin.fail('Koneksi digantikan sesi lain — tutup sesi lain dulu'); try { await bob.logout() } catch {} }
        else if (reason === DisconnectReason.Multidevicemismatch) { spin.fail('Multi-device mismatch — pairing ulang'); try { await bob.logout() } catch {} }
        // Selain itu (termasuk error polos "Connection Failure"): reconnect dengan jeda
        else {
            const label = reason === DisconnectReason.connectionClosed ? 'Koneksi tertutup'
                : reason === DisconnectReason.connectionLost ? 'Koneksi hilang dari server'
                : reason === DisconnectReason.restartRequired ? 'Restart diminta server'
                : reason === DisconnectReason.timedOut ? 'Koneksi timeout'
                : `Koneksi putus (${errMsg})`
            banner.warn(`${label}, menghubungkan ulang...`)
            spin.start('Menghubungkan ulang...')
            scheduleReconnect(4000)
        }
        }
    })

    bob.ev.on('creds.update', saveCreds)

    // Add Other
      
      /** Resize Image
      *
      * @param {Buffer} Buffer (Only Image)
      * @param {Numeric} Width
      * @param {Numeric} Height
      */
    
      bob.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      }
      // Siapa yang cita-citanya pakai resize buat keliatan thumbnailnya
      

      /**
      *
      * @param {*} jid
      * @param {*} url
      * @param {*} caption
      * @param {*} quoted
      * @param {*} options
      */
    bob.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return bob.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return bob.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return bob.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return bob.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return bob.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }

    /** Send List Messaage
      *
      *@param {*} jid
      *@param {*} text
      *@param {*} footer
      *@param {*} title
      *@param {*} butText
      *@param [*] sections
      *@param {*} quoted
      */
        bob.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        bob.sendMessage(jid, listMes, { quoted: quoted })
        }

    /** Send Button 5 Message
     * 
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} button
     * @returns 
     */
        bob.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        bob.sendMessage(jid, templateMessage)
        }

    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    bob.send5ButImg = async (jid , text = '' , footer = '', img, but = [], buff, options = {}) =>{
    bob.sendMessage(jid, { image: img, caption: text, footer: footer, templateButtons: but, ...options })
    }

      /** Send Button 5 Location
       *
       * @param {*} jid
       * @param {*} text
       * @param {*} footer
       * @param {*} location
       * @param [*] button
       * @param {*} options
       */
      bob.send5ButLoc = async (jid , text = '' , footer = '', lok, but = [], options = {}) =>{
      let bb = await bob.reSize(lok, 300, 150)
      bob.sendMessage(jid, { location: { jpegThumbnail: bb }, caption: text, footer: footer, templateButtons: but, ...options })
      }

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    bob.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], buff, options = {}) =>{
    let lol = await bob.reSize(buf, 300, 150)
    bob.sendMessage(jid, { video: vid, jpegThumbnail: lol, caption: text, footer: footer, templateButtons: but, ...options })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    bob.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], buff, options = {}) =>{
    let ahh = await bob.reSize(buf, 300, 150)
    let a = [1,2]
    let b = a[Math.floor(Math.random() * a.length)]
    bob.sendMessage(jid, { video: gif, gifPlayback: true, gifAttribution: b, caption: text, footer: footer, jpegThumbnail: ahh, templateButtons: but, ...options })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    bob.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        bob.sendMessage(jid, buttonMessage, { quoted, ...options })
    }

    bob.sendButton = async(jid, body_teks, footer_teks, header_teks, list_button) => {
        let msg = generateWAMessageFromContent(jid, {
   viewOnceMessage: {
     message: {
         "messageContextInfo": {
           "deviceListMetadata": {},
           "deviceListMetadataVersion": 2
         },
         interactiveMessage: proto.Message.InteractiveMessage.create({
           body: proto.Message.InteractiveMessage.Body.create({
             text: body_teks
           }),
           footer: proto.Message.InteractiveMessage.Footer.create({
             text: footer_teks
           }),
           header: proto.Message.InteractiveMessage.Header.create({
             title: header_teks,
             subtitle: "test",
             hasMediaAttachment: false
           }),
           nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
             buttons: list_button,
           })
         })
     }
   }
 }, {})
 
 await bob.relayMessage(jid, msg.message, {
   messageId: msg.key.id
 })
 }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendText = (jid, text, quoted = '', options) => bob.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await bob.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await bob.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    bob.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await bob.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendTextWithMentions = async (jid, text, quoted, options = {}) => bob.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await bob.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await bob.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    bob.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    bob.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bob.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await bob.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await bob.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    bob.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await bob.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    bob.sendListButtonv2 = async (jid, text, list, footer, image, quoted, options = {}) => {
      let msg000 = generateWAMessageFromContent(jid, {viewOnceMessage: {
          message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: text, 
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: footer, 
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                      name: "single_select",
                      buttonParamsJson: JSON.stringify(list)
                    }
                 ],
                }), 
                contextInfo: {
                        mentionedJid: [m.sender], 
                        forwardingScore: 999,
                        isForwarded: true
                      }
              })
          }
        }
      }, {userJid: m.chat, quoted: m})
      bob.relayMessage(msg000.key.remoteJid, msg000.message, {
        messageId: msg000.key.id, quoted: m,
        })
        }

    bob.cMod = (jid, copy, text = '', sender = bob.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === bob.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    bob.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                       
                // respon polling
                
async function getMessage(key) {
    if (store) {
        const smsg = await store.loadMessage(key.remoteJid, key.id)
        return smsg?.message
    }  
    return {
        conversation: "@arsrfii"
    }  
}       
                
bob.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return bob.sendMessage(jid, { poll: { name, values, selectableCount }}) }               

//*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//  

    return bob
}

startBot()


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update ${__filename}`)
	delete require.cache[file]
	require(file)
})
