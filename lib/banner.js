/**
 * Banner + log koneksi animasi untuk JojoBot By Arasya.
 * - showBanner(): animasi logo saat boot (sekali saja)
 * - createSpinner(): animasi loading saat connecting
 * - panel status: open / close / pairing dengan box rapi
 */
const chalk = require('chalk')

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const LOGO = [
    '     ██╗ ██████╗      ██╗ ██████╗    ██████╗  ██████╗ ████████╗',
    '     ██║██╔═══██╗     ██║██╔═══██╗   ██╔══██╗██╔═══██╗╚══██╔══╝',
    '     ██║██║   ██║     ██║██║   ██║   ██████╔╝██║   ██║   ██║   ',
    '██   ██║██║   ██║██   ██║██║   ██║   ██╔══██╗██║   ██║   ██║   ',
    '╚█████╔╝╚██████╔╝╚█████╔╝╚██████╔╝   ██████╔╝╚██████╔╝   ██║   ',
    ' ╚════╝  ╚═════╝  ╚════╝  ╚═════╝    ╚═════╝  ╚═════╝    ╚═╝   ',
]
const LOGO_COLORS = ['cyan', 'cyan', 'blue', 'magenta', 'magenta', 'yellow']

function wib(d = new Date()) {
    try {
        return d.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false })
    } catch { return d.toLocaleString() }
}

function botInfo() {
    let version = '?'
    try { version = require('../package.json').version || '?' } catch {}
    return {
        name: global.botName || 'JOJO - BOT',
        owner: global.ownerName || 'Arasya',
        ownerNum: (global.owner && global.owner[0]) || '-',
        version,
        pairing: global.pairingCode || 'RSYA-RAFI',
    }
}

async function showBanner() {
    try { console.clear() } catch {}
    for (let i = 0; i < LOGO.length; i++) {
        console.log(chalk.keyword(LOGO_COLORS[i % LOGO_COLORS.length]).bold(LOGO[i]))
        await sleep(55)
    }
    // shimmer: sorotan putih menyapu logo dari atas ke bawah
    await shimmerLogo()
    console.log()
    await typewrite('              ✦  JojoBot By Arasya  ✦', (t) => chalk.bold.yellow(t), 28)
    console.log()
    const info = botInfo()
    const rows = [
        ['🤖 Nama', info.name],
        ['👑 Owner', `${info.owner} (${info.ownerNum})`],
        ['📦 Versi', `v${info.version}`],
        ['🕒 Start', wib()],
        ['🔑 Pairing', info.pairing],
    ]
    const width = 46
    console.log(chalk.gray('┌' + '─'.repeat(width) + '┐'))
    for (const [k, v] of rows) {
        const line = `  ${k} : ${v}`
        console.log(chalk.gray('│') + chalk.white(line.padEnd(width)) + chalk.gray('│'))
        await sleep(60)
    }
    console.log(chalk.gray('└' + '─'.repeat(width) + '┘'))
    console.log()
}

// Sorotan terang menyapu tiap baris logo (tulis ulang via ANSI cursor)
async function shimmerLogo() {
    const n = LOGO.length
    try {
        for (let f = 0; f <= n; f++) {
            process.stdout.write(`\x1b[${n}A`)
            for (let i = 0; i < n; i++) {
                const hot = i === f
                const line = hot
                    ? chalk.bold.whiteBright(LOGO[i])
                    : chalk.keyword(LOGO_COLORS[i % LOGO_COLORS.length])(LOGO[i])
                process.stdout.write('\r\x1b[K' + line + '\n')
            }
            await sleep(95)
        }
        // repaint final (bold, warna normal)
        process.stdout.write(`\x1b[${n}A`)
        for (let i = 0; i < n; i++) {
            process.stdout.write('\r\x1b[K' + chalk.keyword(LOGO_COLORS[i % LOGO_COLORS.length]).bold(LOGO[i]) + '\n')
        }
    } catch {}
}

// Efek ketik per karakter
async function typewrite(text, paint, charMs = 28) {
    try {
        for (let i = 1; i <= text.length; i++) {
            process.stdout.write('\r\x1b[K' + paint(text.slice(0, i)))
            await sleep(charMs)
        }
        process.stdout.write('\n')
    } catch {
        console.log(paint(text))
    }
}

function createSpinner(label = 'Memuat...') {
    let timer = null
    let i = 0
    let text = label
    let t0 = 0
    const clear = () => {
        try {
            const w = (process.stdout && process.stdout.columns) || 80
            process.stdout.write('\r' + ' '.repeat(w) + '\r')
        } catch {}
    }
    return {
        start(t) {
            if (t) text = t
            if (timer) return
            t0 = Date.now()
            timer = setInterval(() => {
                const el = ((Date.now() - t0) / 1000).toFixed(0)
                try {
                    process.stdout.write(`\r${chalk.cyan(FRAMES[i++ % FRAMES.length])} ${chalk.white(text)} ${chalk.gray(`(${el}s)`)}`)
                } catch {}
            }, 90)
        },
        update(t) { text = t },
        stop(finalMsg) {
            if (timer) { clearInterval(timer); timer = null }
            clear()
            if (finalMsg) console.log(finalMsg)
        },
        succeed(msg) { this.stop(`${chalk.green('✔')} ${chalk.bold.green(msg)}`) },
        fail(msg) { this.stop(`${chalk.red('✖')} ${chalk.bold.red(msg)}`) },
    }
}

function dim(msg) {
    console.log(chalk.gray(`  ${msg}`))
}

function ok(msg) {
    console.log(`${chalk.green('  ✔')} ${msg}`)
}

function warn(msg) {
    console.log(`${chalk.yellow('  !')} ${chalk.yellow(msg)}`)
}

function err(msg) {
    console.log(`${chalk.red('  ✖')} ${chalk.red(msg)}`)
}

function statusBox(title, rows, colorName = 'green') {
    const c = chalk.keyword(colorName)
    const width = 46
    console.log(c('╔' + '═'.repeat(width) + '╗'))
    console.log(c('║') + chalk.bold.white(`  ${title}`.padEnd(width)) + c('║'))
    console.log(c('╠' + '═'.repeat(width) + '╣'))
    for (const [k, v] of rows) {
        console.log(c('║') + chalk.white(`  ${k} : ${v}`.padEnd(width)) + c('║'))
    }
    console.log(c('╚' + '═'.repeat(width) + '╝'))
}

function pairingBox(nomor, code) {
    const width = 46
    console.log(chalk.yellow('╔' + '═'.repeat(width) + '╗'))
    console.log(chalk.yellow('║') + chalk.bold.white('  🔑 PAIRING CODE'.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('╠' + '═'.repeat(width) + '╣'))
    console.log(chalk.yellow('║') + chalk.white(`  Nomor : ${nomor}`.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('║') + chalk.white('  Kode  : '.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('║') + chalk.bold.green(`    ▶ ${code} ◀`.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('║') + chalk.gray('  WA > Perangkat Tertaut > Tautkan'.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('║') + chalk.gray('  dengan nomor telepon'.padEnd(width)) + chalk.yellow('║'))
    console.log(chalk.yellow('╚' + '═'.repeat(width) + '╝'))
    // denyut warna pada baris kode (tulis ulang via ANSI cursor, guarded)
    pulseCode(code, width).catch(() => {})
}

// Kode pairing berdenyut ganti warna beberapa kali
async function pulseCode(code, width = 46) {
    const cols = ['green', 'yellow', 'cyan', 'green']
    try {
        for (let k = 0; k < cols.length * 2; k++) {
            const c = cols[k % cols.length]
            process.stdout.write('\x1b[4A') // naik ke baris kode
            process.stdout.write('\r\x1b[K' + chalk.yellow('║') + chalk.bold.keyword(c)(`    ▶ ${code} ◀`.padEnd(width)) + chalk.yellow('║') + '\n')
            process.stdout.write('\x1b[3B') // kembali ke bawah box
            await sleep(220)
        }
        // final hijau
        process.stdout.write('\x1b[4A')
        process.stdout.write('\r\x1b[K' + chalk.yellow('║') + chalk.bold.green(`    ▶ ${code} ◀`.padEnd(width)) + chalk.yellow('║') + '\n')
        process.stdout.write('\x1b[3B')
    } catch {}
}

module.exports = { showBanner, createSpinner, statusBox, pairingBox, dim, ok, warn, err, wib }
