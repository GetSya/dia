// ╔══════════════════════════════════════════════════╗
// ║         FISHING GAME - JOJO BOT (CJS)            ║
// ║  Database: database.json (joDatabase)            ║
// ║  Stat user: money, level, rod, bait, inventory   ║
// ╚══════════════════════════════════════════════════╝
const joDatabase = require('./database')

const fishingActive = new Map()      // userId -> true (sedang mancing)
const fishCooldown  = new Map()      // userId -> timestamp
const sellSessions  = new Map()      // buyerId -> { sellerId, ... }

// ═══════════════════════════════════════════════════
//                    DATA TABLES
// ═══════════════════════════════════════════════════

const BAITS = {
  cacing:      { name: 'Cacing',       price: 150,   bonus: 1.0,  desc: 'Umpan dasar, cocok untuk pemula' },
  udang:       { name: 'Udang',        price: 300,   bonus: 1.2,  desc: 'Menarik ikan lebih besar' },
  jangkrik:    { name: 'Jangkrik',     price: 250,   bonus: 1.15, desc: 'Umpan hidup yang aktif bergerak' },
  pelet:       { name: 'Pelet',        price: 200,   bonus: 1.1,  desc: 'Umpan buatan pabrik' },
  roti:        { name: 'Roti',         price: 100,   bonus: 0.9,  desc: 'Umpan murah meriah' },
  daging:      { name: 'Daging',       price: 500,   bonus: 1.4,  desc: 'Umpan premium untuk ikan besar' },
  sotong:      { name: 'Sotong',       price: 600,   bonus: 1.5,  desc: 'Sangat menarik untuk ikan laut' },
  ikan_kecil:  { name: 'Ikan Kecil',   price: 450,   bonus: 1.35, desc: 'Predator besar menyukainya' },
  luminous:    { name: 'Luminous',     price: 1200,  bonus: 1.8,  desc: 'Bersinar dalam gelap, menarik ikan abyss' },
  mistik:      { name: 'Umpan Mistik', price: 3000,  bonus: 2.5,  desc: 'Umpan legenda dari kedalaman abyss' }
}

const LOCATIONS = {
  Empang: {
    minLevel: 0,
    maxLevel: 5,
    desc: 'Kolam tenang di desa',
    fishes: [
      { name: 'Ikan Mas', rarity: 'common', basePrice: 200, weight: 40 },
      { name: 'Ikan Nila', rarity: 'common', basePrice: 180, weight: 35 },
      { name: 'Ikan Mujair', rarity: 'uncommon', basePrice: 350, weight: 12 },
      { name: 'Ikan Lele Kecil', rarity: 'rare', basePrice: 600, weight: 5 },
      { name: 'Ikan Sepat', rarity: 'common', basePrice: 150, weight: 35 },
      { name: 'Ikan Wader', rarity: 'common', basePrice: 120, weight: 45 },
      { name: 'Ikan Betok', rarity: 'uncommon', basePrice: 320, weight: 15 },
      { name: 'Lele Albino', rarity: 'rare', basePrice: 900, weight: 3 },
      { name: 'Ikan Mas Raja', rarity: 'epic', basePrice: 2500, weight: 1 }
    ]
  },
  Kali: {
    minLevel: 6,
    maxLevel: 10,
    desc: 'Aliran sungai kecil yang jernih',
    fishes: [
      { name: 'Ikan Gabus', rarity: 'common', basePrice: 400, weight: 35 },
      { name: 'Ikan Bawal', rarity: 'common', basePrice: 380, weight: 30 },
      { name: 'Ikan Tawes', rarity: 'uncommon', basePrice: 700, weight: 18 },
      { name: 'Ikan Belut', rarity: 'rare', basePrice: 1200, weight: 6 },
      { name: 'Ikan Mas Koki', rarity: 'epic', basePrice: 3000, weight: 2 },
      { name: 'Ikan Baung', rarity: 'common', basePrice: 420, weight: 30 },
      { name: 'Ikan Nilem', rarity: 'common', basePrice: 350, weight: 28 },
      { name: 'Udang Sungai', rarity: 'uncommon', basePrice: 900, weight: 15 },
      { name: 'Sidat Hitam', rarity: 'rare', basePrice: 1800, weight: 5 },
      { name: 'Koi Liar', rarity: 'epic', basePrice: 4500, weight: 2 }
    ]
  },
  Sungai: {
    minLevel: 11,
    maxLevel: 35,
    desc: 'Sungai besar dengan arus deras',
    fishes: [
      { name: 'Ikan Patin', rarity: 'common', basePrice: 800, weight: 35 },
      { name: 'Ikan Kakap', rarity: 'common', basePrice: 750, weight: 30 },
      { name: 'Ikan Arwana', rarity: 'uncommon', basePrice: 2500, weight: 18 },
      { name: 'Ikan Tapah', rarity: 'rare', basePrice: 5000, weight: 12 },
      { name: 'Ikan Siluk', rarity: 'epic', basePrice: 15000, weight: 3 },
      { name: 'Ikan Jelawat', rarity: 'common', basePrice: 900, weight: 28 },
      { name: 'Udang Galah', rarity: 'uncommon', basePrice: 3000, weight: 18 },
      { name: 'Arwana Golden', rarity: 'rare', basePrice: 9000, weight: 10 },
      { name: 'Buaya Sungai Kecil', rarity: 'epic', basePrice: 25000, weight: 3 },
      { name: 'Spirit River Fish', rarity: 'legendary', basePrice: 60000, weight: 1 }
    ]
  },
  Laut: {
    minLevel: 36,
    maxLevel: 50,
    desc: 'Lautan luas tak bertepi',
    fishes: [
      { name: 'Ikan Tuna', rarity: 'common', basePrice: 3000, weight: 30 },
      { name: 'Ikan Marlin', rarity: 'uncommon', basePrice: 8000, weight: 25 },
      { name: 'Ikan Todak', rarity: 'rare', basePrice: 20000, weight: 18 },
      { name: 'Hiu Biru', rarity: 'epic', basePrice: 50000, weight: 12 },
      { name: 'Ikan Dewa Laut', rarity: 'legendary', basePrice: 150000, weight: 8 },
      { name: 'Naga Laut', rarity: 'mythic', basePrice: 500000, weight: 1 },
      { name: 'Ikan Kerapu', rarity: 'common', basePrice: 3500, weight: 28 },
      { name: 'Lobster Laut', rarity: 'uncommon', basePrice: 12000, weight: 20 },
      { name: 'Pari Raksasa', rarity: 'rare', basePrice: 28000, weight: 15 },
      { name: 'Hiu Martil', rarity: 'epic', basePrice: 70000, weight: 10 },
      { name: 'Phoenix Sea Fish', rarity: 'legendary', basePrice: 250000, weight: 4 }
    ]
  },
  Abyss: {
    minLevel: 100,
    maxLevel: 1000,
    desc: 'Kedalaman tak terkira — wilayah para legenda',
    fishes: [
      { name: 'Ikan Angler', rarity: 'uncommon', basePrice: 25000, weight: 25 },
      { name: 'Ikan Oarfish', rarity: 'rare', basePrice: 80000, weight: 22 },
      { name: 'Ikan Gulper Eel', rarity: 'rare', basePrice: 150000, weight: 20 },
      { name: 'Megalodon Muda', rarity: 'epic', basePrice: 400000, weight: 15 },
      { name: 'Leviathan Kecil', rarity: 'legendary', basePrice: 1000000, weight: 10 },
      { name: 'Kraken Baby', rarity: 'mythic', basePrice: 3000000, weight: 6 },
      { name: 'Poseidon Fish', rarity: 'divine', basePrice: 9999999, weight: 2 },
      { name: 'Shadow Lantern Fish', rarity: 'rare', basePrice: 200000, weight: 18 },
      { name: 'Abyss Jelly', rarity: 'epic', basePrice: 600000, weight: 12 },
      { name: 'Void Eel', rarity: 'legendary', basePrice: 1800000, weight: 8 },
      { name: 'Ancient Megalodon', rarity: 'mythic', basePrice: 5000000, weight: 4 },
      { name: 'Eldritch Leviathan', rarity: 'divine', basePrice: 15000000, weight: 1 }
    ]
  }
}

const FISHING_MESSAGES = [
  [
    'Menyiapkan kail di [{LOC}]...',
    'Menggulung senar pancing di [{LOC}]...',
    'Membuka kotak perlengkapan di [{LOC}]...',
    'Memasang umpan ke kail di [{LOC}]...',
    'Memakai sarung tangan pancing...'
  ],
  [
    'SYUUUT! Melemparkan umpan ke air...',
    'WUUUSH! Umpan melayang jauh ke tengah...',
    'SPLASH! Senar melesat deras ke permukaan...',
    'HIYAAA! Lempar umpan dengan presisi...',
    'ZIIING! Senar menegang saat umpan jatuh...'
  ],
  [
    'Menunggu ikan mendekat...',
    'Mengamati gerakan air...',
    'Duduk sambil menikmati suasana...',
    'Bersiul kecil menunggu gigitan...',
    'Meneguk teh sambil bersabar...',
    'Angin sepoi-sepoi, suasana tenang...',
    'Menatap tajam permukaan air...',
    'Mengusir nyamuk yang mengganggu...'
  ],
  [
    'Pelampung bergerak...',
    'Ada riak kecil di permukaan...',
    'Senar sedikit bergetar...',
    'Sesuatu mendekat dari bawah...',
    'Pelampung mulai goyang-goyang...',
    'Tarikan pertama terasa!!'
  ],
  [
    'HAPP! Ada yang menyambar umpan!',
    'TUK TUK! Kail bergetar hebat!',
    'WUOOOSH! Senar menegang kencang!',
    'TARIK!!! Kail ditarik sesuatu besar!',
    'SPLASH SPLASH! Air bergolak di sana!'
  ]
]

const RARITY_COLORS = {
  common:    '[C]',
  uncommon:  '[U]',
  rare:      '[R]',
  epic:      '[E]',
  legendary: '[L]',
  mythic:    '[M]',
  divine:    '[D]'
}

// ═══════════════════════════════════════════════════
//                  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, i) => sum + i.weight, 0)
  let rand = Math.random() * totalWeight
  for (const item of items) {
    rand -= item.weight
    if (rand <= 0) return item
  }
  return items[items.length - 1]
}

function getUserLocation(user) {
  return user.location || 'Empang'
}

function getLocationData(locName) {
  return LOCATIONS[locName] || LOCATIONS['Empang']
}

function getRodConditionText(rod) {
  if (rod >= 80) return { text: 'Sangat Baik', color: 'hijau' }
  if (rod >= 60) return { text: 'Baik', color: 'kuning' }
  if (rod >= 40) return { text: 'Cukup', color: 'oranye' }
  if (rod >= 20) return { text: 'Buruk', color: 'merah' }
  return { text: 'Hampir Rusak', color: 'kritis' }
}

function calculateRodBonus(rod) {
  if (rod >= 80) return 1.0
  if (rod >= 60) return 0.85
  if (rod >= 40) return 0.65
  if (rod >= 20) return 0.40
  return 0.20
}

function rollFishForRod(fishes, rod) {
  if (rod < 30) {
    const adjusted = fishes.map(f => ({
      ...f,
      weight: f.rarity === 'common' ? f.weight * 4 :
              f.rarity === 'uncommon' ? f.weight * 2 :
              Math.max(f.weight * 0.3, 0.1)
    }))
    return weightedRandom(adjusted)
  }
  return weightedRandom(fishes)
}

function getBaitBonus(baitName) {
  if (!baitName || baitName === 'None') return 1.0
  for (const [k, v] of Object.entries(BAITS)) {
    if (baitName.toLowerCase().includes(k)) return v.bonus
  }
  return 1.0
}

function formatMoney(n) {
  return Number(n || 0).toLocaleString('id-ID')
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// Ambil user dari database.json, lengkapi stat mancing bila belum ada.
// Uang awal 1000 agar pemain baru bisa beli umpan termurah.
function getFishUser(jid, pushname) {
  const db = joDatabase.loadDB()
  if (!db.users[jid]) {
    joDatabase.addUser(jid, pushname || '', '')
  }
  const user = db.users[jid]
  if (!user) return null
  if (user.money === undefined || user.money === null) user.money = 1000
  if (user.level === undefined || user.level === null) user.level = 0
  if (user.rod === undefined || user.rod === null) user.rod = 100
  if (!user.bait) user.bait = 'None'
  if (!user.bait_count) user.bait_count = 0
  if (!user.location) user.location = 'Empang'
  if (!user.total_tangkapan) user.total_tangkapan = 0
  if (!user.inventory) user.inventory = []
  return user
}

function saveFish() {
  try { joDatabase.saveDB() } catch {}
}

// ── Helper jual ikan: cari index ikan by nomor (1-based) atau nama ──
function findFishIndex(inventory, query) {
  if (!query) return -1
  const q = String(query).trim().toLowerCase()
  if (!q) return -1
  if (/^\d+$/.test(q)) {
    const idx = parseInt(q, 10) - 1
    if (idx >= 0 && idx < inventory.length) return idx
    return -1
  }
  let idx = inventory.findIndex(i => (i.name || '').toLowerCase() === q)
  if (idx !== -1) return idx
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
  const nq = norm(q)
  idx = inventory.findIndex(i => norm(i.name).includes(nq))
  if (idx !== -1) return idx
  idx = inventory.findIndex(i => (i.name || '').toLowerCase().includes(q))
  return idx
}

// ── Helper jual ikan: pecah sisa teks jadi { fishQuery, qty } ──
function parseFishAndQty(restText) {
  const t = (restText || '').trim()
  if (!t) return { mode: 'list' }
  if (/^all$/i.test(t)) return { mode: 'all' }
  const mQty = t.match(/^(.+?)\s+(\d+|all)$/i)
  if (mQty) {
    return { mode: 'pick', fishQuery: mQty[1].trim(), qtyRaw: mQty[2].toLowerCase() }
  }
  return { mode: 'pick', fishQuery: t, qtyRaw: null }
}

function fishListText(inventory) {
  return inventory.map((item, i) =>
    `${i + 1}. ${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${item.count}\n   Rp ${formatMoney(item.lastPrice || 0)}/ekor`
  ).join('\n')
}

// ═══════════════════════════════════════════════════
//   BUTTON HELPER — buttons, KECUALI ada tag/mention
//   (pesan yang menandai user dikirim teks biasa)
// ═══════════════════════════════════════════════════

function toSections10(rows, title = 'Pilih') {
  const sections = []
  for (let i = 0; i < rows.length; i += 10)
    sections.push({ title: i === 0 ? title : `${title} ${i / 10 + 1}`, rows: rows.slice(i, i + 10) })
  return sections
}

async function sendFishButtons(bob, jid, text, buttons, opts = {}) {
  const hasTag = Array.isArray(opts.mentions) && opts.mentions.length > 0
  if (!hasTag && buttons && buttons.length > 0) {
    try {
      const list_button = []
      for (const b of buttons) {
        if (b.type === 'list') {
          list_button.push({ name: 'single_select', buttonParamsJson: JSON.stringify({ title: b.title, sections: b.sections }) })
        } else {
          list_button.push({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: b.title, id: b.id }) })
        }
      }
      await bob.sendButton(jid, text, opts.footer || 'Fishing Game', opts.header || 'MANCING', list_button)
      return true
    } catch (e) {}
  }
  try {
    await bob.sendMessage(jid,
      { text, ...(opts.mentions ? { mentions: opts.mentions } : {}) },
      opts.quoted ? { quoted: opts.quoted } : {})
    return true
  } catch (e2) {
    return false
  }
}

// ═══════════════════════════════════════════════════
//                   ACTIONS
// ═══════════════════════════════════════════════════

async function cmdMancing(bob, m, ctx) {
  const { prefix, sender, pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database. Pakai command dulu ya.')
  if (fishingActive.get(sender)) return reply('Kamu sedang memancing! Tunggu hasilnya dulu.')

  const cooldownTime = 30_000
  const lastFish = fishCooldown.get(sender) || 0
  if (Date.now() - lastFish < cooldownTime) {
    const sisa = Math.ceil((cooldownTime - (Date.now() - lastFish)) / 1000)
    return reply(`Kamu masih lelah memancing! Tunggu *${sisa} detik* lagi.`)
  }

  if (!user.bait || user.bait === 'None' || user.bait_count <= 0) {
    await sendFishButtons(bob, m.chat,
      `*Kamu tidak punya umpan!*\n\nBeli umpan dulu, ketuk tombol di bawah`,
      [{ title: 'Lihat Umpan', id: `${prefix}buyumpan` }],
      { quoted: m, footer: 'Fishing Game', header: 'UMPAN HABIS' })
    return
  }

  if (user.rod <= 0) {
    return reply(`*Pancinganmu sudah hancur!* Beli pancingan baru dulu dengan \`${prefix}repairing\``)
  }

  const myLoc = getUserLocation(user)
  const locData = getLocationData(myLoc)

  const lvl = user.level || 0
  if (lvl < locData.minLevel) {
    return reply(`Level kamu tidak cukup untuk memancing di *${myLoc}*!\nLevel butuh: *${locData.minLevel}*\nLevel kamu: *${lvl}*`)
  }

  fishingActive.set(sender, true)
  try {
    const phase1Delay = [2000, 3000, 4000][Math.floor(Math.random() * 3)]
    const phase2Delay = [1500, 2000, 2500][Math.floor(Math.random() * 3)]
    const waitDelay   = [5000, 10000, 15000, 30000, 60000][Math.floor(Math.random() * 5)]
    const phase4Delay = [2000, 3000][Math.floor(Math.random() * 2)]
    const phase5Delay = [1000, 1500][Math.floor(Math.random() * 2)]

    const sentMsg = await bob.sendMessage(m.chat, {
      text: randomFromArray(FISHING_MESSAGES[0]).replace('{LOC}', myLoc)
    }, { quoted: m })

    const msgKey = sentMsg && sentMsg.key

    const editMsg = async (text) => {
      try {
        if (!msgKey) throw new Error('no-key')
        await bob.relayMessage(m.chat, {
          protocolMessage: {
            key: msgKey,
            type: 14,
            editedMessage: { conversation: text }
          }
        }, {})
      } catch {
        await bob.sendMessage(m.chat, { text }, { quoted: m })
      }
    }

    await sleep(phase1Delay)
    await editMsg(randomFromArray(FISHING_MESSAGES[1]).replace('{LOC}', myLoc))
    await sleep(phase2Delay)
    await editMsg(randomFromArray(FISHING_MESSAGES[2]).replace('{LOC}', myLoc))
    await sleep(waitDelay)
    await editMsg(randomFromArray(FISHING_MESSAGES[3]).replace('{LOC}', myLoc))
    await sleep(phase4Delay)
    await editMsg(randomFromArray(FISHING_MESSAGES[4]).replace('{LOC}', myLoc))
    await sleep(phase5Delay)

    const rod = user.rod
    const baitBonus = getBaitBonus(user.bait)
    const rodBonus  = calculateRodBonus(rod)
    const fish = rollFishForRod(locData.fishes, rod)

    const rarityIcon = RARITY_COLORS[fish.rarity] || '[?]'

    const rawPrice = Math.floor(fish.basePrice * baitBonus * rodBonus)
    const priceVariance = 0.8 + Math.random() * 0.4
    const marketPrice = Math.floor(rawPrice * priceVariance)

    user.bait_count -= 1
    if (user.bait_count <= 0) {
      user.bait = 'None'
      user.bait_count = 0
    }

    const rodDamage = Math.floor(Math.random() * 5) + 1
    user.rod = Math.max(0, rod - rodDamage)
    user.total_tangkapan = (user.total_tangkapan || 0) + 1

    if (!user.inventory) user.inventory = []
    const existingFish = user.inventory.find(i => i.name === fish.name)
    if (existingFish) {
      existingFish.count = (existingFish.count || 1) + 1
      existingFish.lastPrice = marketPrice
    } else {
      user.inventory.push({ name: fish.name, rarity: fish.rarity, count: 1, lastPrice: marketPrice })
    }
    saveFish()

    const rodCond = getRodConditionText(user.rod)
    const rodWarning = user.rod < 25 ? `\n\n*PERINGATAN!* Pancinganmu hampir rusak (${user.rod}%)!\nKualitas ikan yang didapat akan sangat buruk!` : ''

    await editMsg(
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*HASIL MEMANCING*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Lokasi  : *${myLoc}*\n` +
      `Umpan   : *${user.bait === 'None' ? 'Habis' : user.bait}*\n\n` +
      `${rarityIcon} *${fish.name}*\n` +
      `Rarity  : *${fish.rarity.toUpperCase()}*\n` +
      `Harga   : *Rp ${formatMoney(marketPrice)}*\n\n` +
      `Rod     : ${rodCond.text} (${user.rod}%)\n` +
      `Stok Umpan: *${user.bait_count}x*\n` +
      `Total Tangkapan: *${user.total_tangkapan}*\n\n` +
      `Jual ke bot: \`${prefix}jualikan bot\`\n` +
      `Jual ke user: \`${prefix}jualikan @user\`` +
      rodWarning
    )

    await sendFishButtons(bob, m.chat,
      `*Mau apa lagi?*`,
      [
        { title: 'Mancing Lagi', id: `${prefix}mancing` },
        { title: 'Jual ke Bot', id: `${prefix}jualikan bot` },
        { title: 'Inventory', id: `${prefix}inventory` },
      ], { quoted: m, footer: 'Fishing Game', header: 'SELESAI' })
  } finally {
    fishingActive.delete(sender)
    fishCooldown.set(sender, Date.now())
  }
}

async function cmdInventory(bob, m, ctx) {
  const { prefix, pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  if (!user.inventory || user.inventory.length === 0) {
    return reply(`*Inventarismu kosong!*\nCoba mancing dulu: \`${prefix}mancing\``)
  }

  const list = user.inventory.map((item, i) =>
    `${i + 1}. ${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${item.count}\n   ~Rp ${formatMoney(item.lastPrice || 0)} /ekor`
  ).join('\n')

  const totalVal = user.inventory.reduce((s, i) => s + (i.lastPrice || 0) * i.count, 0)

  await sendFishButtons(bob, m.chat,
    `*INVENTARIS - ${(user.name || m.sender.split('@')[0]).toUpperCase()}*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `${list}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `*Total Estimasi: Rp ${formatMoney(totalVal)}*\n` +
    `Total Jenis: ${user.inventory.length} jenis ikan`,
    [
      { title: 'Jual ke Bot', id: `${prefix}jualikan bot` },
      { title: 'Mancing', id: `${prefix}mancing` },
    ], { quoted: m, footer: 'Fishing Game', header: 'TAS IKAN' })
}

async function cmdBuyumpan(bob, m, ctx) {
  const { prefix, pushname, reply, q } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  const text = (q || '').trim()

  if (!text) {
    const rows = Object.entries(BAITS).map(([key, b]) => ({
      title: b.name,
      description: `Rp ${formatMoney(b.price)} | Bonus x${b.bonus}`,
      id: `${prefix}buyumpan ${key}`
    }))

    await sendFishButtons(bob, m.chat,
      `*TOKO UMPAN PANCING*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Uangmu: Rp ${formatMoney(user.money)}\n` +
      `Ketuk umpan untuk beli 1 biji`,
      [{ type: 'list', title: 'Pilih Umpan', sections: toSections10(rows, 'Daftar Umpan') }],
      { quoted: m, footer: 'Fishing Game', header: 'TOKO UMPAN' })
    return
  }

  const parts = text.split(/\s+/)
  const baitName = parts[0].toLowerCase()
  const qty = parseInt(parts[1]) || 1

  let matchedBait = null
  for (const [k, v] of Object.entries(BAITS)) {
    if (k.startsWith(baitName) || baitName.startsWith(k) || v.name.toLowerCase().includes(baitName)) {
      matchedBait = v
      break
    }
  }

  if (!matchedBait) {
    return reply(`Umpan *"${text}"* tidak ditemukan!\nKetik \`${prefix}buyumpan\` untuk melihat daftar.`)
  }

  if (qty < 1 || qty > 100) return reply('Jumlah beli harus antara 1 - 100.')

  const totalCost = matchedBait.price * qty
  if ((user.money || 0) < totalCost) {
    return reply(
      `*Uang tidak cukup!*\n` +
      `Harga total: Rp ${formatMoney(totalCost)}\n` +
      `Uang kamu: Rp ${formatMoney(user.money)}\n` +
      `Kurang: Rp ${formatMoney(totalCost - (user.money || 0))}`
    )
  }

  if (user.bait !== 'None' && user.bait !== matchedBait.name && user.bait_count > 0) {
    return reply(
      `Kamu masih punya *${user.bait_count}x ${user.bait}*!\n` +
      `Habiskan dulu sebelum ganti umpan.\n` +
      `Atau ketik \`${prefix}buangumpan\` untuk membuang umpan lama.`
    )
  }

  user.money -= totalCost
  user.bait = matchedBait.name
  user.bait_count = (user.bait_count || 0) + qty
  saveFish()

  await sendFishButtons(bob, m.chat,
    `*BERHASIL BELI UMPAN!*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `${matchedBait.name} x${qty}\n` +
    `Total Bayar: Rp ${formatMoney(totalCost)}\n` +
    `Sisa Uang: Rp ${formatMoney(user.money)}\n` +
    `Stok Umpan: *${user.bait_count}x*`,
    [
      { title: 'Mancing', id: `${prefix}mancing` },
      { title: 'Beli Lagi', id: `${prefix}buyumpan` },
    ], { quoted: m, footer: 'Fishing Game', header: 'TOKO UMPAN' })
}

async function cmdBuangumpan(bob, m, ctx) {
  const { pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  if (!user.bait || user.bait === 'None' || user.bait_count <= 0) {
    return reply('Kamu tidak punya umpan untuk dibuang.')
  }
  const oldBait = user.bait
  const oldCount = user.bait_count
  user.bait = 'None'
  user.bait_count = 0
  saveFish()
  return reply(`*${oldCount}x ${oldBait}* telah dibuang.`)
}

async function cmdPindah(bob, m, ctx) {
  const { prefix, pushname, reply, q } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  const target = (q || '').trim()

  if (!target) {
    const currentLvl = user.level || 0
    const rows = Object.entries(LOCATIONS).map(([name, loc]) => ({
      title: `${currentLvl >= loc.minLevel ? '[buka]' : '[kunci]'} ${name}`,
      description: `Level ${loc.minLevel}-${loc.maxLevel} | ${loc.desc}`,
      id: `${prefix}pindah ${name}`
    }))

    await sendFishButtons(bob, m.chat,
      `*DAFTAR LOKASI MEMANCING*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Lokasi sekarang: *${getUserLocation(user)}*\n` +
      `Level kamu: *${currentLvl}*\n` +
      `Ketuk lokasi untuk pindah`,
      [{ type: 'list', title: 'Pilih Lokasi', sections: toSections10(rows, 'Lokasi') }],
      { quoted: m, footer: 'Fishing Game', header: 'PETA' })
    return
  }

  const locKey = Object.keys(LOCATIONS).find(k => k.toLowerCase() === target.toLowerCase())
  if (!locKey) {
    return reply(`Lokasi *"${target}"* tidak ditemukan!\nKetik \`${prefix}pindah\` untuk daftar lokasi.`)
  }

  const locData = LOCATIONS[locKey]
  const userLevel = user.level || 0

  if (userLevel < locData.minLevel) {
    return reply(
      `*Lokasi Terkunci!*\n\n` +
      `Lokasi: *${locKey}*\n` +
      `Level butuh: *${locData.minLevel}*\n` +
      `Level kamu: *${userLevel}*\n` +
      `Kurang: *${locData.minLevel - userLevel} level lagi*`
    )
  }

  if (getUserLocation(user) === locKey) {
    return reply(`Kamu sudah berada di *${locKey}*!`)
  }

  user.location = locKey
  saveFish()

  await sendFishButtons(bob, m.chat,
    `*PINDAH LOKASI BERHASIL!*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Lokasi Baru: *${locKey}*\n` +
    `${locData.desc}\n\n` +
    `Ikan tersedia:\n` +
    locData.fishes.map(f => `  ${RARITY_COLORS[f.rarity]} ${f.name} — Rp ${formatMoney(f.basePrice)}`).join('\n'),
    [{ title: 'Mancing', id: `${prefix}mancing` }],
    { quoted: m, footer: 'Fishing Game', header: 'PETA' })
}

async function cmdJualikan(bob, m, ctx) {
  const { prefix, pushname, reply, q } = ctx
  const sender = m.sender
  const user = getFishUser(sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  if (!user.inventory || user.inventory.length === 0) {
    return reply(`*Inventarismu kosong!* Tidak ada ikan untuk dijual.\nCoba mancing dulu: \`${prefix}mancing\``)
  }

  const rawText = (q || '').trim()
  const firstToken = (rawText.split(/\s+/)[0] || '').toLowerCase()

  const mentioned = (m.mentionedJid && m.mentionedJid[0]) || null
  const tagMatch = rawText.match(/@(\d+)/)
  let buyerJid = mentioned || (tagMatch ? tagMatch[1] + '@s.whatsapp.net' : null)
  if (!buyerJid && m.quoted && m.quoted.sender && firstToken !== 'bot' && firstToken !== 'npc') {
    buyerJid = m.quoted.sender
  }
  const isBotTarget = !buyerJid && (firstToken === 'bot' || firstToken === 'npc' || firstToken === '' ||
    (!buyerJid && (() => {
      const probe = parseFishAndQty(rawText)
      if (probe.mode === 'all') return true
      if (probe.mode === 'pick' && findFishIndex(user.inventory, probe.fishQuery) !== -1) return true
      return false
    })()))

  const stripTarget = (t) => {
    let s = ' ' + (t || '') + ' '
    s = s.replace(/\s+(bot|npc)\s+/i, ' ')
    s = s.replace(/@\d+\s*/g, ' ')
    if (buyerJid) {
      const num = buyerJid.split('@')[0].replace(/[^0-9]/g, '')
      if (num) s = s.replace(new RegExp(`\\s+${num}\\s*`, 'g'), ' ')
    }
    return s.trim()
  }
  const restText = isBotTarget ? rawText.replace(/^\s*(bot|npc)\s*/i, '').trim() : stripTarget(rawText)

  // ═══════════════════════════════════════════
  //  A. JUAL KE BOT (pilih ikan via list)
  // ═══════════════════════════════════════════
  if (isBotTarget) {
    const parsed = parseFishAndQty(restText)

    if (parsed.mode === 'list') {
      const rows = user.inventory.map((item, i) => ({
        title: `${i + 1}. ${item.name} x${item.count}`,
        description: `Rp ${formatMoney((item.lastPrice || 0) * item.count)} total | ~Rp ${formatMoney(item.lastPrice || 0)}/ekor`,
        id: `${prefix}jualikan bot ${i + 1}`
      }))
      rows.push({
        title: 'Jual SEMUA ikan',
        description: `Total ±Rp ${formatMoney(user.inventory.reduce((s, i) => s + (i.lastPrice || 0) * i.count, 0))}`,
        id: `${prefix}jualikan bot all`
      })
      await sendFishButtons(bob, m.chat,
        `*JUAL IKAN KE BOT*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `${fishListText(user.inventory)}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*Pilih ikan* lewat list di bawah\n` +
        `Atau ketik manual:\n` +
        `> \`${prefix}jualikan bot <nomor>\` — jual 1 jenis\n` +
        `> \`${prefix}jualikan bot <nomor> <jumlah>\` — jual sebagian\n` +
        `> \`${prefix}jualikan bot all\` — jual semua`,
        [{ type: 'list', title: 'Pilih Ikan', sections: toSections10(rows, 'Ikan Dijual') }],
        { quoted: m, footer: 'Fishing Game', header: 'TOKO IKAN' })
      return
    }

    if (parsed.mode === 'all') {
      const totalItems = user.inventory.reduce((s, i) => s + i.count, 0)
      let totalEarned = 0
      const salesDetail = []

      for (const item of user.inventory) {
        const taxRate = 0.05 + Math.random() * 0.04
        const gross = item.lastPrice * item.count
        const tax = Math.floor(gross * taxRate)
        const net = gross - tax
        totalEarned += net
        salesDetail.push(
          `${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${item.count}\n` +
          `   Rp ${formatMoney(gross)} — Pajak ${(taxRate * 100).toFixed(0)}% (Rp ${formatMoney(tax)})\n` +
          `   Terima: Rp ${formatMoney(net)}`
        )
      }

      user.money = (user.money || 0) + totalEarned
      user.inventory = []
      saveFish()

      await sendFishButtons(bob, m.chat,
        `*JUAL KE BOT BERHASIL!*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        salesDetail.join('\n\n') +
        `\n━━━━━━━━━━━━━━━━━━━━\n` +
        `Total Terjual: *${totalItems} ekor*\n` +
        `Total Diterima: *Rp ${formatMoney(totalEarned)}*\n` +
        `Uang Kamu Kini: *Rp ${formatMoney(user.money)}*`,
        [
          { title: 'Mancing', id: `${prefix}mancing` },
          { title: 'Inventory', id: `${prefix}inventory` },
        ], { quoted: m, footer: 'Fishing Game', header: 'TOKO IKAN' })
      return
    }

    const idx = findFishIndex(user.inventory, parsed.fishQuery)
    if (idx === -1) {
      return reply(
        `Ikan *"${parsed.fishQuery}"* tidak ada di inventory!\n\n` +
        `${fishListText(user.inventory)}\n\n` +
        `Pakai nomor: \`${prefix}jualikan bot 1\`\n` +
        `Atau: \`${prefix}jualikan bot all\``
      )
    }
    const item = user.inventory[idx]

    let qty = item.count
    if (parsed.qtyRaw === null && item.count > 1) {
      const opt = []
      opt.push({ title: `1 ekor — Rp ${formatMoney(item.lastPrice || 0)}`, description: item.name, id: `${prefix}jualikan bot ${idx + 1} 1` })
      if (item.count > 5) opt.push({ title: `5 ekor`, description: item.name, id: `${prefix}jualikan bot ${idx + 1} 5` })
      if (item.count > 10) opt.push({ title: `10 ekor`, description: item.name, id: `${prefix}jualikan bot ${idx + 1} 10` })
        if (item.count > 2) opt.push({ title: `Setengah (${Math.floor(item.count / 2)} ekor)`, description: item.name, id: `${prefix}jualikan bot ${idx + 1} ${Math.floor(item.count / 2)}` })
      opt.push({ title: `Semua (${item.count} ekor)`, description: `Total ±Rp ${formatMoney((item.lastPrice || 0) * item.count)}`, id: `${prefix}jualikan bot ${idx + 1} all` })
      await sendFishButtons(bob, m.chat,
        `${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${item.count}\n` +
        `~Rp ${formatMoney(item.lastPrice || 0)}/ekor\n\n` +
        `*Mau jual berapa ekor?* Pilih di bawah\n` +
        `Atau ketik: \`${prefix}jualikan bot ${idx + 1} <jumlah>\``,
        [{ type: 'list', title: 'Pilih Jumlah', sections: toSections10(opt, 'Jumlah') }],
        { quoted: m, footer: 'Fishing Game', header: 'TOKO IKAN' })
      return
    }
    if (parsed.qtyRaw !== null && parsed.qtyRaw !== 'all') {
      qty = parseInt(parsed.qtyRaw, 10)
      if (!Number.isFinite(qty) || qty < 1) return reply('Jumlah harus angka ≥ 1 atau *all*.')
      if (qty > item.count) return reply(`Stok *${item.name}* cuma *${item.count} ekor*!`)
    }

    const taxRate = 0.05 + Math.random() * 0.04
    const gross = (item.lastPrice || 0) * qty
    const tax = Math.floor(gross * taxRate)
    const net = gross - tax
    user.money = (user.money || 0) + net
    item.count -= qty
    if (item.count <= 0) user.inventory.splice(idx, 1)
    saveFish()

    await sendFishButtons(bob, m.chat,
      `*JUAL KE BOT BERHASIL!*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${qty}\n` +
      `Kotor: Rp ${formatMoney(gross)}\n` +
      `Pajak ${(taxRate * 100).toFixed(0)}%: Rp ${formatMoney(tax)}\n` +
      `Terima: *Rp ${formatMoney(net)}*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Uang Kini: *Rp ${formatMoney(user.money)}*\n` +
      `Sisa *${item.name}*: *${Math.max(0, ((user.inventory[idx] || {}).count || 0))} ekor*`,
      [
        { title: 'Jual Lagi', id: `${prefix}jualikan bot` },
        { title: 'Mancing', id: `${prefix}mancing` },
        { title: 'Inventory', id: `${prefix}inventory` },
      ], { quoted: m, footer: 'Fishing Game', header: 'TOKO IKAN' })
    return
  }

  // ═══════════════════════════════════════════
  //  B. JUAL KE TEMAN (pilih ikan via list)
  // ═══════════════════════════════════════════
  if (!buyerJid) {
    return reply(
      `*Sebutkan target pembeli!*\n\n` +
      `Cara pakai:\n` +
      `> \`${prefix}jualikan @user\` — pilih ikan via list\n` +
      `> \`${prefix}jualikan @user <nomor>\` — tawar 1 jenis\n` +
      `> \`${prefix}jualikan @user <nomor> <jumlah>\` — tawar sebagian\n` +
      `> \`${prefix}jualikan @user all\` — tawar semua\n` +
      `> Reply pesan user + \`${prefix}jualikan\`\n` +
      `> \`${prefix}jualikan bot\` — jual ke bot (pilih via list)`
    )
  }

  if (buyerJid === sender) return reply('Kamu tidak bisa jual ke diri sendiri!')

  const db = joDatabase.loadDB()
  const buyer = db.users[buyerJid]
  if (!buyer) return reply('User tersebut tidak terdaftar di database!')
  const buyerNum = buyerJid.split('@')[0]
  const parsed = parseFishAndQty(restText)
  const buyerName = buyer.name || buyerNum
  const sellerName = user.name || sender.split('@')[0]

  const makeOffer = async (items, totalPrice) => {
    const old = sellSessions.get(buyerJid)
    if (old && old.timeout) clearTimeout(old.timeout)
    sellSessions.set(buyerJid, {
      sellerId: sender,
      sellerName,
      buyerName,
      inventory: JSON.parse(JSON.stringify(items)),
      totalPrice,
      createdAt: Date.now(),
      timeout: setTimeout(() => {
        sellSessions.delete(buyerJid)
      }, 60_000)
    })
    const fishList = items.map(i =>
      `${RARITY_COLORS[i.rarity] || '[?]'} ${i.name} x${i.count} — Rp ${formatMoney((i.lastPrice || 0) * i.count)}`
    ).join('\n')
    // ADA TAG (penjual+pembeli) -> teks biasa, TANPA buttons
    await bob.sendMessage(m.chat, {
      text:
        `*PENAWARAN IKAN*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Penjual: *@${sender.split('@')[0]}*\n` +
        `Pembeli: *@${buyerNum}*\n\n` +
        `Daftar Ikan:\n${fishList}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Total Harga: *Rp ${formatMoney(totalPrice)}*\n\n` +
        `Balas *terima* / *tolak* untuk merespons.\n` +
        `Kadaluarsa dalam 60 detik`,
      mentions: [sender, buyerJid]
    }, { quoted: m })
  }

  if (parsed.mode === 'list') {
    const rows = user.inventory.map((it, i) => ({
      title: `${i + 1}. ${it.name} x${it.count}`,
      description: `Rp ${formatMoney((it.lastPrice || 0) * it.count)} total`,
      id: `${prefix}jualikan @${buyerNum} ${i + 1}`
    }))
    rows.push({
      title: 'Tawarkan SEMUA ikan',
      description: `Total ±Rp ${formatMoney(user.inventory.reduce((s, i) => s + (i.lastPrice || 0) * i.count, 0))} ke @${buyerNum}`,
      id: `${prefix}jualikan @${buyerNum} all`
    })
    // PILIH IKAN via list buttons (tanpa tag agar buttons tampil;
    // buyer tetap di-tag saat penawaran dibuat)
    await sendFishButtons(bob, m.chat,
      `*JUAL KE TEMAN*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Pembeli: @${buyerNum}\n\n` +
      `${fishListText(user.inventory)}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Pilih ikan yang mau ditawarkan:\n` +
      `Atau ketik: \`${prefix}jualikan @${buyerNum} <nomor> [jumlah]\``,
      [{ type: 'list', title: 'Pilih Ikan', sections: toSections10(rows, 'Ikan Ditawarkan') }],
      { quoted: m, footer: 'Fishing Game', header: 'JUAL IKAN' })
    return
  }

  if (parsed.mode === 'all') {
    const items = JSON.parse(JSON.stringify(user.inventory))
    const totalPrice = items.reduce((s, i) => s + (i.lastPrice || 0) * i.count, 0)
    await makeOffer(items, totalPrice)
    return
  }

  const idx = findFishIndex(user.inventory, parsed.fishQuery)
  if (idx === -1) {
    return reply(
      `Ikan *"${parsed.fishQuery}"* tidak ada di inventory!\n\n` +
      `${fishListText(user.inventory)}\n\n` +
      `Pakai nomor: \`${prefix}jualikan @${buyerNum} 1\``
    )
  }
  const item = user.inventory[idx]

  if (parsed.qtyRaw === null && item.count > 1) {
    // PILIH JUMLAH via list buttons (tanpa tag agar buttons tampil)
    const opt = []
    opt.push({ title: `1 ekor`, description: `${item.name} — Rp ${formatMoney(item.lastPrice || 0)}`, id: `${prefix}jualikan @${buyerNum} ${idx + 1} 1` })
    if (item.count > 5) opt.push({ title: `5 ekor`, description: item.name, id: `${prefix}jualikan @${buyerNum} ${idx + 1} 5` })
    if (item.count > 10) opt.push({ title: `10 ekor`, description: item.name, id: `${prefix}jualikan @${buyerNum} ${idx + 1} 10` })
    if (item.count > 2) opt.push({ title: `Setengah (${Math.floor(item.count / 2)} ekor)`, description: item.name, id: `${prefix}jualikan @${buyerNum} ${idx + 1} ${Math.floor(item.count / 2)}` })
    opt.push({ title: `Semua (${item.count} ekor)`, description: `Total Rp ${formatMoney((item.lastPrice || 0) * item.count)}`, id: `${prefix}jualikan @${buyerNum} ${idx + 1} all` })
    await sendFishButtons(bob, m.chat,
      `*JUAL KE @${buyerNum}*\n` +
      `${RARITY_COLORS[item.rarity] || '[?]'} *${item.name}* x${item.count}\n\n` +
      `Mau tawarkan berapa ekor? Pilih:`,
      [{ type: 'list', title: 'Pilih Jumlah', sections: toSections10(opt, 'Jumlah') }],
      { quoted: m, footer: 'Fishing Game', header: 'JUMLAH' })
    return
  }
  let qty = item.count
  if (parsed.qtyRaw !== null && parsed.qtyRaw !== 'all') {
    qty = parseInt(parsed.qtyRaw, 10)
    if (!Number.isFinite(qty) || qty < 1) return reply('Jumlah harus angka ≥ 1 atau *all*.')
    if (qty > item.count) return reply(`Stok *${item.name}* cuma *${item.count} ekor*!`)
  }
  const offered = [{ ...item, count: qty }]
  const totalPrice = (item.lastPrice || 0) * qty
  await makeOffer(offered, totalPrice)
}

async function cmdRodinfo(bob, m, ctx) {
  const { prefix, pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  const rodCond = getRodConditionText(user.rod)
  await sendFishButtons(bob, m.chat,
    `*INFO PANCINGAN*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Kondisi: ${rodCond.text}\n` +
    `Durabilitas: *${user.rod}%*\n` +
    `Pengaruh ke harga ikan: x${calculateRodBonus(user.rod).toFixed(2)}\n\n` +
    `${user.rod < 30 ? '*KRITIS!* Pancingan hampir hancur!\nIkan yang didapat sangat buruk.' :
      user.rod < 60 ? 'Kondisi menurun, pertimbangkan repair.' :
      'Kondisi masih bagus!'}`,
    [
      { title: 'Repair', id: `${prefix}repairing` },
      { title: 'Mancing', id: `${prefix}mancing` },
    ], { quoted: m, footer: 'Fishing Game', header: 'PANCINGAN' })
}

async function cmdRepairing(bob, m, ctx) {
  const { prefix, pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  if (user.rod >= 100) return reply('Pancinganmu masih dalam kondisi sempurna!')

  const repairCost = Math.floor((100 - user.rod) * 500)
  if ((user.money || 0) < repairCost) {
    return reply(
      `*Uang tidak cukup untuk repair!*\n` +
      `Biaya repair: Rp ${formatMoney(repairCost)}\n` +
      `Uang kamu: Rp ${formatMoney(user.money)}\n` +
      `Kurang: Rp ${formatMoney(repairCost - (user.money || 0))}`
    )
  }

  const oldRod = user.rod
  user.money -= repairCost
  user.rod = 100
  saveFish()

  await sendFishButtons(bob, m.chat,
    `*REPAIR BERHASIL!*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `${oldRod}% → *100%*\n` +
    `Biaya: Rp ${formatMoney(repairCost)}\n` +
    `Sisa Uang: Rp ${formatMoney(user.money)}`,
    [{ title: 'Mancing', id: `${prefix}mancing` }],
    { quoted: m, footer: 'Fishing Game', header: 'BENGKEL' })
}

async function cmdStatmancing(bob, m, ctx) {
  const { prefix, pushname, reply } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  const rodCond = getRodConditionText(user.rod)
  const invCount = (user.inventory || []).reduce((s, i) => s + i.count, 0)
  const invVal   = (user.inventory || []).reduce((s, i) => s + (i.lastPrice || 0) * i.count, 0)

  await sendFishButtons(bob, m.chat,
    `*STATISTIK MANCING*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `User: *${user.name || m.sender.split('@')[0]}*\n` +
    `Lokasi: *${getUserLocation(user)}*\n` +
    `Level: *${user.level || 0}*\n\n` +
    `Total Tangkapan: *${user.total_tangkapan || 0} ekor*\n` +
    `Ikan di Kantong: *${invCount} ekor*\n` +
    `Nilai Kantong: *Rp ${formatMoney(invVal)}*\n\n` +
    `Umpan: *${user.bait === 'None' ? 'Kosong' : `${user.bait_count}x ${user.bait}`}*\n` +
    `Pancing: ${rodCond.text} (${user.rod}%)\n` +
    `Uang: *Rp ${formatMoney(user.money || 0)}*`,
    [
      { title: 'Mancing', id: `${prefix}mancing` },
      { title: 'Inventory', id: `${prefix}inventory` },
    ], { quoted: m, footer: 'Fishing Game', header: 'STATISTIK' })
}

async function cmdDaftarikan(bob, m, ctx) {
  const { prefix, pushname, reply, q } = ctx
  const user = getFishUser(m.sender, pushname)
  if (!user) return reply('Kamu belum terdaftar di database.')
  const locTarget = (q || '').trim()
  const locKey = locTarget
    ? Object.keys(LOCATIONS).find(k => k.toLowerCase() === locTarget.toLowerCase())
    : getUserLocation(user)

  if (!locKey) return reply(`Lokasi *"${locTarget}"* tidak ditemukan!`)

  const loc = LOCATIONS[locKey]
  const fishList = loc.fishes.map(f =>
    `${RARITY_COLORS[f.rarity]} *${f.name}*\n   ${f.rarity.toUpperCase()} | Rp ${formatMoney(f.basePrice)}`
  ).join('\n\n')

  await sendFishButtons(bob, m.chat,
    `*DAFTAR IKAN — ${locKey.toUpperCase()}*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Level: ${loc.minLevel}-${loc.maxLevel}\n\n` +
    `${fishList}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Common | Uncommon | Rare\nEpic | Legendary | Mythic | Divine`,
    [
      { title: 'Mancing', id: `${prefix}mancing` },
      { title: 'Lokasi', id: `${prefix}pindah` },
    ], { quoted: m, footer: 'Fishing Game', header: 'KATALOG' })
}

// ═══════════════════════════════════════════════════
//  ACCEPT / CANCEL (teks polos tanpa prefix)
// ═══════════════════════════════════════════════════

async function handleSellResponse(bob, m, rawText) {
  const txt = (typeof rawText === 'string' ? rawText : '').trim().toLowerCase()
  if (txt !== 'accept' && txt !== 'terima' && txt !== 'cancel' && txt !== 'tolak' && txt !== 'batal') return false
  const session = sellSessions.get(m.sender)
  if (!session) return false

  if (txt === 'accept' || txt === 'terima') {
    const db = joDatabase.loadDB()
    const seller = db.users[session.sellerId]
    const buyer  = db.users[m.sender]

    if (!seller || !buyer) {
      sellSessions.delete(m.sender)
      await m.reply('Transaksi gagal: data user tidak valid.')
      return true
    }

    clearTimeout(session.timeout)

    if (!seller.inventory) seller.inventory = []
    const kurang = session.inventory.filter(it => {
      const cur = seller.inventory.find(i => i.name === it.name)
      return !cur || (cur.count || 0) < it.count
    })
    if (kurang.length > 0) {
      sellSessions.delete(m.sender)
      // ADA TAG -> teks biasa
      await bob.sendMessage(m.chat, {
        text:
          `*TRANSAKSI DIBATALKAN!*\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `Stok *${session.sellerName}* sudah berubah!\n` +
          `Kurang: ${kurang.map(i => `${i.name} x${i.count}`).join(', ')}\n` +
          `Minta penjual buat penawaran baru.`,
        mentions: [session.sellerId, m.sender]
      }, { quoted: m })
      return true
    }

    if ((buyer.money || 0) < session.totalPrice) {
      sellSessions.delete(m.sender)
      await bob.sendMessage(m.chat, {
        text:
          `*TRANSAKSI DIBATALKAN!*\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `Uang *${session.buyerName}* tidak cukup!\n` +
          `Dibutuhkan: Rp ${formatMoney(session.totalPrice)}\n` +
          `Dimiliki: Rp ${formatMoney(buyer.money)}\n` +
          `Kurang: Rp ${formatMoney(session.totalPrice - (buyer.money || 0))}`,
        mentions: [session.sellerId, m.sender]
      }, { quoted: m })
      return true
    }

    buyer.money  -= session.totalPrice
    seller.money  = (seller.money || 0) + session.totalPrice

    if (!seller.inventory) seller.inventory = []
    for (const item of session.inventory) {
      const existing = seller.inventory.find(i => i.name === item.name)
      if (existing) {
        existing.count = Math.max(0, existing.count - item.count)
        if (existing.count === 0) seller.inventory = seller.inventory.filter(i => i.name !== item.name)
      }
    }

    if (!buyer.inventory) buyer.inventory = []
    for (const item of session.inventory) {
      const existing = buyer.inventory.find(i => i.name === item.name)
      if (existing) {
        existing.count += item.count
        existing.lastPrice = item.lastPrice
      } else {
        buyer.inventory.push({ ...item })
      }
    }

    saveFish()
    sellSessions.delete(m.sender)

    const fishSummary = session.inventory.map(i =>
      `${RARITY_COLORS[i.rarity] || '[?]'} ${i.name} x${i.count}`
    ).join('\n')

    await bob.sendMessage(m.chat, {
      text:
        `*TRANSAKSI BERHASIL!*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Ikan yang berpindah:\n${fishSummary}\n\n` +
        `*${session.sellerName}* +Rp ${formatMoney(session.totalPrice)}\n` +
        `*${session.buyerName}* -Rp ${formatMoney(session.totalPrice)}\n\n` +
        `Saldo *${session.sellerName}*: Rp ${formatMoney(seller.money)}\n` +
        `Saldo *${session.buyerName}*: Rp ${formatMoney(buyer.money)}`,
      mentions: [session.sellerId, m.sender]
    }, { quoted: m })
    return true
  }

  if (txt === 'cancel' || txt === 'tolak' || txt === 'batal') {
    const session = sellSessions.get(m.sender)
    if (!session) return false

    clearTimeout(session.timeout)
    sellSessions.delete(m.sender)

    await bob.sendMessage(m.chat, {
      text:
        `*PENAWARAN DITOLAK*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `*${session.buyerName}* menolak untuk membeli ikan dari *${session.sellerName}*.`,
      mentions: [session.sellerId, m.sender]
    }, { quoted: m })
    return true
  }
  return false
}

module.exports = {
  BAITS, LOCATIONS, RARITY_COLORS,
  fishingActive, fishCooldown, sellSessions,
  getFishUser, saveFish, findFishIndex, parseFishAndQty, fishListText,
  formatMoney, toSections10, sendFishButtons,
  getUserLocation, getLocationData, getRodConditionText, calculateRodBonus,
  cmdMancing, cmdInventory, cmdBuyumpan, cmdBuangumpan, cmdPindah,
  cmdJualikan, cmdRodinfo, cmdRepairing, cmdStatmancing, cmdDaftarikan,
  handleSellResponse
}
