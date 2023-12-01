//Create by @rifza.p.p
const axios = require("axios")
const fs = require("fs")
const cheerio = require('cheerio')
let baseUrl = "https://ytmp4.page/models/process.php"

const downloadYouTube = async(url) => {//Create by @rifza.p.p
return new Promise(async(resolve, reject) => {
  const mp3Options = [];
  const mp4Options = [];

  let payload = { 
    type: "all",
    search_txt: url 
  }
  
  let post = await axios.request({
    url: baseUrl,
    data: new URLSearchParams(Object.entries(payload)),
    method: 'POST'
  })
    const $ = cheerio.load(post.data)
      let res = {}
          res.title = $(".media-heading").text().trim()
          res.duration = $(".video_duration").text().trim()
          res.img = $('.media-object.img-thumbnail').attr('src');
          
          $('optgroup[label="MP3"] option').each((index, element) => {
            const option = $(element);
            const size = option.attr('data-size');
            const hash = option.attr('data-hash');
            const bitrate = option.text().trim();

            mp3Options.push({
              size,
              hash,
              bitrate,
            });
          });

          $('optgroup[label="MP4"] option').each((index, element) => {
            const option = $(element);
            const size = option.attr('data-size');
            const hash = option.attr('data-hash');
            const bitrate = option.text().trim();

            mp4Options.push({
              size,
              hash,
              bitrate,
            });
          });

       res.mp3 = mp3Options
       res.mp4 = mp4Options
       resolve(res)
})
}

const starTask = async(hash) => {//Create by @rifza.p.p
  return new Promise(async(resolve, reject) => {
  
    let payload = { 
      hash: hash
    }
  
    let post = await axios.request({
      url: "https://ytmp4.page/models/startTask.php",
      data: new URLSearchParams(Object.entries(payload)),
      method: 'POST'
    })
    
    resolve(post.data)
    
  })
}

const taskStatus = async(taskId) => {//Create by @rifza.p.p
  return new Promise(async(resolve, reject) => {
  
    let payload = { 
      taskId: taskId
    }
  
    let post = await axios.request({
      url: "https://ytmp4.page/models/taskStatus.php",
      data: new URLSearchParams(Object.entries(payload)),
      method: 'POST'
    })
    
    resolve(post.data)
    
  })
}

/*(async()=> {
//Contoh penggunaan, agak ribet emang
  let pollingInterval = {};      
  let date = new Date() * 1
  let url = "https://youtu.be/Ln_eS_5NbEQ?si=AyI0-V1UuFV8nd4l"
  const down = await downloadYouTube(url)
    let size = down.mp4[0].size ? down.mp4[0].size : null
    let bitrate = down.mp4[0].bitrate
  const start = await starTask(down.mp4[0].hash)//memulai pengunduhan
    console.log(start)
    
  const checkStatus = async(taskid) => {
      let progress = await taskStatus(start)//pengecekan status
      let text = `* [! YOUTUBE MP4 !]*`
          text += `\n\nTitle: ${progress.title}`
          text += `\nStatus: ${progress.status}`
          text += `\nQuality: ${bitrate}`
          text += `\nSise: ${size}`
          text += `\nConvert Progress: ${progress.convert_progress}%`
          text += `\nDownload Progress: ${progress.download_progress}%`
         
      if(progress.status == "finished"){
        let download = progress.download
        text += `\nDownload Url: ${download}`
          console.log(text)
        return clearInterval(pollingInterval[date])//menghapus pengecekan setelah selesai
      } else {
        console.log(text)
      }
  }  
  
    const pollingIntervall = 1000;//setiap 1 detik melakukan pengecekan
      pollingInterval[date] = setInterval(checkStatus, pollingIntervall);
  
})()*/


module.exports = { downloadYouTube, taskStatus, starTask }