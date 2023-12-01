const { fetchJson } = require('@fnc')

module.exports = {
    CmD: ['miku'],
    categori: "anime",
    exec: async (m, bob, { text, prefix, command}) => {
      await fetchJson(`https://raw.githubusercontent.com/FebriansyahXd/mentahan/master/anime/miku.json`)
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];       
        bob.sendMessage(m.chat, {
                        image: {
                            url: result
                        },
                        caption: 'Makasi udah menggunakan fitu di cilobot *꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡*',
                        buttons: [{
                                buttonId: `.miku`,
                                buttonText: {
                                    displayText: "NEXT➡️"
                                },
                                type: 1
                            }
                        ],
                        footer: 'made with❣️'
                    }, {
                        quoted: m
                    })        
        })
    }
}        