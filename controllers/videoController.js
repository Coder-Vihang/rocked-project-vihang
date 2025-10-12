
const { getVideoById, submitVideoForUser } = require('../service/videoService');
const { StatusCodes } = require("../enums")

async function getVideo(req, res) {
  try {
    const { id } = req.params
    const videoResponse = await getVideoById(id);
    res.status(StatusCodes.Success).json(videoResponse);
  } catch (err) {
    const errorStatusCode = err.statusCode ?? StatusCodes.InternalServerError
    res.status(errorStatusCode).json({ isSuccess: false, error: err?.message });
  }
};


async function submitVideo(req, res) {
  try {
    const { userEmail, id } = req.body
    const videoResponse = await submitVideoForUser(userEmail, id);
    res.status(StatusCodes.Success).json(videoResponse);
  } catch (err) {
    const errorStatusCode = err.statusCode ?? StatusCodes.InternalServerError
    res.status(errorStatusCode).json({ isSuccess: false, error: err?.message });
  }
}



module.exports = {
  getVideo,
  submitVideo
}