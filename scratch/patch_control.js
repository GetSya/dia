const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'control.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Replace case 'welcome' and case 'left'
const oldWelcomeBlock = `                    case 'welcome':{
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (q.toLowerCase() === "on") {
                          if (isWelcome) return reply(\`Welcome sudah aktif\`)
                          joDatabase.setGroup(m.chat, { welcome: true })
                          reply(\`Sukses mengaktifkan welcome di grup ini\`)
                        } else if (q.toLowerCase() === "off") {
                          if (!isWelcome) return reply(\`Welcome sudah nonaktif\`)
                          joDatabase.setGroup(m.chat, { welcome: false })
                          reply(\`Sukses menonaktifkan welcome di grup ini\`)
                        } else {
                          reply(\`Pilih on atau off\\nExample : \${CmD} on\`)
                        }
                    }
                    break
                    case 'left':{
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (q.toLowerCase() === "on") {
                          if (isLeft) return reply(\`Pesan left sudah aktif\`)
                          joDatabase.setGroup(m.chat, { left: true })
                          reply(\`Sukses mengaktifkan pesan left di grup ini\`)
                        } else if (q.toLowerCase() === "off") {
                          if (!isLeft) return reply(\`Pesan left sudah nonaktif\`)
                          joDatabase.setGroup(m.chat, { left: false })
                          reply(\`Sukses menonaktifkan pesan left di grup ini\`)
                        } else {
                          reply(\`Pilih on atau off\\nExample : \${CmD} on\`)
                        }
                    }
                    break`;

const newWelcomeBlock = `                    case 'welcome': case 'left': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        const currentWelcome = !!gset.welcome
                        const currentLeft = !!gset.left

                        if (q.toLowerCase() === "on") {
                            joDatabase.setGroup(m.chat, { welcome: true, left: true })
                            reply(\`Sukses mengaktifkan fitur Welcome & Left di grup ini ✅\`)
                        } else if (q.toLowerCase() === "off") {
                            joDatabase.setGroup(m.chat, { welcome: false, left: false })
                            reply(\`Sukses menonaktifkan fitur Welcome & Left di grup ini ❌\`)
                        } else {
                            const statusText = \`*PENGATURAN WELCOME & LEFT*\\n\\nStatus saat ini:\\n• Welcome Card : *\${currentWelcome ? 'ON ✅' : 'OFF ❌'}*\\n• Left/Goodbye : *\${currentLeft ? 'ON ✅' : 'OFF ❌'}*\\n\\nSilakan pilih opsi tombol di bawah untuk mengaktifkan atau menonaktifkan fitur ini:\`
                            const btnWelcome = [
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ON ✅", id: \`\${prefix}welcome on\` }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "OFF ❌", id: \`\${prefix}welcome off\` }) }
                            ]
                            let sent = false
                            try {
                                if (bob.sendButton) {
                                    await bob.sendButton(m.chat, statusText, '> JojoBot', 'WELCOME & LEFT', btnWelcome)
                                    sent = true
                                }
                            } catch (e) {}
                            if (!sent) {
                                try {
                                    if (bob.sendButtonText) {
                                        const buttons = [
                                            { buttonId: \`\${prefix}welcome on\`, buttonText: { displayText: 'ON ✅' }, type: 1 },
                                            { buttonId: \`\${prefix}welcome off\`, buttonText: { displayText: 'OFF ❌' }, type: 1 }
                                        ]
                                        await bob.sendButtonText(m.chat, buttons, statusText, '> JojoBot', m)
                                        sent = true
                                    }
                                } catch (e) {}
                            }
                            if (!sent) {
                                reply(\`\${statusText}\\n\\n• Ketik *\${prefix}welcome on* untuk aktifkan\\n• Ketik *\${prefix}welcome off* untuk nonaktifkan\`)
                            }
                        }
                    }
                    break
                    case 'setwelcome': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (!q) {
                            return reply(\`*PENGATURAN TEKS CUSTOM WELCOME*\\n\\nGunakan command ini untuk mengatur pesan selamat datang.\\n\\n*Contoh:*\\n\${prefix}setwelcome Halo @user, selamat datang di grup @group!\\nDeskripsi: @desc\\nTanggal: @date (@time)\\nJumlah member: @member\\n\\n*Placeholder yang didukung:*\\n• @user : Mention nomor peserta (@628...)\\n• @name : Nama asli peserta\\n• @group : Nama grup\\n• @desc : Deskripsi grup\\n• @date : Tanggal hari ini\\n• @time : Waktu sekarang (WIB)\\n• @member : Jumlah total member\\n\\n_Ketik *\${prefix}setwelcome reset* untuk mengembalikan pesan ke default._\`)
                        }
                        if (q.toLowerCase() === 'reset') {
                            joDatabase.setGroup(m.chat, { welcomeText: '' })
                            reply('Sukses mengembalikan pesan welcome ke default.')
                        } else {
                            joDatabase.setGroup(m.chat, { welcomeText: q })
                            reply(\`Sukses mengatur pesan custom welcome! ✅\\n\\n*Template Tersimpan:*\\n\${q}\`)
                        }
                    }
                    break
                    case 'setleft': case 'setgoodbye': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        if (!q) {
                            return reply(\`*PENGATURAN TEKS CUSTOM GOODBYE/LEFT*\\n\\nGunakan command ini untuk mengatur pesan perpisahan.\\n\\n*Contoh:*\\n\${prefix}setleft Selamat tinggal @user, terima kasih sudah menjadi bagian dari @group!\\n\\n*Placeholder yang didukung:*\\n• @user : Mention nomor peserta (@628...)\\n• @name : Nama asli peserta\\n• @group : Nama grup\\n• @desc : Deskripsi grup\\n• @date : Tanggal hari ini\\n• @time : Waktu sekarang (WIB)\\n• @member : Jumlah total member\\n\\n_Ketik *\${prefix}setleft reset* untuk mengembalikan pesan ke default._\`)
                        }
                        if (q.toLowerCase() === 'reset') {
                            joDatabase.setGroup(m.chat, { leftText: '' })
                            reply('Sukses mengembalikan pesan left ke default.')
                        } else {
                            joDatabase.setGroup(m.chat, { leftText: q })
                            reply(\`Sukses mengatur pesan custom left/goodbye! ✅\\n\\n*Template Tersimpan:*\\n\${q}\`)
                        }
                    }
                    break
                    case 'antidelete': {
                        if (!m.isGroup) return reply(mess.OnlyGrup)
                        if (!isGroupAdmins && !isCreator) return reply(mess.GrupAdmin)
                        const isAntiDelete = !!gset.antidelete
                        if (q.toLowerCase() === "on") {
                            joDatabase.setGroup(m.chat, { antidelete: true })
                            reply(\`Sukses mengaktifkan fitur Anti-Delete di grup ini ✅\`)
                        } else if (q.toLowerCase() === "off") {
                            joDatabase.setGroup(m.chat, { antidelete: false })
                            reply(\`Sukses menonaktifkan fitur Anti-Delete di grup ini ❌\`)
                        } else {
                            const statusText = \`*FITUR ANTI-DELETE*\\n\\nStatus saat ini: *\${isAntiDelete ? 'ON ✅' : 'OFF ❌'}*\\n\\nKetika aktif, pesan yang dihapus oleh member akan otomatis dikirimkan kembali ke grup oleh bot.\\n\\nSilakan pilih tombol di bawah:\`
                            const btnAD = [
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ON ✅", id: \`\${prefix}antidelete on\` }) },
                                { name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "OFF ❌", id: \`\${prefix}antidelete off\` }) }
                            ]
                            let sent = false
                            try {
                                if (bob.sendButton) {
                                    await bob.sendButton(m.chat, statusText, '> JojoBot', 'ANTI-DELETE', btnAD)
                                    sent = true
                                }
                            } catch (e) {}
                            if (!sent) {
                                try {
                                    if (bob.sendButtonText) {
                                        const buttons = [
                                            { buttonId: \`\${prefix}antidelete on\`, buttonText: { displayText: 'ON ✅' }, type: 1 },
                                            { buttonId: \`\${prefix}antidelete off\`, buttonText: { displayText: 'OFF ❌' }, type: 1 }
                                        ]
                                        await bob.sendButtonText(m.chat, buttons, statusText, '> JojoBot', m)
                                        sent = true
                                    }
                                } catch (e) {}
                            }
                            if (!sent) {
                                reply(\`\${statusText}\\n\\n• Ketik *\${prefix}antidelete on* untuk aktifkan\\n• Ketik *\${prefix}antidelete off* untuk nonaktifkan\`)
                            }
                        }
                    }
                    break`;

// Normalize CRLF to LF for matching
const normContent = content.replace(/\r\n/g, '\n');
const normOldWelcome = oldWelcomeBlock.replace(/\r\n/g, '\n');

if (!normContent.includes(normOldWelcome)) {
    console.error('oldWelcomeBlock NOT found in control.js!');
    process.exit(1);
}

let updated = normContent.replace(normOldWelcome, newWelcomeBlock.replace(/\r\n/g, '\n'));

// 2. Add Anonymous Chat commands (start, leave, next, stop)
const anonCases = `
                    // ========== ANONYMOUS CHAT ==========
                    case 'start': {
                        if (m.isGroup) return
                        return anon.startChat(bob, m, sender, reply)
                    }
                    case 'leave': {
                        if (m.isGroup) return
                        return anon.leaveChat(bob, m, sender, reply)
                    }
                    case 'next': {
                        if (m.isGroup) return
                        return anon.nextChat(bob, m, sender, reply)
                    }
                    case 'stop': {
                        if (m.isGroup) return
                        return anon.leaveChat(bob, m, sender, reply)
                    }
`;

// Insert anonCases right before case 'testwelcome':
updated = updated.replace(/(\n\s*case 'testwelcome':)/, anonCases + '$1');

// 3. Update case 'add': to support auto-inviting private users (status 403)
const oldAddCase = `                     case 'add':{
                    if (!m.isGroup) return reply(global.mess.group)
                    if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                    if (!isGroupAdmins) return reply(global.mess.admin)
                    if (!q) {
                        bob.groupParticipantsUpdate(m.chat, [quoted.sender], "add")
                        ngetag(\`Menambahkan @\${quoted.sender.split('@')[0]}.\`, [quoted.sender], true)
                    } else {
                        if (args[0].startsWith('08')) return reply(\`Awali Dengan 62! bukan 08\\nContoh : \${sender.split("@")[0]}\`)
                        bob.groupParticipantsUpdate(m.chat, [args[0] + \`@s.whatsapp.net\`], "add").catch(err => reply(\`Gagal\`))
                    }
                     }
                     break`;

const newAddCase = `                     case 'add':{
                        if (!m.isGroup) return reply(global.mess.group)
                        if (!isBotGroupAdmins) return reply(global.mess.botAdmin)
                        if (!isGroupAdmins) return reply(global.mess.admin)
                        let target = null
                        if (!q && quoted) {
                            target = quoted.sender
                        } else if (q) {
                            let num = q.replace(/[^0-9]/g, '')
                            if (num.startsWith('08')) num = '62' + num.slice(1)
                            if (!num.startsWith('62') && num.length > 5) num = '62' + num
                            target = num + '@s.whatsapp.net'
                        } else {
                            return reply(\`Format salah!\\nContoh: \${prefix}add 628xxx atau reply pesan user yang ingin ditambahkan.\`)
                        }

                        try {
                            const res = await bob.groupParticipantsUpdate(m.chat, [target], "add")
                            const first = res && res[0]
                            const st = first && (first.status || (first.content && first.content.attrs && first.content.attrs.error))
                            if (st == 403 || st == '403') {
                                try {
                                    const code = await bob.groupInviteCode(m.chat)
                                    const meta = await bob.groupMetadata(m.chat)
                                    const link = \`https://chat.whatsapp.com/\${code}\`
                                    const msgInvite = \`*UNDANGAN GRUP WHATSAPP*\\n\\nHalo! Kamu diundang oleh admin @\${sender.split('@')[0]} untuk bergabung ke grup *\${meta.subject}*:\\n\\n\${link}\\n\\n_Silakan klik tautan di atas untuk bergabung._\`
                                    await bob.sendMessage(target, { text: msgInvite, mentions: [sender] })
                                    reply(\`⚠️ Nomor @\${target.split('@')[0]} mengaktifkan privasi grup.\\n✅ Tautan undangan berhasil otomatis dikirimkan ke chat pribadinya!\`, [target])
                                } catch (e2) {
                                    reply(\`Nomor @\${target.split('@')[0]} mengaktifkan privasi grup. Gagal mengirim link ke PC: \${e2.message}\`, [target])
                                }
                            } else if (st == 409 || st == '409') {
                                reply(\`Nomor @\${target.split('@')[0]} sudah berada di dalam grup ini.\`, [target])
                            } else {
                                ngetag(\`Menambahkan @\${target.split('@')[0]} ke grup.\`, [target], true)
                            }
                        } catch (err) {
                            reply(\`Gagal menambahkan user: \${err?.message || err}\`)
                        }
                     }
                     break`;

const normOldAdd = oldAddCase.replace(/\r\n/g, '\n');
if (!updated.includes(normOldAdd)) {
    console.error('oldAddCase NOT found in control.js!');
    process.exit(1);
}

updated = updated.replace(normOldAdd, newAddCase.replace(/\r\n/g, '\n'));

// Save back with CRLF preserved or LF
fs.writeFileSync(file, updated.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully patched control.js!');
