/**==================================!
 ○ Create by @rifza.p.p
 Japanese anime character voice
 
  ♤ Can use multiple character voices ♡
  
  🩵 Follow me on :
      ▪ https://youtube.com/@rifza  
      ▪ https://github.com/Rifza123
      ▪ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪ https://www.threads.net/@rifza.p.p

  [ CHARACTER LIST ]
    • "特别周 Special Week (Umamusume Pretty Derby)"
    • "无声铃鹿 Silence Suzuka (Umamusume Pretty Derby)"
    • "东海帝王 Tokai Teio (Umamusume Pretty Derby)"
    • "丸善斯基 Maruzensky (Umamusume Pretty Derby)"
    • "富士奇迹 Fuji Kiseki (Umamusume Pretty Derby)"
    • "小栗帽 Oguri Cap (Umamusume Pretty Derby)"
    • "黄金船 Gold Ship (Umamusume Pretty Derby)"
    • "伏特加 Vodka (Umamusume Pretty Derby)"
    • "大和赤骥 Daiwa Scarlet (Umamusume Pretty Derby)"
    • "大树快车 Taiki Shuttle (Umamusume Pretty Derby)"
    • "草上飞 Grass Wonder (Umamusume Pretty Derby)"
    ....Sisanya tambahin sendiri : https://peter11-vits-umamusume-voice-synthesizer.hf.space/

 ♡Thanks To :
      ▪ Penyedia module
      ▪ Diri sendiri
      ▪ Yanz
      ▪ All     
                               
!===================================*/

const WebSocket = require('ws');
const fs = require("fs")

let wss = 'wss://peter11-vits-umamusume-voice-synthesizer.hf.space/queue/join';
let send_has_payload = {"session_hash":"dduh7q4ohyn","fn_index":6}

//let text = "お疲れ様です，トレーナーさん。"
//let character = "无声铃鹿 Silence Suzuka (Umamusume Pretty Derby)"

exports.vitsUmamusumeVoiceSynthesizer = async (text, character) =>{
return new Promise(async(resolve, reject) => {
let result = {}
let send_data_payload =  {
  "fn_index": 6,
  "data": [
    text,
    character,
    "Japanese",
    1,
    false
  ],
  "session_hash": "dduh7q4ohyn"
}

    const ws = new WebSocket(wss);

    ws.onopen = function() {
     console.log("Connected to websocket")
    };

    ws.onmessage = async function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'estimation':
          console.log('Menunggu antrean: ' + message.rank)
          break;

        case 'send_data':
          console.log('Processing your audio....');        
          ws.send(JSON.stringify(send_data_payload));
          break;

        case 'process_completed':          
          result.url = 'https://peter11-vits-umamusume-voice-synthesizer.hf.space/file=' + message.output.data[1].name
          break;
      }
    };

    ws.onclose = function(event) {
      if (event.code === 1000) {
        console.log('Process completed');
      } else {
        msg.reply('Err : WebSocket Connection Error:\n');
      }
      resolve(result)
    };
  })
}