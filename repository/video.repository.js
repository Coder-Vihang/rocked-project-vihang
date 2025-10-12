
const { Video } = require("../models");

async function findByVideoId(videoId) {
  return await Video.findOne({
    where: {
      videoid: videoId,
    },
    raw: true
  });
};

module.exports = {
  findByVideoId
}

