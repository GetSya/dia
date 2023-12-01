/**==================================!
 ○ Create by @rifza.p.p
 *Support to download image & video*
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
 !!!           DOKUMEN ASLI DARI RIFZA               !!!
 !!! pake aja tpi jan ganti nama gw sama tqto nya 😶 !!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p

 ♡Thanks To :
      ▪︎ Penyedia module
      ▪︎ Diri sendiri
      ▪︎ All     
                               
!===================================*/

const fetch = require("node-fetch")
const axios = require("axios")
const fs = require("fs")

 /*  get post id. */
 const getPostId = (url) => {
    return new Promise(async(resolve, reject) => {    
       fetch(url)
         .then(async (tx) => {  
            tx.text()
               .then(async (a) =>{   
                  resolve(a.match(/{"post_id":"(.*?)"}/)[0])
               })
         })
    })
 }

 /*  get media info  */
 const getThreadsMedia = (postId) => {
    return new Promise(async(resolve, reject) => {  
        if(!postId) return resolve({ message: 'Masukkan post idnya!' })
           axios.request({
             url: "https://www.threads.net/api/graphql",
             method: "POST",
             data: new URLSearchParams({
               __ccg: "GOOD"
               ,__rev: 1007810462
               ,__s: "wbrqlt:3h23h7:j7wn4j"
               ,__hsi: 7253734413893696076
               ,__dyn: "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQw9m1YwBgao6C0Mo5W3S7Udo5qfK0EUjwGzE2swwwNwKwHw8Xxm16waCm7-0iK2S3qazo7u0zE2ZwrUdUcobU2cwmo6O0A8pw"
               ,__csr: "hnfXAgEjqo01kU61De4Egx2980t63gi0DRwcR0aG068r5NGxR7gnNo"
               ,__comet_req: 29            
               ,lsd: "ZEiN0p7Un01dRsAK3gI-Uw"
               ,jazoest: 21928
               ,__spin_r: 1007810462
               ,__spin_b: "trunk"
               ,__spin_t: 1688891652
               ,__jssesw: 1
               ,fb_api_caller_class: "RelayModern"
               ,fb_api_req_friendly_name: "BarcelonaPostPageQuery"               
               ,variables: `{"postID":"${postId}"}`
               ,doc_id: 6529829603744567
          }),
             headers: {
                "content-type": "application/x-www-form-urlencoded",
                "x-asbd-id": "129477",
                "x-fb-friendly-name": "BarcelonaPostPageQuery",
                "x-fb-lsd": "ZEiN0p7Un01dRsAK3gI-Uw",
                "x-ig-app-id": "238260118697367",
             }
           }).then((res) => {
           resolve(res.data)})
          
         })
    }
    
  // Threads scraper by @rifza.p.p
  exports.Threads = async (url) =>{
   return new Promise(async(resolve, reject) => {
   let getpostid = await getPostId(url)      
   let media = await getThreadsMedia(getpostid.replace('{"post_id":"', '').replace('"}',''))   
   let result = media["data"]["data"]["containing_thread"]["thread_items"][0]["post"]
       result["video_versions"] = result["video_versions"] 
       result["image_versions2"] = result["image_versions2"]["candidates"]
       resolve(result)
   })  
  }