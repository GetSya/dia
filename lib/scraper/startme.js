const axios = require("axios")
let auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE2MTkxNzAsIm9yaWdfaWF0IjoxNjkxMDE0MzcwLCJ1c2VyX2lkIjoiYmFhNDZmY2UtNzFhZS00OTNmLTg2YWItMzAwNDljYzYwOGIwIn0.obd_v2jTvnoq9fyLtoJbwKgCt0NVgJXpeHcLAO46nA8';
//checkpoin = "meinaunreal_v3_47210.safetensors"

exports.yanz = async (prompt, negative) => {
return new Promise(async(resolve, reject) => {
try{
let date = new Date() * 1
let pollingInterval = {};  
let status = '';
let getTaskId = await axios.post('https://api.dazzleai.network/api/tasks/create', {
  "batch_count": 1,
  "cfg_scale": 7,
  "checkpoint": "curiousmerge25D_v30Moreanimelike.safetensors",
  "denoising_strength": 0,
  "height": 1024,
  "image": "",
  "lora": "",
  "negative_prompt": negative,
  "node": "all",
  "prompt": prompt,
  "sampler": "DPM++ SDE Karras",
  "seed": 0,
  "steps": 40,
  "width": 512,
  "lora_weight": 0.8
},{

headers: { authorization: auth }

})
let taskid = getTaskId.data.task_id

async function check (){
 
  let checkTaskId = await axios.get('https://api.dazzleai.network/api/tasks?ids=' + taskid, {headers: { authorization: auth} })
   status = checkTaskId.data[0]["status"]
   if(status == 'running'){
     console.log(status)
    } else if(status == 'succeed'){
      resolve(checkTaskId.data[0]["images"])
      clearInterval(pollingInterval[date]);
    } else { 
      resolve(checkTaskId.data[0].images[0])
      clearInterval(pollingInterval[date]);
   }
  
}

const pollingIntervall = 2000;
      pollingInterval[date] = setInterval(check, pollingIntervall);
} catch (e) {
console.log(e)
resolve('err')
}
 })
}