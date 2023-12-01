const axios = require("axios");
const cheerio = require("cheerio");

const mediafireDl = async (url) => {
  let query = await axios.get(url);
  let cher = cheerio.load(query.data);
  let hasil = [];
  let link = cher("a#downloadButton").attr("href");
  let size = cher("a#downloadButton")
    .text()
    .replace("Download", "")
    .replace("(", "")
    .replace(")", "")
    .replace("\n", "")
    .replace("\n", "")
    .replace(" ", "");
  let seplit = link.split("/");
  let name = seplit[5];
  let mime = name.split(".");
  mime = mime[1];
  hasil.push({ name, mime, size, link });
  return hasil;
};

module.exports = mediafireDl;
