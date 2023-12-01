const { getBuffer, getRandom } = require('../lib/function.js');
const dl = require('@bochilteam/scraper');

const ytaudio = async(M, reply, q, bobSend, prefix, m, bob) => {
try {
      if (!q) return reply('url!')      
      var yt = await dl.youtubedl(q).catch(async () => await dl.youtubedlv2(q))
      var dl_url = await yt.audio['128kbps'].download()
      bob.sendMessage(m.chat, {audio: {url: dl_url}, mimetype: 'audio/mp4'}, {quoted: m})
      
    } catch (e) {
      console.log(e)
      reply('error')
  }
}
module.exports = ytaudio