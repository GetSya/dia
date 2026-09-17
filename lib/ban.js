// Fitur BAN user / BAN group (soft-ban database) + helper resolve target.
// Beda dengan #block (hard-block WhatsApp via updateBlockStatus):
//  - ban user  = bot mengabaikan semua pesan/command dari user (owner tetap bisa #unban)
//  - ban group = bot mengabaikan semua pesan/command di grup (owner tetap bisa #unbangroup)
// Data tersimpan di database.json -> { bannedUsers: {}, bannedGroups: {} } agar persisten + ikut sync.
const joDatabase = require('./database')

function ensureStore() {
    const db = joDatabase.loadDB()
    if (!db.bannedUsers) db.bannedUsers = {}
    if (!db.bannedGroups) db.bannedGroups = {}
    return db
}

// Ambil digit nomor dari JID / string apa pun. 08xx -> 62xx.
function normNum(v) {
    let n = String(v || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (n.startsWith('08')) n = '62' + n.slice(1)
    return n
}

// Cari target dari mention / reply / argumen nomor.
function resolveTarget({ mentionUser, quoted, args }) {
    if (mentionUser && mentionUser.length) return mentionUser[0]
    if (quoted && quoted.sender) return quoted.sender
    const raw = String((args || []).join(' ').split('|')[0] || '').replace(/[^0-9]/g, '')
    if (raw.length >= 9) {
        let n = raw
        if (n.startsWith('08')) n = '62' + n.slice(1)
        else if (n.startsWith('8')) n = '62' + n
        // nomor tanpa 62 di depan tapi panjang wajar -> anggap 62...
        else if (!n.startsWith('62')) n = n
        // default ke s.whatsapp.net; LID tetap ter-handle karena cek via normNum
        return n + '@s.whatsapp.net'
    }
    return null
}

function isOwnerJid(jid, ownerNums, senderNums) {
    const n = normNum(jid)
    if (!n) return false
    return (ownerNums || []).includes(n) || (senderNums || []).includes(n) && false
}

// ===== BAN USER =====
function isUserBanned(jidOrNum, extraNums) {
    const db = ensureStore()
    const cands = [normNum(jidOrNum), ...((extraNums || []).map(normNum))].filter(Boolean)
    return cands.some(n => !!db.bannedUsers[n])
}

function getUserBan(jidOrNum) {
    const db = ensureStore()
    return db.bannedUsers[normNum(jidOrNum)] || null
}

function banUser(targetJid, { reason = '', by = '' } = {}) {
    const db = ensureStore()
    const n = normNum(targetJid)
    if (!n || n.length < 9) throw new Error('Nomor target tidak valid')
    const isNew = !db.bannedUsers[n]
    db.bannedUsers[n] = { number: n, jid: String(targetJid), reason: String(reason || '').slice(0, 200), by: String(by || ''), at: new Date().toISOString() }
    joDatabase.saveDB()
    return { isNew, ban: db.bannedUsers[n] }
}

function unbanUser(targetJid) {
    const db = ensureStore()
    const n = normNum(targetJid)
    if (!db.bannedUsers[n]) return false
    delete db.bannedUsers[n]
    joDatabase.saveDB()
    return true
}

function listBannedUsers() {
    return Object.values(ensureStore().bannedUsers || {})
}

// ===== BAN GROUP =====
function isGroupBanned(gid) {
    if (!gid) return false
    return !!ensureStore().bannedGroups[String(gid)]
}

function getGroupBan(gid) {
    return ensureStore().bannedGroups[String(gid)] || null
}

function banGroup(gid, { reason = '', by = '' } = {}) {
    const db = ensureStore()
    const id = String(gid)
    if (!id.endsWith('@g.us')) throw new Error('Perintah ini hanya untuk grup')
    const isNew = !db.bannedGroups[id]
    db.bannedGroups[id] = { gid: id, reason: String(reason || '').slice(0, 200), by: String(by || ''), at: new Date().toISOString() }
    joDatabase.saveDB()
    return { isNew, ban: db.bannedGroups[id] }
}

function unbanGroup(gid) {
    const db = ensureStore()
    const id = String(gid)
    if (!db.bannedGroups[id]) return false
    delete db.bannedGroups[id]
    joDatabase.saveDB()
    return true
}

function listBannedGroups() {
    return Object.values(ensureStore().bannedGroups || {})
}

module.exports = {
    normNum, resolveTarget,
    isUserBanned, getUserBan, banUser, unbanUser, listBannedUsers,
    isGroupBanned, getGroupBan, banGroup, unbanGroup, listBannedGroups,
}
