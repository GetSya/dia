module.exports = {
    CmD: ['game'],
    categori: "fun",
    exec: async (m, bob) => {
        const result = 'Ini Adalah Pesan Dari System Plugins'
                let buttons = [
                    {buttonId: `#menu`, buttonText: {displayText: 'Done'}, type: 1}
                ]
                let buttonMessage = {
                    text: `*>_Tes*`,
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 2
                }
                bob.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
}