const got = require("got");
const { sizeFormatter } = require("human-readable");

function fileSize(size) {
    const sized = parseFloat(size);
    return (isNaN(sized) ? 0 : sized) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}

/*

Scraper By YanzBotz 

*/

exports.youtubedl = async (url, server = 'en' ) => {
	return new Promise(async(resolve, reject) => {
    const json = await got.post("https://www.y2mate.com/mates/analyzeV2/ajax", {
        headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Cookie: '_gid=GA1.2.2055666962.1683248123; _gat_gtag_UA_84863187_21=1; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683249010.0.0.0; _ga=GA1.1.1570308475.1683248122',
            Origin: 'https://www.y2mate.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        },
        form: {
            k_query: url,
            k_page: 'home',
            hl: server,
            q_auto: 0
        }
    }).json();
    const vid = json.vid;
    const video = {};
    const audio = {};
    for (const videoKey in json.links['mp4']) {
        const _video = json.links['mp4'][videoKey];
        const quality = _video.q;
        if (_video.f !== 'mp4') continue;
        const fileSizeH = _video.size;
        const fileSize = fileSize(fileSizeH);
        video[quality] = {
            quality,
            fileSizeH,
            fileSize,
            download: convert.bind(convert, vid, _video.k)
        };
    }
    for (const audioKey in json.links['mp3']) {
        const _audio = json.links['mp3'][audioKey];
        const quality = _audio.q;
        if (_audio.f !== 'mp3') continue;
        const fileSizeH = _audio.size;
        const fileSize = fileSize(fileSizeH);
        audio[quality] = {
            quality,
            fileSizeH,
            fileSize,
            download: convert.bind(convert, vid, _audio.k)
        };
    }
    const res = {
        id: vid,
        thumbnail: `https://i.ytimg.com/vi/${vid}/0.jpg`,
        title: json.title,
        duration: json.t,
        video,
        audio
    };
    resolve(res);
    })
}
