const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, '..', 'database.json')

let cache = null
let saveTimer = null

function loadDB() {
    if (cache) return cache
    try {
        if (!fs.existsSync(DB_PATH)) {
            cache = { users: {}, sticker: {}, groups: {}, createdAt: new Date().toISOString() }
            fs.writeFileSync(DB_PATH, JSON.stringify(cache, null, 2))
        } else {
            const raw = fs.readFileSync(DB_PATH, 'utf8').trim()
            cache = raw ? JSON.parse(raw) : { users: {}, sticker: {}, groups: {} }
            if (!cache.users) cache.users = {}
            if (!cache.sticker) cache.sticker = {}
            if (!cache.groups) cache.groups = {}
        }
    } catch (e) {
        console.log('[database] load gagal:', e.message)
        cache = { users: {}, sticker: {}, groups: {} }
    }
    // hydrate global for compatibility with older handlers
    if (!global.db) global.db = { data: {} }
    global.db.data.users = cache.users
    global.db.data.sticker = cache.sticker
    if (!global.db.data.users) global.db.data.users = cache.users
    return cache
}

function saveDB(immediate = false) {
    if (!cache) return
    const doSave = () => {
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(cache, null, 2))
        } catch (e) { console.log('[database] save gagal:', e.message) }
    }
    if (immediate) { if (saveTimer) clearTimeout(saveTimer); saveTimer = null; doSave(); return }
    if (saveTimer) return
    saveTimer = setTimeout(() => { saveTimer = null; doSave() }, 800)
}

function addUser(jid, pushname = '', chatId = '') {
    const db = loadDB()
    if (!jid || jid.includes('@g.us') || jid.includes('status@')) return false
    const num = jid.split('@')[0]
    const now = new Date().toISOString()
    const isNew = !db.users[jid]
    if (!db.users[jid]) {
        db.users[jid] = { jid, number: num, name: pushname || num, firstSeen: now, lastSeen: now, hits: 1, chats: chatId ? [chatId] : [] }
    } else {
        const u = db.users[jid]
        u.lastSeen = now
        u.hits = (u.hits || 0) + 1
        if (pushname && pushname !== 'No Name' && u.name !== pushname) u.name = pushname
        if (chatId && !u.chats) u.chats = []
        if (chatId && u.chats && !u.chats.includes(chatId) && u.chats.length < 20) u.chats.push(chatId)
    }
    saveDB(isNew)
    return isNew
}

function getAllUsers() { return loadDB().users }
function getUserCount() { return Object.keys(loadDB().users).length }

// ========== SETTING GRUP (welcome/left/antilink/mute/chatbot/antimedia) ==========
const ANTIMEDIA_DEFAULT = { gambar: false, audio: false, video: false, document: false, vn: false, sticker: false }
function normalizeAntimedia(v) {
    const out = { ...ANTIMEDIA_DEFAULT }
    if (v && typeof v === 'object') {
        for (const k of Object.keys(ANTIMEDIA_DEFAULT)) {
            if (typeof v[k] === 'boolean') out[k] = v[k]
        }
    }
    return out
}

function getGroup(jid) {
    const db = loadDB()
    if (!db.groups) db.groups = {}
    if (!jid) return {}
    if (!db.groups[jid]) {
        db.groups[jid] = { welcome: false, left: false, antilink: false, mute: false, chatbot: false, chatbotMode: 'text', antidelete: false, welcomeText: '', leftText: '', antimedia: { ...ANTIMEDIA_DEFAULT } }
    }
    if (typeof db.groups[jid].antidelete === 'undefined') db.groups[jid].antidelete = false
    if (typeof db.groups[jid].welcomeText === 'undefined') db.groups[jid].welcomeText = ''
    if (typeof db.groups[jid].leftText === 'undefined') db.groups[jid].leftText = ''
    if (db.groups[jid].chatbotMode !== 'vn' && db.groups[jid].chatbotMode !== 'text') db.groups[jid].chatbotMode = db.groups[jid].chatbot ? 'text' : 'text'
    db.groups[jid].antimedia = normalizeAntimedia(db.groups[jid].antimedia)
    return db.groups[jid]
}

function setGroup(jid, patch) {
    if (!jid) return {}
    const g = getGroup(jid)
    Object.assign(g, patch)
    saveDB()
    return g
}

// Migrasi sekali dari file legacy assets/db/*.json ke database.json
let _migratedGroups = false
function migrateLegacyGroups() {
    if (_migratedGroups) return
    _migratedGroups = true
    try {
        const db = loadDB()
        if (db._migratedGroups) return
        const base = path.join(__dirname, '..', 'assets', 'db')
        const readArr = (p) => {
            try {
                const v = JSON.parse(fs.readFileSync(p, 'utf8'))
                return Array.isArray(v) ? v : []
            } catch { return [] }
        }
        // grup yang welcome-nya aktif -> welcome+left aktif (pertahankan perilaku lama)
        for (const jid of readArr(path.join(base, 'welcome.json'))) {
            getGroup(jid).welcome = true
            getGroup(jid).left = true
        }
        for (const jid of readArr(path.join(base, 'antilink.json'))) getGroup(jid).antilink = true
        for (const jid of readArr(path.join(base, 'mute.json'))) getGroup(jid).mute = true
        for (const jid of readArr(path.join(base, 'chatbot.json'))) getGroup(jid).chatbot = true
        db._migratedGroups = true
        saveDB(true)
        console.log('[database] migrasi setting grup selesai')
    } catch (e) { console.log('[database] migrasi grup gagal:', e.message) }
}

// init on require
loadDB()
migrateLegacyGroups()

module.exports = { loadDB, saveDB, addUser, getAllUsers, getUserCount, getGroup, setGroup, migrateLegacyGroups, DB_PATH }
