const axios = require('axios')
const fs = require('fs')

function jadianime (image) {
	return new Promise(async(resolve, reject) => {
		
/*
[ SCRAPER ]
Scraper by YanzBotz

Thank To
• Bang rifza ( Guru )
• YanzBotz
• Aang Febryansah ( Besti3 )
• Arasya ( My bestie )
• All Creator Bot

Contoh Eval
exports.jadianime(fs.readFileSync('img.jpg')).then(a => console.log(a))

Resultnya 
{
  urls: [
    '/output/photo-anime-1692282948025.jpg',
    '/output/photo-anime-1692282948025_single.jpg'
  ]
}

Cintoh url 
Hasil sama Foto sebelum
https://www.drawever.com/output/photo-anime-1692282948025_single.jpg
Singel
https://www.drawever.com/output/photo-anime-1692282948025_single.jpg

*/
		
 axios("https://www.drawever.com/api/photo-to-anime", {
  headers: {
    "content-type": "application/json"
  },
  "data": { "data": "data:image/jpeg;base64," + image.toString('base64') },
  "method": "POST"
}).then(res => { 
let yanz = res.data
 resolve(yanz) 
})
})
}

module.exports = {
  jadianime
}