
const { getVideoById, submitVideoForUser } = require('../service/videoService')

getVideo = async (req, res) => {
  try {
    const { id } = req.params
    const videoResponse = await getVideoById(id);
    res.status(200).json(videoResponse);
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err?.message });
  }
};


submitVideo = async(req, res)=>{
  try {
    const { userEmail, id } = req.body
    const videoResponse = await submitVideoForUser(userEmail, id);
    res.status(200).json(videoResponse);
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err?.message });
  }
}



module.exports = {
  getVideo,
  submitVideo
}