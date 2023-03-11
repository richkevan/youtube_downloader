const functions = require("firebase-functions");
const fs = require("fs");
const ytdl = require("ytdl-core");

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
