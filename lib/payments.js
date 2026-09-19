/**
 * Shop Rupiah asli via Kipay.id (QRIS).
 * Alur: /shop beli <id> -> order + trx Kipay (pending) -> user bayar QR ->
 *        /shop cek -> status paid (terverifikasi server-to-server) -> item diberikan SEKALI.
 * Order tersimpan persistent di database.json (db.economy.payments).
 */
const joDatabase = require('./database')
const kipay = require('./kipay')
const economy = require('./economy')

// Katalog shop — HANYA 4 item ini (Rupiah asli, bukan uang bot)
const REAL_ITEMS = [
    {
        id: 'premium_unlock',
        name: 'Premium Unlock All',
        price: 22000,
        desc: 'Premium permanen + Unlimited Poin + Rp4.000.000 uang bot'
    },
    {
        id: 'unlimited_poin',
        name: 'Unlimited Poin',
        price: 20000,
        desc: 'Bebas biaya poin selamanya (semua fitur tanpa potong poin)'
    },
    {
        id: 'money_1jt',
        name: '1 Juta Uang Bot',
        price: 5000,
        desc: 'Dapat Rp1.000.000 uang bot'
    },
    {
        id: 'point_1000',
        name: '1000 Poin',
        price: 5000,
        desc: 'Dapat 1.000 poin'
    }
]

function getRealItem(id) {
    return REAL_ITEMS.find(i => i.id === String(id || '').toLowerCase()) || null
}

function _payments() {
    const db = joDatabase.loadDB()
    if (!db.economy) db.economy = {}
    if (!db.economy.payments) db.economy.payments = {}
    return db.economy.payments
}

function _save() { try { joDatabase.saveDB(true) } catch {} }

function _orderCode() {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    let c = ''
    for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)]
    return 'ORD-' + c
}

// Buat order + transaksi Kipay. Return { order, trx }
async function createOrder(jid, itemId, pushname = '') {
    const item = getRealItem(itemId)
    if (!item) throw new Error('Item tidak ditemukan. Ketik /shop untuk daftar.')
    const payments = _payments()
    // Batasi 1 order pending per user per item (cegah spam order)
    const pending = Object.values(payments).find(o =>
        o.jid === jid && o.itemId === item.id && o.status === 'pending' && Date.now() < (o.expiresAt || 0))
    if (pending) {
        const err = new Error('ORDER_PENDING')
        err.code = 'ORDER_PENDING'
        err.order = pending
        throw err
    }
    const orderId = _orderCode()
    let trx
    try {
        trx = await kipay.createTransaction(item.price, orderId)
    } catch (e) {
        throw new Error(`Gagal membuat pembayaran: ${e.message}`)
    }
    const order = {
        orderId,
        trxId: trx.trx_id,
        jid,
        name: pushname || '',
        itemId: item.id,
        itemName: item.name,
        priceIdr: item.price,
        payableAmount: trx.amount || item.price,
        qrUrl: trx.qr_url || null,
        status: trx.status || 'pending',
        createdAt: Date.now(),
        expiresAt: trx.expires_at ? new Date(String(trx.expires_at).replace(' ', 'T')).getTime() : (Date.now() + 15 * 60 * 1000),
        fulfilledAt: 0
    }
    payments[orderId] = order
    _save()
    return { order: { ...order }, trx }
}

function getOrder(orderIdOrTrx) {
    const payments = _payments()
    const key = String(orderIdOrTrx || '').trim().toUpperCase()
    if (payments[key]) return { ...payments[key] }
    // cari via trx_id (penuh / ekor)
    const found = Object.values(payments).find(o =>
        String(o.trxId || '').toUpperCase() === key ||
        String(o.trxId || '').toUpperCase().endsWith(key))
    return found ? { ...found } : null
}

function getUserOrders(jid, onlyPending = false) {
    return Object.values(_payments())
        .filter(o => o.jid === jid && (!onlyPending || (o.status === 'pending' && Date.now() < (o.expiresAt || 0))))
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(o => ({ ...o }))
}

function latestPendingOrder(jid) {
    const list = getUserOrders(jid, true)
    return list[0] || null
}

// Refresh status dari Kipay (server-to-server). Return order terbaru.
async function refreshOrder(orderIdOrTrx) {
    const order = getOrder(orderIdOrTrx)
    if (!order) throw new Error('Pesanan tidak ditemukan.')
    if (order.status === 'fulfilled') return order
    let trx
    try {
        trx = await kipay.getTransaction(order.trxId)
    } catch (e) {
        throw new Error(`Gagal cek status: ${e.message}`)
    }
    const payments = _payments()
    const stored = payments[order.orderId]
    if (!stored) throw new Error('Pesanan tidak ditemukan.')
    const st = String(trx.status || '').toLowerCase()
    if (st === 'paid') stored.status = 'paid'
    else if (st === 'expired' || (stored.expiresAt && Date.now() > stored.expiresAt)) stored.status = 'expired'
    else stored.status = 'pending'
    if (trx.amount) stored.payableAmount = trx.amount
    _save()
    return { ...stored }
}

function markFulfilled(orderId) {
    const payments = _payments()
    const o = payments[String(orderId || '').toUpperCase()]
    if (!o) return null
    o.status = 'fulfilled'
    o.fulfilledAt = Date.now()
    _save()
    return { ...o }
}

// Berikan item ke user. grantPremium(jid) diisi control.js (pegang array prem2).
// Idempotent: order fulfilled tidak diproses ulang.
async function fulfillOrder(orderId, { grantPremium } = {}) {
    const payments = _payments()
    const o = payments[String(orderId || '').toUpperCase()]
    if (!o) throw new Error('Pesanan tidak ditemukan.')
    if (o.status === 'fulfilled') return { order: { ...o }, already: true, grants: [] }
    if (o.status !== 'paid') throw new Error('Pesanan belum dibayar.')
    const grants = []
    if (o.itemId === 'premium_unlock') {
        await economy.setPremiumFlag(o.jid, 'Paket Premium Unlock All (Rp22.000)')
        await economy.setUnlimitedPoint(o.jid, 'Paket Premium Unlock All (Rp22.000)')
        const r = await economy.addMoney(o.jid, 4000000, 'REALSHOP', 'Paket Premium Unlock All: +Rp4.000.000')
        grants.push({ type: 'premium', wallet: r.wallet })
        if (typeof grantPremium === 'function') { try { await grantPremium(o.jid) } catch {} }
    } else if (o.itemId === 'unlimited_poin') {
        await economy.setUnlimitedPoint(o.jid, 'Beli Unlimited Poin (Rp20.000)')
        grants.push({ type: 'unlimited' })
    } else if (o.itemId === 'money_1jt') {
        const r = await economy.addMoney(o.jid, 1000000, 'REALSHOP', 'Beli 1 Juta Uang Bot (Rp5.000)')
        grants.push({ type: 'money', wallet: r.wallet })
    } else if (o.itemId === 'point_1000') {
        const r = await economy.addPoint(o.jid, 1000, 'REALSHOP', 'Beli 1000 Poin (Rp5.000)')
        grants.push({ type: 'point', wallet: r.wallet })
    } else {
        throw new Error('Item tidak dikenal: ' + o.itemId)
    }
    const done = markFulfilled(o.orderId)
    return { order: done, already: false, grants }
}

module.exports = {
    REAL_ITEMS, getRealItem,
    createOrder, getOrder, getUserOrders, latestPendingOrder,
    refreshOrder, markFulfilled, fulfillOrder
}
