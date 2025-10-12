
const { getVideoById, submitVideoForUser } = require('../service/videoService');
const { StatusCodes, ErrorMessages } = require("../enums")

async function getVideo(req, res) {
  try {
    const { id } = req.params
    const videoResponse = await getVideoById(id);
    res.status(StatusCodes.Ok).json(videoResponse);
  } catch (err) {
    const errorStatusCode = err.statusCode ?? StatusCodes.InternalServerError
    res.status(errorStatusCode).json({ isSuccess: false, error: err?.message ?? ErrorMessages.defaultErrorMessage });
  }
};


async function submitVideo(req, res) {
  try {
    const { userEmail, id } = req.body
    const videoResponse = await submitVideoForUser(userEmail, id);
    res.status(StatusCodes.Created).json(videoResponse);
  } catch (err) {
    const errorStatusCode = err.statusCode ?? StatusCodes.InternalServerError
    res.status(errorStatusCode).json({ isSuccess: false, error: err?.message ?? ErrorMessages.defaultErrorMessage });
  }
}



module.exports = {
  getVideo,
  submitVideo
}