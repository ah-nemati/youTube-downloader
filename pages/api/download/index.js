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

    var videoInfo = {};
    info.formats.forEach((element, index) => {
      setter(
        element.qualityLabel,
        element.url,
        element.contentLength,
        element.audioBitrate,
        info.videoDetails.lengthSeconds,
        index,
        videoInfo
      );
    });
    res.status(200).json({
      video: videoInfo,
      title: info.videoDetails.title,
    });
  } catch (error) {
    res.status(400).json({ Message: error });
  }
};

const setter = (
  qualityLabel,
  url,
  size,
  audioBitrate,
  time,
  index,
  videoInfo
) => {
  videoInfo[index] = {};
  if (audioBitrate && audioBitrate !== null && qualityLabel !== null) {
    videoInfo[index]["quality"] = qualityLabel;
    videoInfo[index]["size"] = Math.round(
      ((size / 2000000 + Number.EPSILON) * 100) / 100
    );
    videoInfo[index]["url"] = url;
    videoInfo[index]["time"] = secondsToTime(time);
  } else {
    delete videoInfo[index];
  }
  return videoInfo;
};

function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  return hours + ":" + minutes + ":" + seconds;
}
