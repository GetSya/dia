// ============================================================
//  AUTO MENU — const menuku terisi otomatis dari switch-case.
// ------------------------------------------------------------
//  CARA PAKAI (saat tambah case baru):
//  1. Letakkan case di bawah marker kategori yang sesuai:
//       // ===== MENU:Other Menu =====
//       // ===== MENU:Game Menu =====
//       // ===== MENU:Poin Menu =====
//       // ===== MENU:Owner Menu =====
//       // ===== MENU:Group Menu =====
//     -> command langsung muncul di kategori itu.
//  2. Label yang dipakai = label case PERTAMA
//     (mis. `case 'dadu': case 'dice':` -> "dadu").
//  3. Tambah deskripsi opsional di ujung baris case:
//       case 'myfitur': { // desc: <isi argumen>
//  4. Command internal (eval, dsb) otomatis disembunyikan
//     via SKIP di bawah. Kategori tanpa marker = Other Menu.
// ============================================================
const fs = require('fs')
const path = require('path')

const CONTROL_PATH = path.join(__dirname, '..', 'control.js')

// Command yang ada case-nya tapi JANGAN tampil di menu
const SKIP = new Set([
    'menu', 'help', 'allmenu', 'owner1',
    'button', 'btn', 'on', 'vn',
    'x', '>', '$', 'cheatbalance', 'buylimit', 'buypoin',
    'topbalance', 'addprem', 'esrgan',
    // Blok statis di bawah (sudah ditulis manual)
    'sewa', 'sewabot', 'donasi', 'donate', 'rules',
    'login', 'register', 'reg-on',
    'setcmd', 'delcmd', 'listcmd', 'lockcmd', 'unlockcmd',
    'ww', 'werewolf'
])

// Paksa kategori (untuk case yang posisinya di region marker lain)
const FORCE_CAT = {
    'qr': 'Other Menu',
    'cekprem': 'Other Menu',
    'listprem': 'Other Menu',
    'resetpoin': 'Owner Menu',
    'ai': 'Other Menu',
    'editimg': 'Other Menu',
    'chatai': 'Other Menu',
    'chatbot': 'Other Menu',
    'qc': 'Other Menu',
    'delete': 'Other Menu',
    'stalkig': 'Other Menu',
    'igdl': 'Group Menu',
    'tiktok': 'Group Menu',
    'tiktokmp3': 'Group Menu',
    'ytmp3': 'Group Menu',
    'ytmp4': 'Group Menu',
    'play': 'Group Menu',
    'antidelete': 'Group Menu',
    'setwelcome': 'Group Menu',
    'join': 'Owner Menu',
    'leave': 'Owner Menu'
}

// Urutan tampil per kategori (snapshot. Case baru otomatis nempel di AKHIR kategorinya)
const ORDER = {
    'Other Menu': ['quotes', 'pinterest', 'ppcp', 'tomp3', 'sholat', 'waifu', 'emojimix', 'delete', 'tourl', 'menfess', 'confess', 'sticker', 'stcmeme', 'stcmeme2', 'memegen', 'meme', 'bajingan', 'brat', 'toimg', 'ssweb', 'removebg', 'qc', 'remini', 'stalkig', 'take', 'tts', 'listprem', 'cekprem', 'chatbot', 'ai', 'editimg', 'translate', 'google', 'qr', 'encode', 'decode', 'buyprem'],
    'Game Menu': ['tebakgambar', 'caklontong', 'tebakkata', 'siapakahaku', 'tebaklagu', 'tebakkimia', 'soal', 'tod', 'dadu'],
    'Poin Menu': ['poin', 'top'],
    'Owner Menu': ['setpp', 'setexif', 'join', 'leave', 'addplugins', 'deleteplugins', 'public', 'self', 'create-token', 'unblock', 'resetpoin', 'backup', 'dbsync'],
    'Group Menu': ['setppgc', 'mute', 'welcome', 'left', 'setwelcome', 'antilink', 'antidelete', 'hidetag', 'tagall', 'kick', 'add', 'setname', 'setdesc', 'open', 'close', 'totag', 'promote', 'demote', 'igdl', 'tiktokmp3', 'play', 'ytmp3', 'ytmp4']
}

// Deskripsi per command (tanpa emoji, sesuai aturan menuku)
const DESC = {
    'sms': ' <Nomor|Pesan|Jumlah>', 'quotes': ' ', 'pinterest': ' _< Pencarian >_',
    'ppcp': '', 'tomp3': '', 'sholat': ' _< Nama Kota >_', 'waifu': '',
    'emojimix': ' <emoji+emoji>', 'delete': ' <Reply Bot Message>', 'tourl': ' <Reply Image>',
    'menfess': ' <628XX|Text>', 'confess': ' <628XX|Pesan>',
    'sticker': ' <Reply Image>', 'stcmeme': ' <Text Top|Text Bottom>', 'stcmeme2': ' <Text>',
    'memegen': ' <Reply Image>', 'meme': '', 'bajingan': ' <Text>', 'brat': ' <teks>',
    'toimg': ' <Reply Sticker>', 'ssweb': ' <Link>', 'removebg': ' <Reply Image>',
    'qc': ' <Text>', 'remini': ' <Reply Image>', 'stalkig': ' username',
    'igdl': ' <link reels/post>', 'take': ' <PackName|Author>', 'tts': ' <Text>',
    'listprem': '', 'cekprem': '', 'chatbot': ' < on/off >', 'ai': ' < Text >',
    'editimg': ' <prompt> (reply foto)', 'translate': ' < Reply Message >',
    'google': ' < Search >', 'qr': ' < Text >', 'encode': ' < Text >', 'decode': ' < Text >',
    'play': ' <judul lagu>', 'ytmp3': ' <link youtube>', 'ytmp4': ' <link youtube>',
    'tiktokmp3': ' <link tiktok>', 'buyprem': '',
    'setpp': ' <Reply Image>', 'setexif': ' <PackName|Author>',
    'join': ' <WhatsApp Group Link>', 'leave': '', 'addplugins': '', 'deleteplugins': '',
    'public': '', 'self': '', 'create-token': '', 'unblock': ' <628XXX>',
    'resetpoin': '', 'backup': '', 'dbsync': '',
    'setppgc': ' <Reply Image>', 'mute': '', 'welcome': ' <on/off>', 'left': ' <on/off>',
    'setwelcome': ' <teks (@user @group @date)>', 'antidelete': ' <on/off>',
    'antilink': ' <Enable/Disable>', 'hidetag': ' <Text>', 'tagall': ' <Message>',
    'kick': ' <Reply Message>', 'add': ' <Reply Message>', 'setname': ' <Text>',
    'setdesc': ' <Text>', 'open': '', 'close': '',
    'totag': ' <Reply Image/Text/Video/Sticker/Audio>', 'promote': ' <Reply Message>',
    'demote': ' <Reply Message>', 'poin': '', 'top': '',
    'mancing': '', 'inventory': '', 'buyumpan': ' [nama] [qty]',
    'buangumpan': '', 'pindah': ' [lokasi]', 'jualikan': ' [bot/@user]',
    'rodinfo': '', 'repairing': '', 'statmancing': '', 'daftarikan': ' [lokasi]'
}

// Baris kustom: {p} = prefix. Tanpa {p} = verbatim (tanpa prefix).
const CUSTOM_FIRST_OTHER = ['{p}sms <Nomor|Pesan|Jumlah>']
const CUSTOM_AFTER = {
    'Other Menu': {
        'ai': ['Tag @bot <tanya AI otomatis>'],
        'google': ['{p}jo < Text >']
    },
    'Game Menu': {
        'dadu': ['{p}ww create|join|leave|start', '{p}ww vote|kill|info|stats', '{p}ww leaderboard']
    },
    'Group Menu': {
        'mute': ['{p}unmute'],
        'setdesc': ['{p}open']
    }
}
const ANON_SET = new Set(['start', 'stop', 'next'])
const ANON_LINE = '{p}start|next|stop <Anonymous Chat>'

// Blok statis (tidak berubah otomatis)
function staticMain(p) {
    return `╔══ 『 Main Menu 』
║
║- ${p}sewa
║- ${p}owner
║- ${p}login
║- ${p}register
║- ${p}rules
║
╚════╝`
}
function staticSticker(p) {
    return `╔══ 『 Sticker Cmd Menu 』
║- ${p}setcmd <teks> (reply stiker)
║- ${p}delcmd (reply stiker)
║- ${p}listcmd
║- ${p}lockcmd|unlockcmd (reply stiker)
╚════╝`
}

// ---- Scanner: kumpulkan {label, desc, cat} sesuai urutan file ----
let _cache = null
function scanCases() {
    let src = ''
    try { src = fs.readFileSync(CONTROL_PATH, 'utf8') } catch { return [] }
    const key = src.length + ':' + src.slice(0, 200)
    if (_cache && _cache.key === key) return _cache.rows
    const rows = []
    let category = 'Other Menu'
    let pending = [] // label-label stacked yang terkumpul
    let inBlockComment = false
    const flush = () => {
        if (!pending.length) return
        const labels = pending.map(x => x.label)
        const first = labels[0]
        const descOverride = pending[0].desc
        pending = []
        if (SKIP.has(first)) return
        rows.push({ label: first, labels, cat: FORCE_CAT[first] || category, desc: descOverride || null })
    }
    const caseOnlyRe = /^\s*(?:case\s+'[^']+'\s*:?\s*)+\{?\s*$/
    for (const rawLine of src.split('\n')) {
        let line = rawLine
        if (inBlockComment) {
            if (line.includes('*/')) {
                line = line.slice(line.indexOf('*/') + 2)
                inBlockComment = false
            } else continue
        }
        // cari /* yang valid: abaikan bila ada // sebelumnya di baris yang sama
        // (mis. `//** ...` atau `... ./json/* ...` bukan pembuka komentar)
        let bi = -1
        if (!inBlockComment) {
            bi = line.indexOf('/*')
            const li = line.indexOf('//')
            if (bi !== -1 && li !== -1 && li < bi) bi = -1
        }
        if (bi !== -1) {
            const ei = line.indexOf('*/', bi + 2)
            if (ei === -1) { line = line.slice(0, bi); inBlockComment = true }
            else line = line.slice(0, bi) + line.slice(ei + 2)
        }
        const trimmed = line.trim()
        if (!trimmed) continue
        const mk = line.match(/\/\/\s*===== MENU:(.+?) =====/)
        if (mk) { flush(); category = mk[1].trim(); continue }
        if (trimmed.startsWith('//')) continue
        const labels = [...line.matchAll(/case\s+'([^']+)'/g)].map(m => m[1])
        if (!labels.length) { flush(); continue }
        // desc opsional di ujung baris: // desc: ... (\r? untuk file CRLF)
        let desc = null
        const dm = line.match(/\/\/\s*desc:(.+?)\r?$/)
        if (dm) desc = dm[1].trim()
        // abaikan komentar trailing agar baris case tetap dikenali
        const codePart = line.replace(/\s*\/\/.*$/, '')
        if (caseOnlyRe.test(codePart)) {
            for (const lb of labels) pending.push({ label: lb, desc: pending.length === 0 ? desc : null })
            if (/\{/.test(codePart)) flush()
            continue
        }
        // baris case bercampur kode lain: ambil labelnya, langsung flush
        flush()
        if (!SKIP.has(labels[0])) rows.push({ label: labels[0], labels, cat: FORCE_CAT[labels[0]] || category, desc });
    }
    flush()
    _cache = { key, rows }
    return rows
}

// ---- Bangun blok-blok menu ----
function buildMenuSections(prefix) {
    const rows = scanCases()
    // dedupe: label pertama menang
    const seen = new Set()
    const uniq = rows.filter(r => {
        if (seen.has(r.label)) return false
        seen.add(r.label)
        return true
    })
    const cats = ['Other Menu', 'Game Menu', 'Poin Menu', 'Owner Menu', 'Group Menu']
    const byCat = {}
    for (const c of cats) byCat[c] = []
    for (const r of uniq) {
        if (!byCat[r.cat]) byCat[r.cat] = []
        byCat[r.cat].push(r)
    }
    const out = []
    out.push(staticMain(prefix))
    for (const cat of cats) {
        let list = byCat[cat] || []
        // gabung baris anonymous yang berurutan -> satu baris
        const merged = []
        let anonRun = []
        const flushAnon = () => {
            if (!anonRun.length) return
            const set = new Set(anonRun.map(r => r.label))
            if (set.has('start') && set.has('stop') && set.has('next') && anonRun.every(r => ANON_SET.has(r.label))) {
                merged.push({ label: ANON_LINE.split(' ')[0], custom: ANON_LINE })
            } else {
                for (const r of anonRun) merged.push(r)
            }
            anonRun = []
        }
        for (const r of list) {
            if (ANON_SET.has(r.label)) anonRun.push(r)
            else { flushAnon(); merged.push(r) }
        }
        flushAnon()
        // urutkan sesuai ORDER, yang baru nempel di akhir
        const order = ORDER[cat] || []
        const rank = (lb) => { const i = order.indexOf(lb); return i === -1 ? 1e9 : i }
        merged.sort((a, b) => {
            const rankOf = (r) => r.custom ? 1e9 : rank(r.label)
            return rankOf(a) - rankOf(b)
        })
        // catatan: sort stabil -> yang tak dikenal tetap urutan file di akhir
        const paint = (t) => `║- ${t.split('{p}').join(prefix)}`
        const lines = []
        const customs = CUSTOM_AFTER[cat] || {}
        const pushRow = (r) => {
            if (r.custom) { lines.push(paint(r.custom)); return }
            const d = r.desc != null ? (r.desc.startsWith(' ') ? r.desc : ' ' + r.desc) : (DESC[r.label] != null ? DESC[r.label] : '')
            lines.push(`║- ${prefix}${r.label}${d}`)
        }
        if (cat === 'Other Menu' && CUSTOM_FIRST_OTHER) {
            for (const t of CUSTOM_FIRST_OTHER) lines.push(paint(t))
        }
        // baris anonymous digabung ditaruh tepat setelah 'confess'
        const anonRow = merged.find(r => r.custom)
        const rest = merged.filter(r => !r.custom)
        for (const r of rest) {
            pushRow(r)
            const key = r.label
            if (key === 'confess' && anonRow) pushRow(anonRow)
            if (customs[key]) for (const t of customs[key]) lines.push(paint(t))
        }
        if (anonRow && !rest.some(r => r.label === 'confess')) pushRow(anonRow)
        out.push(`╔══ 『 ${cat} 』\n${lines.join('\n')}\n╚════╝`)
    }
    out.push(staticSticker(prefix))
    return { text: out.join('\n\n'), prefix }
}

function renderMenuSections(prefix) {
    return buildMenuSections(prefix).text
}

module.exports = { buildMenuSections, renderMenuSections, scanCases, SKIP, ORDER, DESC }
