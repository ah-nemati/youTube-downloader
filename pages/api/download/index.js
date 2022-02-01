const fs = require("fs");
const ytdl = require("ytdl-core");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await downloadMedia(req, res);
      break;
  }
};

const downloadMedia = async (req, res) => {
  try {
    const url = req.body.url;
    const info = await ytdl.getInfo(url.slice(url.search("watch?v=") + 1));
    const format = ytdl.chooseFormat(info.formats, {
      quality: "22",
      quality: "136",
      quality: "135",
      quality: "134",
    });
    res.status(200).json({
      url: format.url,
      title:info.videoDetails.title,
    });
  } catch (error) {
    res.status(400).json({ Message: error });
  }
};
