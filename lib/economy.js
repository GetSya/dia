/**
 * EconomyService - Sistem Ekonomi Terpusat JOJO BOT
 * Mata uang: Money (utama) & Point (premium)
 * Persistent via database.json (joDatabase)
 * Anti-exploit: atomic locks, cooldown, daily limit, fee sink, integer only
 */
const joDatabase = require('./database')
const crypto = require('crypto')

// ====== CONFIG EKONOMI ======
const CONFIG = {
    // Kurs Point - spread 25%
    BUY_RATE: 100,   // 100 Money = 1 Point  (10.000 Money = 100 Point)
    SELL_RATE: 75,   // 1 Point = 75 Money    (100 Point = 7.500 Money)

    // Transfer fee 2% minimal 10 Money
    TRANSFER_FEE_RATE: 0.02,
    TRANSFER_FEE_MIN: 10,

    // Sistem poin baru: user terdaftar dapat 40 poin sekali saja,
    // tiap pemakaian fitur konsumsi 1 poin (owner/premium/unlimited gratis)
    REGISTER_BONUS: 40,
    POINT_COST_PER_FEATURE: 1,

    // Daily reward streak 7 hari
    DAILY_REWARDS: [500, 750, 1000, 1500, 2000, 2500, 5000],

    // Game reward config: min, max, cooldown ms, dailyLimit
    GAME_REWARDS: {
        // Easy games (tebak-tebakan) — 50-150, cooldown 30s, daily 10k
        tebakgambar: { min: 50, max: 150, cooldown: 30_000, dailyLimit: 10_000, label: 'Tebak Gambar' },
        tebakkata:   { min: 50, max: 150, cooldown: 30_000, dailyLimit: 10_000, label: 'Tebak Kata' },
        siapakahaku: { min: 50, max: 150, cooldown: 30_000, dailyLimit: 10_000, label: 'Siapakah Aku' },
        caklontong:  { min: 50, max: 150, cooldown: 30_000, dailyLimit: 10_000, label: 'Cak Lontong' },
        teki:        { min: 50, max: 150, cooldown: 30_000, dailyLimit: 10_000, label: 'Tebak Kimia' },
        soal:        { min: 80, max: 180, cooldown: 30_000, dailyLimit: 10_000, label: 'Soal' },
        tebaklagu:   { min: 80, max: 200, cooldown: 45_000, dailyLimit: 10_000, label: 'Tebak Lagu' },
        tod:         { min: 20, max: 60,  cooldown: 15_000, dailyLimit: 5_000,  label: 'Truth or Dare' },
        dadu:        { min: 10, max: 50,  cooldown: 10_000, dailyLimit: 3_000,  label: 'Dadu' },
        // Medium
        tictactoe:   { min: 100, max: 250, cooldown: 20_000, dailyLimit: 15_000, label: 'TicTacToe' },
        ttt_win:     { min: 150, max: 300, cooldown: 0,      dailyLimit: 15_000, label: 'TicTacToe Win' },
        ttt_draw:    { min: 50,  max: 100, cooldown: 0,      dailyLimit: 15_000, label: 'TicTacToe Draw' },
        // Hard
        werewolf:    { min: 500, max: 800, cooldown: 60_000, dailyLimit: 25_000, label: 'Werewolf' },
        werewolf_win:{ min: 500, max: 900, cooldown: 0,      dailyLimit: 25_000, label: 'Werewolf Win' },
        // Fishing dynamic - base, will be multiplied by rarity
        mancing:     { min: 0,   max: 0,   cooldown: 30_000, dailyLimit: 50_000, label: 'Mancing' },
        // Bonus generic
        claim_daily: { min: 0,   max: 0,   cooldown: 0,      dailyLimit: 0,      label: 'Daily Reward' }
    },

    // NOTE: katalog shop uang/poin dihapus. Shop sekarang hanya menjual
    // item Rupiah asli via Kipay (lihat lib/payments.js REAL_ITEMS).

    GLOBAL_DAILY_LIMIT: 50_000,
    TX_HISTORY_LIMIT: 100,
    LEADERBOARD_LIMIT: 20
}

// ====== HELPERS ======
function _todayKey() {
    return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}
function _now() { return Date.now() }
function _isoNow() { return new Date().toISOString() }

function formatMoney(n) {
    const v = Math.floor(Number(n) || 0)
    return v.toLocaleString('id-ID')
}
function formatMoneyShort(n) {
    const v = Math.floor(Number(n) || 0)
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1) + 'M'
    if (v >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'K'
    return String(v)
}
function formatPoint(n) {
    return Math.floor(Number(n) || 0).toLocaleString('id-ID')
}

// ====== DB HELPERS ======
function _ensureEconomy() {
    const db = joDatabase.loadDB()
    if (!db.economy) db.economy = {}
    if (!db.economy.wallets) db.economy.wallets = {}
    if (!db.economy.transactions) db.economy.transactions = []
    if (!db.economy.gameCooldowns) db.economy.gameCooldowns = {}
    if (!db.economy.dailyClaims) db.economy.dailyClaims = {}
    if (!db.economy.payments) db.economy.payments = {}
    // dailyEarned per user per day
    if (!db.economy.dailyEarned) db.economy.dailyEarned = {}
    if (!db.economy.locks) db.economy.locks = {}
    return db.economy
}

function _getWalletRaw(jid) {
    const eco = _ensureEconomy()
    if (!eco.wallets[jid]) {
        // auto create with 0
        eco.wallets[jid] = {
            user_id: jid,
            money: 0,
            point: 0,
            total_earned: 0,
            total_spent: 0,
            total_transferred: 0,
            created_at: _isoNow(),
            updated_at: _isoNow(),
            daily_earned: {}, // date -> amount
            inventory: {} // shop items owned
        }
        // sync from legacy user.money if exists
        try {
            const db = joDatabase.loadDB()
            const legacy = db.users[jid]
            if (legacy) {
                if (typeof legacy.money === 'number' && legacy.money > 0) {
                    eco.wallets[jid].money = Math.floor(legacy.money)
                    eco.wallets[jid].total_earned = Math.floor(legacy.money)
                }
                if (typeof legacy.point === 'number') eco.wallets[jid].point = Math.floor(legacy.point)
                if (typeof legacy.limit === 'number') {} // ignore
            }
        } catch {}
        joDatabase.saveDB()
    }
    return eco.wallets[jid]
}

// sync wallet -> users[jid] for mancing compatibility
function _syncToUser(jid) {
    try {
        const db = joDatabase.loadDB()
        const w = _getWalletRaw(jid)
        if (!db.users[jid]) {
            joDatabase.addUser(jid, '', '')
        }
        const u = db.users[jid]
        if (u) {
            u.money = w.money
            u.point = w.point
            u.total_earned = w.total_earned
            u.total_spent = w.total_spent
        }
    } catch {}
}

function ensureWallet(jid) {
    const w = _getWalletRaw(jid)
    _syncToUser(jid)
    return { ...w }
}
function getWallet(jid) {
    const w = _getWalletRaw(jid)
    return { ...w }
}
function getBalance(jid) {
    return getWallet(jid)
}

// atomic lock per jid (promise queue)
const _locks = new Map() // jid -> Promise chain
async function _withLock(jid, fn) {
    const prev = _locks.get(jid) || Promise.resolve()
    let resolveLock
    const nextLock = new Promise(r => resolveLock = r)
    _locks.set(jid, prev.then(() => nextLock))
    await prev
    try {
        const result = await fn()
        return result
    } finally {
        resolveLock()
        // cleanup if no waiting
        if (_locks.get(jid) === nextLock) {
            // keep the resolved chain for next caller to await, but replace with resolved
            _locks.set(jid, Promise.resolve())
        }
    }
}
async function _withMultiLock(jids, fn) {
    // lock in sorted order to prevent deadlock
    const sorted = [...new Set(jids)].sort()
    const chains = sorted.map(id => _locks.get(id) || Promise.resolve())
    await Promise.all(chains)
    const resolvers = []
    const nextLocks = sorted.map(() => {
        let r; const p = new Promise(res => r = res); resolvers.push(r); return p
    })
    sorted.forEach((id, idx) => _locks.set(id, chains[idx].then(() => nextLocks[idx])))
    try {
        return await fn()
    } finally {
        resolvers.forEach(r => r())
        sorted.forEach((id, idx) => {
            if (_locks.get(id) === nextLocks[idx]) _locks.set(id, Promise.resolve())
        })
    }
}

function _recordTransaction({ user_id, type, amount, currency, description, related_user_id = null, fee = 0, before = null, after = null }) {
    const eco = _ensureEconomy()
    const tx = {
        transaction_id: 'tx_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
        user_id,
        type,
        amount: Math.floor(amount),
        currency, // 'money' | 'point'
        description,
        related_user_id,
        fee: Math.floor(fee || 0),
        before,
        after,
        created_at: _isoNow()
    }
    eco.transactions.push(tx)
    // keep last 5000 globally, and trim
    if (eco.transactions.length > 5000) eco.transactions.splice(0, eco.transactions.length - 5000)
    joDatabase.saveDB(true)
    return tx
}

// ====== CORE OPERATIONS ======
async function addMoney(jid, amount, type = 'GAME_REWARD', description = '') {
    amount = Math.floor(Number(amount) || 0)
    if (amount <= 0) throw new Error('Jumlah harus > 0')
    if (!Number.isSafeInteger(amount)) throw new Error('Jumlah tidak valid')
    return _withLock(jid, async () => {
        const eco = _ensureEconomy()
        const w = _getWalletRaw(jid)
        const before = w.money
        // overflow check
        if (w.money + amount > Number.MAX_SAFE_INTEGER) throw new Error('Saldo melebihi batas')
        w.money += amount
        w.total_earned = (w.total_earned || 0) + amount
        w.updated_at = _isoNow()
        // daily earned
        const today = _todayKey()
        if (!w.daily_earned) w.daily_earned = {}
        w.daily_earned[today] = (w.daily_earned[today] || 0) + amount
        // global daily earned tracker
        if (!eco.dailyEarned[jid]) eco.dailyEarned[jid] = {}
        eco.dailyEarned[jid][today] = (eco.dailyEarned[jid][today] || 0) + amount

        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type, amount, currency: 'money', description, before, after: w.money })
        return { wallet: { ...w }, tx }
    })
}

async function removeMoney(jid, amount, type = 'SPEND', description = '') {
    amount = Math.floor(Number(amount) || 0)
    if (amount <= 0) throw new Error('Jumlah harus > 0')
    if (!Number.isSafeInteger(amount)) throw new Error('Jumlah tidak valid')
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        if ((w.money || 0) < amount) {
            const err = new Error('INSUFFICIENT')
            err.code = 'INSUFFICIENT'
            err.need = amount
            err.have = w.money || 0
            throw err
        }
        const before = w.money
        w.money -= amount
        w.total_spent = (w.total_spent || 0) + amount
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type, amount: -amount, currency: 'money', description, before, after: w.money })
        return { wallet: { ...w }, tx }
    })
}

async function addPoint(jid, amount, type = 'POINT_REWARD', description = '') {
    amount = Math.floor(Number(amount) || 0)
    if (amount <= 0) throw new Error('Jumlah harus > 0')
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        const before = w.point || 0
        if (before + amount > Number.MAX_SAFE_INTEGER) throw new Error('Saldo melebihi batas')
        w.point = (w.point || 0) + amount
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type, amount, currency: 'point', description, before, after: w.point })
        return { wallet: { ...w }, tx }
    })
}

async function removePoint(jid, amount, type = 'POINT_SPEND', description = '') {
    amount = Math.floor(Number(amount) || 0)
    if (amount <= 0) throw new Error('Jumlah harus > 0')
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        if ((w.point || 0) < amount) {
            const err = new Error('INSUFFICIENT_POINT')
            err.code = 'INSUFFICIENT_POINT'
            err.need = amount
            err.have = w.point || 0
            throw err
        }
        const before = w.point
        w.point -= amount
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type, amount: -amount, currency: 'point', description, before, after: w.point })
        return { wallet: { ...w }, tx }
    })
}

// ====== TRANSFER ======
async function transferMoney(senderJid, receiverJid, amount) {
    amount = Math.floor(Number(amount) || 0)
    if (amount <= 0) throw new Error('Jumlah transfer harus lebih dari 0')
    if (!receiverJid || senderJid === receiverJid) throw new Error('Tidak bisa transfer ke diri sendiri')
    if (!Number.isSafeInteger(amount)) throw new Error('Jumlah tidak valid')
    // normalize check same number? Compare digits
    const sNum = String(senderJid).split('@')[0].replace(/[^0-9]/g, '')
    const rNum = String(receiverJid).split('@')[0].replace(/[^0-9]/g, '')
    if (sNum && rNum && sNum === rNum) throw new Error('Tidak bisa transfer ke diri sendiri')

    // ensure both wallets exist
    _getWalletRaw(senderJid)
    _getWalletRaw(receiverJid)
    const db = joDatabase.loadDB()
    if (!db.users[receiverJid]) throw new Error('Penerima tidak ditemukan di database. Penerima harus pernah memakai bot minimal 1 kali.')

    const fee = Math.max(CONFIG.TRANSFER_FEE_MIN, Math.floor(amount * CONFIG.TRANSFER_FEE_RATE))
    const totalDeduct = amount + fee

    return _withMultiLock([senderJid, receiverJid], async () => {
        const eco = _ensureEconomy()
        const senderW = eco.wallets[senderJid]
        const receiverW = eco.wallets[receiverJid]
        if ((senderW.money || 0) < totalDeduct) {
            const err = new Error('INSUFFICIENT')
            err.code = 'INSUFFICIENT'
            err.need = totalDeduct
            err.have = senderW.money || 0
            err.fee = fee
            throw err
        }
        const senderBefore = senderW.money
        const receiverBefore = receiverW.money

        senderW.money -= totalDeduct
        senderW.total_spent = (senderW.total_spent || 0) + totalDeduct
        senderW.total_transferred = (senderW.total_transferred || 0) + amount
        senderW.updated_at = _isoNow()

        receiverW.money = (receiverW.money || 0) + amount
        receiverW.total_earned = (receiverW.total_earned || 0) + amount
        const today = _todayKey()
        if (!receiverW.daily_earned) receiverW.daily_earned = {}
        receiverW.daily_earned[today] = (receiverW.daily_earned[today] || 0) + amount
        receiverW.updated_at = _isoNow()

        _syncToUser(senderJid)
        _syncToUser(receiverJid)
        joDatabase.saveDB(true)

        const txOut = _recordTransaction({ user_id: senderJid, type: 'TRANSFER_OUT', amount: -totalDeduct, currency: 'money', description: `Transfer to ${receiverJid} | fee ${fee}`, related_user_id: receiverJid, fee, before: senderBefore, after: senderW.money })
        const txIn = _recordTransaction({ user_id: receiverJid, type: 'TRANSFER_IN', amount, currency: 'money', description: `Transfer from ${senderJid}`, related_user_id: senderJid, before: receiverBefore, after: receiverW.money })
        // fee sink transaction
        if (fee > 0) _recordTransaction({ user_id: senderJid, type: 'FEE', amount: -fee, currency: 'money', description: 'Transfer fee sink', related_user_id: null, fee: 0, before: null, after: null })

        return { sender: { ...senderW }, receiver: { ...receiverW }, fee, totalDeduct, txOut, txIn }
    })
}

// ====== BUY / SELL POINT ======
async function buyPoint(jid, pointAmount) {
    pointAmount = Math.floor(Number(pointAmount) || 0)
    if (pointAmount <= 0) throw new Error('Jumlah Point harus > 0')
    if (!Number.isSafeInteger(pointAmount)) throw new Error('Jumlah tidak valid')
    const cost = pointAmount * CONFIG.BUY_RATE
    return _withLock(jid, async () => {
        const eco = _ensureEconomy()
        const w = eco.wallets[jid]
        if (!w) _getWalletRaw(jid)
        const wallet = eco.wallets[jid]
        if ((wallet.money || 0) < cost) {
            const err = new Error('INSUFFICIENT')
            err.code = 'INSUFFICIENT'
            err.need = cost
            err.have = wallet.money || 0
            throw err
        }
        const beforeMoney = wallet.money
        const beforePoint = wallet.point || 0
        wallet.money -= cost
        wallet.total_spent = (wallet.total_spent || 0) + cost
        wallet.point = (wallet.point || 0) + pointAmount
        wallet.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const txMoney = _recordTransaction({ user_id: jid, type: 'POINT_PURCHASE', amount: -cost, currency: 'money', description: `Buy ${pointAmount} Point @${CONFIG.BUY_RATE}`, before: beforeMoney, after: wallet.money })
        const txPoint = _recordTransaction({ user_id: jid, type: 'POINT_PURCHASE', amount: pointAmount, currency: 'point', description: `Buy ${pointAmount} Point`, before: beforePoint, after: wallet.point })
        return { wallet: { ...wallet }, cost, txMoney, txPoint }
    })
}

async function sellPoint(jid, pointAmount) {
    pointAmount = Math.floor(Number(pointAmount) || 0)
    if (pointAmount <= 0) throw new Error('Jumlah Point harus > 0')
    const gain = pointAmount * CONFIG.SELL_RATE
    return _withLock(jid, async () => {
        const eco = _ensureEconomy()
        const w = eco.wallets[jid]
        if (!w) _getWalletRaw(jid)
        const wallet = eco.wallets[jid]
        if ((wallet.point || 0) < pointAmount) {
            const err = new Error('INSUFFICIENT_POINT')
            err.code = 'INSUFFICIENT_POINT'
            err.need = pointAmount
            err.have = wallet.point || 0
            throw err
        }
        const beforeMoney = wallet.money
        const beforePoint = wallet.point
        wallet.point -= pointAmount
        wallet.money = (wallet.money || 0) + gain
        wallet.total_earned = (wallet.total_earned || 0) + gain
        const today = _todayKey()
        if (!wallet.daily_earned) wallet.daily_earned = {}
        wallet.daily_earned[today] = (wallet.daily_earned[today] || 0) + gain
        wallet.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const txPoint = _recordTransaction({ user_id: jid, type: 'POINT_SELL', amount: -pointAmount, currency: 'point', description: `Sell ${pointAmount} Point @${CONFIG.SELL_RATE}`, before: beforePoint, after: wallet.point })
        const txMoney = _recordTransaction({ user_id: jid, type: 'POINT_SELL', amount: gain, currency: 'money', description: `Sell ${pointAmount} Point`, before: beforeMoney, after: wallet.money })
        return { wallet: { ...wallet }, gain, txPoint, txMoney }
    })
}

// ====== GAME REWARD + COOLDOWN + DAILY LIMIT ======
function _checkCooldown(jid, gameKey) {
    const cfg = CONFIG.GAME_REWARDS[gameKey]
    if (!cfg || !cfg.cooldown) return { ok: true }
    const eco = _ensureEconomy()
    const key = `${jid}:${gameKey}`
    const last = eco.gameCooldowns[key] || 0
    const diff = _now() - last
    if (diff < cfg.cooldown) {
        return { ok: false, remaining: cfg.cooldown - diff }
    }
    return { ok: true }
}
function _checkDailyLimit(jid, gameKey, amount) {
    const cfg = CONFIG.GAME_REWARDS[gameKey]
    if (!cfg || !cfg.dailyLimit) return { ok: true }
    const eco = _ensureEconomy()
    const today = _todayKey()
    // per-game daily
    const perGameKey = `${jid}:${gameKey}:${today}`
    // Actually we store per user per today total earned via wallet.daily_earned and also eco.dailyEarned
    const w = _getWalletRaw(jid)
    // check per-game
    const perGameEarned = (eco.dailyEarned[jid] && eco.dailyEarned[jid][`${gameKey}:${today}`]) || 0
    if (perGameEarned + amount > cfg.dailyLimit) {
        return { ok: false, perGame: true, limit: cfg.dailyLimit, earned: perGameEarned }
    }
    // global daily
    const globalEarned = (w.daily_earned && w.daily_earned[today]) || 0
    if (globalEarned + amount > CONFIG.GLOBAL_DAILY_LIMIT) {
        return { ok: false, global: true, limit: CONFIG.GLOBAL_DAILY_LIMIT, earned: globalEarned }
    }
    return { ok: true }
}
function _setCooldown(jid, gameKey) {
    const eco = _ensureEconomy()
    eco.gameCooldowns[`${jid}:${gameKey}`] = _now()
    joDatabase.saveDB()
}
function _addDailyEarnedGame(jid, gameKey, amount) {
    const eco = _ensureEconomy()
    const today = _todayKey()
    if (!eco.dailyEarned[jid]) eco.dailyEarned[jid] = {}
    const k = `${gameKey}:${today}`
    eco.dailyEarned[jid][k] = (eco.dailyEarned[jid][k] || 0) + amount
}

async function giveGameReward(jid, gameKey, opts = {}) {
    // opts: amount (override), multiplier, streak, score
    const cfg = CONFIG.GAME_REWARDS[gameKey]
    if (!cfg) throw new Error('Game tidak dikenal: ' + gameKey)

    // idempotency key: if opts.idempotency provided, check last tx with same idempotency in last 10s
    if (opts.idempotency) {
        const eco = _ensureEconomy()
        const recent = eco.transactions.slice(-50).reverse().find(t => t.user_id === jid && t.type === 'GAME_REWARD' && t.description && t.description.includes(`#${opts.idempotency}`))
        if (recent && _now() - new Date(recent.created_at).getTime() < 15000) {
            const err = new Error('DUPLICATE_REWARD')
            err.code = 'DUPLICATE_REWARD'
            throw err
        }
    }

    const cd = _checkCooldown(jid, gameKey)
    if (!cd.ok) {
        const err = new Error('COOLDOWN')
        err.code = 'COOLDOWN'
        err.remaining = cd.remaining
        throw err
    }

    let amount = opts.amount
    if (!amount) {
        if (cfg.min === 0 && cfg.max === 0 && gameKey === 'mancing') {
            // dynamic for fishing will be passed
            amount = 0
        } else {
            const min = cfg.min, max = cfg.max
            amount = Math.floor(Math.random() * (max - min + 1)) + min
        }
        // multiplier
        if (opts.multiplier) amount = Math.floor(amount * opts.multiplier)
        if (opts.streak && opts.streak > 1) {
            const bonus = Math.min(0.5, (opts.streak - 1) * 0.05) // max 50%
            amount = Math.floor(amount * (1 + bonus))
        }
        // clamp to cfg max*1.5 to prevent exploit
        if (cfg.max) amount = Math.min(amount, Math.floor(cfg.max * 1.5))
        if (cfg.min) amount = Math.max(amount, cfg.min)
    }
    amount = Math.floor(amount)
    if (amount <= 0) return { amount: 0 }

    const dl = _checkDailyLimit(jid, gameKey, amount)
    if (!dl.ok) {
        const err = new Error('DAILY_LIMIT')
        err.code = 'DAILY_LIMIT'
        err.detail = dl
        throw err
    }

    // give
    const res = await addMoney(jid, amount, 'GAME_REWARD', `${cfg.label} #${opts.idempotency || Date.now()}`)
    _setCooldown(jid, gameKey)
    _addDailyEarnedGame(jid, gameKey, amount)
    joDatabase.saveDB(true)
    return { amount, wallet: res.wallet, tx: res.tx }
}

// For fishing: calculate reward based on fish rarity/price
function mancingRewardForFish(fish) {
    // fish: { rarity, basePrice }
    const price = fish.basePrice || 100
    // 30% of fish price as reward money extra (sink balanced)
    let ratio = 0.15
    if (fish.rarity === 'uncommon') ratio = 0.25
    if (fish.rarity === 'rare') ratio = 0.35
    if (fish.rarity === 'epic') ratio = 0.5
    if (fish.rarity === 'legendary') ratio = 0.7
    if (fish.rarity === 'mythic') ratio = 1.0
    if (fish.rarity === 'divine') ratio = 1.5
    let amt = Math.floor(price * ratio * (0.8 + Math.random() * 0.4))
    amt = Math.max(50, Math.min(2000, amt))
    return amt
}

// ====== DAILY CLAIM ======
function canClaimDaily(jid) {
    const eco = _ensureEconomy()
    const today = _todayKey()
    const rec = eco.dailyClaims[jid]
    if (!rec) return { can: true, streak: 1, amount: CONFIG.DAILY_REWARDS[0] }
    const lastDate = rec.lastClaim // YYYY-MM-DD
    if (lastDate === today) return { can: false, reason: 'today_claimed', streak: rec.streak }
    // check streak continuity
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    let streak = rec.streak || 0
    if (lastDate === yesterday) {
        streak = Math.min(7, streak + 1)
    } else {
        streak = 1
    }
    const amount = CONFIG.DAILY_REWARDS[Math.min(streak - 1, 6)]
    return { can: true, streak, amount }
}
async function claimDaily(jid) {
    const info = canClaimDaily(jid)
    if (!info.can) {
        const err = new Error('ALREADY_CLAIMED')
        err.code = 'ALREADY_CLAIMED'
        throw err
    }
    const eco = _ensureEconomy()
    const amount = info.amount
    // check global daily limit
    const dl = _checkDailyLimit(jid, 'claim_daily', amount)
    // allow daily even if global limit exceeded? But spec says count to inflation, so allow but cap?
    // We'll allow but not block; just give.

    const res = await addMoney(jid, amount, 'DAILY_REWARD', `Daily day ${info.streak}`)
    eco.dailyClaims[jid] = { lastClaim: _todayKey(), streak: info.streak, updatedAt: _isoNow() }
    joDatabase.saveDB(true)
    return { amount, streak: info.streak, wallet: res.wallet }
}

// ====== BONUS PENDAFTARAN & STATUS AKUN ======
// User yang sudah terdaftar (login terverifikasi) dapat 40 poin, sekali saja.
async function grantRegisterBonus(jid) {
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        if (w.register_bonus) return { wallet: { ...w }, granted: false }
        w.register_bonus = true
        const before = w.point || 0
        w.point = before + CONFIG.REGISTER_BONUS
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type: 'REGISTER_BONUS', amount: CONFIG.REGISTER_BONUS, currency: 'point', description: `Bonus ${CONFIG.REGISTER_BONUS} poin pendaftaran`, before, after: w.point })
        return { wallet: { ...w }, granted: true, tx }
    })
}

// Bebas biaya poin? (beli Unlimited Poin / paket Unlock All / premium)
function hasUnlimited(jid) {
    try {
        const w = _getWalletRaw(jid)
        return !!(w.unlimited_point || w.premium)
    } catch { return false }
}

async function setUnlimitedPoint(jid, reason = '') {
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        w.unlimited_point = true
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type: 'UNLIMITED_UPGRADE', amount: 0, currency: 'point', description: reason || 'Unlimited Poin aktif', before: w.point, after: w.point })
        return { wallet: { ...w }, tx }
    })
}

async function setPremiumFlag(jid, reason = '') {
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        w.premium = true
        w.premium_since = _isoNow()
        w.updated_at = _isoNow()
        _syncToUser(jid)
        joDatabase.saveDB(true)
        const tx = _recordTransaction({ user_id: jid, type: 'PREMIUM_UPGRADE', amount: 0, currency: 'point', description: reason || 'Premium aktif', before: w.point, after: w.point })
        return { wallet: { ...w }, tx }
    })
}

// ====== HISTORY & LEADERBOARD ======
function getTransactions(jid, limit = 10, offset = 0) {
    const eco = _ensureEconomy()
    const all = eco.transactions.filter(t => t.user_id === jid).reverse()
    const slice = all.slice(offset, offset + limit)
    return { total: all.length, transactions: slice }
}
function getLeaderboard(currency = 'money', limit = 10, offset = 0) {
    const eco = _ensureEconomy()
    const wallets = Object.values(eco.wallets)
    wallets.sort((a, b) => (b[currency] || 0) - (a[currency] || 0))
    const slice = wallets.slice(offset, offset + limit).map((w, idx) => ({
        rank: offset + idx + 1,
        user_id: w.user_id,
        name: (joDatabase.loadDB().users[w.user_id]?.name) || w.user_id.split('@')[0],
        money: w.money || 0,
        point: w.point || 0,
        value: w[currency] || 0
    }))
    return { total: wallets.length, leaderboard: slice }
}
function getTodayEarnings(jid) {
    const w = _getWalletRaw(jid)
    const today = _todayKey()
    return {
        earned: (w.daily_earned && w.daily_earned[today]) || 0,
        spent: 0 // we could track spent per day too if needed
    }
}

// ====== ADMIN ======
async function adminGive(jid, moneyAmount = 0, pointAmount = 0, reason = 'ADMIN_GIVE') {
    if (moneyAmount) await addMoney(jid, moneyAmount, 'ADMIN_GIVE', reason)
    if (pointAmount) await addPoint(jid, pointAmount, 'ADMIN_GIVE', reason)
    return getWallet(jid)
}
async function adminRemove(jid, moneyAmount = 0, pointAmount = 0, reason = 'ADMIN_REMOVE') {
    if (moneyAmount) await removeMoney(jid, moneyAmount, 'ADMIN_REMOVE', reason)
    if (pointAmount) await removePoint(jid, pointAmount, 'ADMIN_REMOVE', reason)
    return getWallet(jid)
}
async function adminSet(jid, moneyAmount, pointAmount) {
    return _withLock(jid, async () => {
        const w = _getWalletRaw(jid)
        const beforeMoney = w.money
        const beforePoint = w.point
        if (typeof moneyAmount === 'number') {
            w.money = Math.floor(moneyAmount)
            w.updated_at = _isoNow()
            _recordTransaction({ user_id: jid, type: 'ADMIN_SET', amount: w.money - beforeMoney, currency: 'money', description: `ADMIN SET money ${beforeMoney} -> ${w.money}`, before: beforeMoney, after: w.money })
        }
        if (typeof pointAmount === 'number') {
            w.point = Math.floor(pointAmount)
            _recordTransaction({ user_id: jid, type: 'ADMIN_SET', amount: w.point - beforePoint, currency: 'point', description: `ADMIN SET point ${beforePoint} -> ${w.point}`, before: beforePoint, after: w.point })
        }
        _syncToUser(jid)
        joDatabase.saveDB(true)
        return { ...w }
    })
}
function getTransactionById(txId) {
    const eco = _ensureEconomy()
    return eco.transactions.find(t => t.transaction_id === txId) || null
}

// ====== MIGRATION: ensure existing users get wallets ======
function migrateAllUsers() {
    try {
        const db = joDatabase.loadDB()
        for (const jid of Object.keys(db.users)) {
            _getWalletRaw(jid)
        }
        joDatabase.saveDB(true)
    } catch {}
}
migrateAllUsers()

module.exports = {
    CONFIG,
    formatMoney, formatMoneyShort, formatPoint,
    ensureWallet, getWallet, getBalance,
    addMoney, removeMoney, addPoint, removePoint,
    transferMoney, buyPoint, sellPoint,
    giveGameReward, mancingRewardForFish,
    canClaimDaily, claimDaily,
    grantRegisterBonus, hasUnlimited, setUnlimitedPoint, setPremiumFlag,
    getTransactions, getLeaderboard, getTodayEarnings,
    getTransactionById,
    adminGive, adminRemove, adminSet,
    _checkCooldown, _checkDailyLimit,
    migrateAllUsers
}
