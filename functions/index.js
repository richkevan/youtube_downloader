const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const ytdl = require("ytdl-core");
const fs = require("fs");
const https = require("https");
const os = require("os");
const cors = require("cors");
const express = require("express");

const app = express();

const corsOptions = {
  origin:'https://richkevan.github.io/youtube_downloader/',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

const videoConvert = app.get("/", async (req, res) => {
  logger.debug(request.query);
  const vid = request.query.url.split("v=")[1];
  const video = await ytdl.getInfo(vid);
  logger.debug(video);
  response.status(200).send({
    video: video.formats.sort((a, b) => {
      return a.mimetype < b.mimetype;
    }),
    url: `https://www.youtube.com/embed/${vid}`,
  });
});

exports.youtubeDownload = onRequest(videoConvert);