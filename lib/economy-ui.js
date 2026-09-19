/**
 * UI interaktif fitur ekonomi: list + tombol (tanpa ketik command panjang).
 * Semua aksi memakai id command biasa, mis. "#shop beli point_1000",
 * sehingga tap tombol = menjalankan command yang sama.
 */
const payments = require('./payments')
const kipay = require('./kipay')

function qr(title, id) {
    return { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: title, id }) }
}
function listBtn(title, sections) {
    return { name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections }) }
}

// /shop -> daftar item sebagai list + tombol cek/pesanan
async function sendShopList(bob, m, prefix) {
    const rows = payments.REAL_ITEMS.map(it => ({
        title: `${it.name} — ${kipay.formatRupiah(it.price)}`,
        description: it.desc.slice(0, 72),
        id: `${prefix}shop beli ${it.id}`
    }))
    const btn = [
        listBtn('🛒 Pilih Item', [{ title: 'Bayar QRIS', rows }]),
        qr('📦 Cek Bayar', `${prefix}shop cek`),
        qr('🧾 Pesananku', `${prefix}shop pesanan`)
    ]
    const text = `⋆˚𐙚 JOJO SHOP — Bayar Rupiah Asli (QRIS) 𐙚˚⋆\n· · ───── · ·\nPilih item di list bawah, bayar QR-nya, lalu ketik *${prefix}shop cek*.\n\n_(tidak perlu ketik manual — cukup tap)_`
    try {
        await bob.sendButton(m.chat, text, '> Jojo Shop', 'TOKO', btn)
        return true
    } catch (e) {
        console.log('[shop-list]', e?.message || e)
        return false
    }
}

// /belipoin tanpa jumlah -> tombol preset + instruksi ketik
async function sendBelipoinOptions(bob, m, prefix, reply, wallets) {
    const presets = [10, 50, 100, 500]
    const btn = presets.map(n => qr(`${n} poin`, `${prefix}belipoin ${n}`))
    const text = `⋆˚𐙚 BELI POIN 𐙚˚⋆\n· · ───── · ·\nKurs: *100 uang = 1 poin*\nSaldo uang: Rp ${wallets.money}\nSaldo poin: ${wallets.point}\n\nPilih jumlah di bawah, atau *ketik angkanya langsung* (mis. 250).`
    try {
        await bob.sendButton(m.chat, text, '> Jojo Economy', 'BELI POIN', btn)
        return true
    } catch { reply(text); return true }
}

// /jualpoin tanpa jumlah -> tombol preset + Semua + instruksi ketik
async function sendJualpoinOptions(bob, m, prefix, reply, wallets) {
    const btn = [
        qr('10 poin', `${prefix}jualpoin 10`),
        qr('50 poin', `${prefix}jualpoin 50`),
        qr('100 poin', `${prefix}jualpoin 100`),
        qr('Semua', `${prefix}jualpoin semua`)
    ]
    const text = `⋆˚𐙚 JUAL POIN 𐙚˚⋆\n· · ───── · ·\nKurs jual: *1 poin = 75 uang*\nSaldo poin: ${wallets.point}\nSaldo uang: Rp ${wallets.money}\n\nPilih di bawah, atau *ketik angkanya langsung*.`
    try {
        await bob.sendButton(m.chat, text, '> Jojo Economy', 'JUAL POIN', btn)
        return true
    } catch { reply(text); return true }
}

module.exports = { qr, listBtn, sendShopList, sendBelipoinOptions, sendJualpoinOptions }
