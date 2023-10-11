const {onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const ytdl = require("ytdl-core");
const fs = require("fs");
const https = require("https");
const os = require("os");


exports.youtubeDownload = onCall(async (data, context) => {
  logger.debug(data.data);
  const vid = data.data.url.split("v=")[1];
  const video = await ytdl.getInfo(vid);
  logger.debug(video);
  return {
    video: video.formats.sort((a, b) => {
      return a.mimetype < b.mimetype;
    }),
    url: `https://www.youtube.com/embed/${vid}`,
  };
});

exports.videoDownload = onCall(async (data, context) => {
  logger.debug(data);
  logger.log(process.env.HOME);
  logger.warn(fs.cwd());
  // var file = fs.createWriteStream(os.homedir());
  // https.get(data.link, function (res) {
  //   res.pipe(file);
  //   logger.log(res);
  //   file.on("finish", function () {
  //     file.close(data.cb);
  //   });
  // });
});
