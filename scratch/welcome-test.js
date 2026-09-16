// Tes offline sendWelcomeGoodbye (mock koneksi). Run: node scratch/welcome-test.js
const { loadBaileys } = require('../lib/ourin')

;(async () => {
    await loadBaileys()
    const w = require('../lib/welcome')
    const sentMsgs = []
    const fakeImgMsg = {
        url: 'https://mmg.whatsapp.net/fake',
        directPath: '/fake/path',
        mediaKey: Buffer.alloc(32, 1),
        mediaKeyTimestamp: 123,
        fileSha256: Buffer.alloc(32, 2),
        fileEncSha256: Buffer.alloc(32, 3),
        jpegThumbnail: Buffer.from('thumb-bytes')
    }
    const bob = {
        groupMetadata: async () => ({ subject: 'Grup Tes', desc: 'desc grup', participants: [{ id: '6281111111111@s.whatsapp.net' }] }),
        groupInviteCode: async () => 'ABCDE12345',
        profilePictureUrl: async () => 'https://files.catbox.moe/0rhzw7.png',
        waUploadToServer: async () => fakeImgMsg,
        sendMessage: async (jid, content, opts) => {
            sentMsgs.push({ jid, keys: Object.keys(content), linkPreview: content.linkPreview || null, mentions: content.mentions })
            return { key: { id: 'mock1' } }
        }
    }
    const r1 = await w.sendWelcomeGoodbye(bob, '123@g.us', 'add', ['6281111111111@s.whatsapp.net'], { force: true })
    console.log('add => sent:', r1.sent)
    const m1 = sentMsgs[0]
    console.log('keys:', m1.keys.join(','))
    console.log('text head:', JSON.stringify((m1.linkPreview && m1.text || '').slice(0, 60)))
    console.log('matched-text:', m1.linkPreview && m1.linkPreview['matched-text'])
    console.log('title:', m1.linkPreview && m1.linkPreview.title)
    console.log('has HQ thumb:', !!(m1.linkPreview && m1.linkPreview.highQualityThumbnail))
    console.log('mentions:', m1.mentions)
    const r2 = await w.sendWelcomeGoodbye(bob, '123@g.us', 'remove', ['6281111111111@s.whatsapp.net'], { force: true })
    console.log('remove => sent:', r2.sent, '| title:', sentMsgs[1].linkPreview.title)
    process.exit(0)
})().catch(e => { console.log('FAIL:', e.message); process.exit(1) })
