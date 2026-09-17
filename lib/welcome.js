// Logika welcome/goodbye terpusat (dipakai index.js, polling, dan command test).
// Flag on/off tetap di database.json -> groups (joDatabase).
const joDatabase = require('./database')

// Dedup kirim ganda: event group-participants.update + polling roster (index.js)
// bisa mendeteksi join/leave yang SAMA. Kunci per peserta dengan TTL.
const _handled = new Map() // key `${gid}|${action}|${num}` -> timestamp
const HANDLED_TTL = 5 * 60 * 1000 // 5 menit
function handledKey(gid, action, num) { return `${gid}|${action}|${num}` }
function wasHandled(gid, action, num) {
    const k = handledKey(gid, action, num)
    const t = _handled.get(k)
    if (!t) return false
    if (Date.now() - t > HANDLED_TTL) { _handled.delete(k); return false }
    return true
}
function markHandled(gid, action, num) {
    _handled.set(handledKey(gid, action, num), Date.now())
    if (_handled.size > 2000) {
        const now = Date.now()
        for (const [k, v] of _handled) if (now - v > HANDLED_TTL) _handled.delete(k)
    }
}

// Normalisasi 1 peserta: string JID atau objek {lid,pn,phoneNumber,...}
// -> { jid (untuk mentions), rawJid, num, pushName } | null
async function resolveParticipant(bob, p) {
    try {
        if (!p) return null
        let jid = null
        let pushName = null
        if (typeof p === 'string') {
            jid = p
        } else if (typeof p === 'object') {
            jid = p.pn || p.phoneNumber || p.lid || p.jid || p.id || null
            pushName = p.pushName || p.notify || p.name || null
        }
        if (!jid) return null
        jid = String(jid)
        let pn = null
        if (jid.endsWith('@lid')) {
            try {
                if (bob && bob.signalRepository && bob.signalRepository.lidMapping && bob.signalRepository.lidMapping.getPNForLID) {
                    pn = await bob.signalRepository.lidMapping.getPNForLID(jid).catch(() => null)
                }
            } catch {}
        }
        let useJid = jid
        if (pn) {
            try { useJid = (bob.decodeJid ? bob.decodeJid(pn) : pn) || pn } catch { useJid = pn }
        }
        const num = String(pn || jid).split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
        if (!num) return null
        return { jid: useJid, rawJid: jid, num, pushName }
    } catch { return null }
}

// Cari nama pengguna asli dari berbagai sumber (pushName, DB, contacts, getName)
async function resolveParticipantName(bob, r, opts = {}) {
    // 1. Dari opsi eksplisit (contoh: command test atau opts)
    if (opts.pushname && opts.pushname !== 'No Name' && opts.pushname !== 'undefined') return opts.pushname
    if (opts.name && opts.name !== 'No Name' && opts.name !== 'undefined') return opts.name

    // 2. Dari objek participant
    if (r.pushName && r.pushName !== 'No Name' && !/^[\+0-9\s\-]+$/.test(r.pushName)) return r.pushName

    // 3. Dari database.json (joDatabase)
    try {
        const allUsers = joDatabase.getAllUsers() || {}
        const candidates = [r.rawJid, r.jid, `${r.num}@s.whatsapp.net`].filter(Boolean)
        for (const k of candidates) {
            const u = allUsers[k]
            if (u && u.name && u.name !== 'No Name' && !/^[\+0-9\s\-]+$/.test(u.name)) {
                return u.name
            }
        }
        const match = Object.values(allUsers).find(u => u && (u.number === r.num || (u.jid && u.jid.startsWith(r.num))))
        if (match && match.name && match.name !== 'No Name' && !/^[\+0-9\s\-]+$/.test(match.name)) {
            return match.name
        }
    } catch {}

    // 4. Dari global.store contacts
    try {
        const store = global.store
        if (store && store.contacts) {
            const candidates = [r.rawJid, r.jid, `${r.num}@s.whatsapp.net`].filter(Boolean)
            for (const k of candidates) {
                const c = store.contacts[k]
                const n = c?.name || c?.notify || c?.verifiedName
                if (n && typeof n === 'string' && n.trim() && !/^[\+0-9\s\-]+$/.test(n.trim())) {
                    return n.trim()
                }
            }
        }
    } catch {}

    // 5. Dari bob.getName
    try {
        if (bob && typeof bob.getName === 'function') {
            const n = (await bob.getName(r.jid)) || (await bob.getName(r.rawJid))
            if (n && typeof n === 'string') {
                const clean = n.trim()
                if (clean && clean !== 'WhatsApp' && !/^[\+0-9\s\-]+$/.test(clean)) {
                    return clean
                }
            }
        }
    } catch {}

    // 6. Jika benar-benar belum tercatat nama, fallback ke 'Member'
    return 'Member'
}

function formatCustomTemplate(template, data) {
    if (!template) return ''
    return template
        .replace(/@user/gi, data.mention)
        .replace(/@name/gi, data.name)
        .replace(/@group/gi, data.group)
        .replace(/@subject/gi, data.group)
        .replace(/@desc/gi, data.desc)
        .replace(/@date/gi, data.date)
        .replace(/@time/gi, data.time)
        .replace(/@member/gi, data.members)
}

// Kirim sapaan. Hormati flag DB kecuali opts.force (untuk command test).
async function sendWelcomeGoodbye(bob, gid, action, participants, opts = {}) {    const gset = joDatabase.getGroup(gid)
    const enabled = opts.force ? true : (action === 'add' ? !!gset.welcome : action === 'remove' ? !!gset.left : false)
    if (!enabled) return { sent: 0, skipped: 'disabled' }
    let subject = gid
    let desc = ''
    let memberCount = 0
    try {
        const md = await bob.groupMetadata(gid)
        if (md && md.subject) subject = md.subject
        if (md && md.desc) desc = md.desc.toString()
        if (md && md.participants) memberCount = md.participants.length
    } catch (e) { console.log('[welcome] metadata gagal:', e?.message || e) }

    const now = new Date()
    const dateStr = now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: '2-digit', year: 'numeric' })
    const timeStr = now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }) + ' WIB'

    // Welcome/left dikirim sebagai TEKS + link preview palsu (tanpa gambar card).
    // URL preview = link invite grup (fallback: website bot). URL wajib di awal teks
    // agar kartu preview dirender WhatsApp.
    const { sendFakeLink } = require('./fakelink')
    let previewUrl = (typeof global.botWebsite === 'string' && global.botWebsite) || 'https://bot.acamedia.xyz'
    try {
        const code = await bob.groupInviteCode(gid).catch(() => null)
        if (code) previewUrl = `https://chat.whatsapp.com/${code}`
    } catch {}
    let groupThumb = null
    try {
        if (bob && bob.profilePictureUrl) {
            groupThumb = await bob.profilePictureUrl(gid, 'image').catch(() => null)
        }
    } catch {}

    let sent = 0
    let skippedDup = 0
    for (const p of (participants || [])) {
        const r = await resolveParticipant(bob, p)
        if (!r) {
            try { console.log('[welcome] peserta tak dikenal:', JSON.stringify(p).slice(0, 120)) } catch {}
            continue
        }
        // Lewati bila peserta ini sudah dikirim welcome/goodbye < 5 menit lalu
        // (mis. event sudah kirim, lalu polling mendeteksi join yang sama)
        if (!opts.force && wasHandled(gid, action, r.num)) {
            console.log(`[welcome] duplikat, lewati @${r.num} (${action})`)
            skippedDup++
            continue
        }
        try {
            let avatarUrl = null
            try {
                if (bob && bob.profilePictureUrl) {
                    avatarUrl = await bob.profilePictureUrl(r.jid, 'image').catch(() => null)
                }
            } catch {}

            // Dapatkan nama asli pengguna (bukan nomor telepon)
            const userName = await resolveParticipantName(bob, r, opts)

            const templateData = {
                mention: `@${r.num}`,
                name: userName,
                group: subject,
                desc: desc || '-',
                date: dateStr,
                time: timeStr,
                members: memberCount || '-'
            }

            let caption = ''
            if (action === 'add') {
                if (gset.welcomeText && gset.welcomeText.trim()) {
                    caption = formatCustomTemplate(gset.welcomeText, templateData)
                } else {
                    caption = `*WELCOME TO ${subject}*\n\nHalo @${r.num} (${userName}), selamat datang di grup *${subject}*!\nSemoga betah dan patuhi peraturan grup.`
                }
            } else {
                if (gset.leftText && gset.leftText.trim()) {
                    caption = formatCustomTemplate(gset.leftText, templateData)
                } else {
                    caption = `*GOODBYE*\n\nSelamat tinggal @${r.num} (${userName}), terima kasih telah menjadi bagian dari *${subject}*.`
                }
            }

            const title = action === 'add'
                ? `👋 Selamat datang di ${subject}!`
                : `👋 Selamat tinggal dari ${subject}!`
            // 1. Coba kirim canvas card (sharp) dulu
            let cardSent = false
            try {
                const { generateCard } = require('./card-generator')
                const cardBuf = await generateCard({
                    type: action === 'add' ? 'welcome' : 'goodbye',
                    avatar: avatarUrl || undefined,
                    username: userName,
                    groupname: subject
                })
                if (cardBuf && cardBuf.length) {
                    // IMAGE MURNI: buffer lokal langsung, tanpa URL / tanpa fake link
                    await bob.sendMessage(gid, {
                        image: cardBuf,
                        caption: caption,
                        mentions: [r.jid]
                    })
                    cardSent = true
                }
            } catch (eCard) { console.log('[welcome] canvas gagal, fallback fakelink:', eCard?.message || eCard) }
            // 2. Fallback: teks + link preview palsu (perilaku lama)
            if (!cardSent) {
                await sendFakeLink(bob, gid, {
                    url: previewUrl,
                    title,
                    description: caption,
                    thumbUrl: avatarUrl || groupThumb,
                    text: `${previewUrl}\n${caption}`,
                    mentions: [r.jid]
                })
            }
            markHandled(gid, action, r.num)
            sent++
        } catch (e) { console.log('[welcome] gagal kirim:', e?.message || e) }
    }
    return { sent, skippedDup, skipped: null }
}

module.exports = { resolveParticipant, sendWelcomeGoodbye }
