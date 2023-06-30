const functions = require("firebase-functions");
const fs = require("fs");
const ytdl = require("ytdl-core");
const https = require("https");
const axios = require("axios");
const os = require("os");
const getStorage = require("firebase-admin/storage");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.youtubeDownload = functions.https.onCall(async (data, context) => {
  functions.logger.debug(data.url);
  const vid = data.url.split("v=")[1];
  const video = await ytdl.getInfo(vid);
  functions.logger.debug(video);
  return {
    video: video.formats.sort((a, b) => {
      return a.mimetype < b.mimetype;
    }),
    url: `https://www.youtube.com/embed/${vid}`,
  };
});

exports.videoDownload = functions.https.onCall(async (data, context) => {
  var file = fs.createWriteStream(os.homedir());
  https.get(data.link, function (res) {
    res.pipe(file);
    functions.logger.log(res);
    file.on("finish", function () {
      file.close(data.cb);
    });
  });
});
