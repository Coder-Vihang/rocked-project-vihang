
const { Video } = require("../models");

findByVideoId = async (id) => {
  return await Video.findOne({
    where: {
      id,
    },
    raw: true
  });
};

module.exports = {
  findByVideoId
}

