const express = require("express");
const { getVideo, submitVideo } = require('../controllers/videoController')
const { videoSubmit } = require("../middleware/video.middleware");
const { getLeaderBoard } = require('../controllers/userController')

const router = express.Router();

//to get the leaderBoard, get request with other filter details
router.get("/leaderboard", getLeaderBoard);
//submit api here i have a middleware that checks whether email exists in the header or not
router.post("/submit", videoSubmit, submitVideo);
//get api to the video by videoid
router.get("/:id", getVideo);



module.exports = router