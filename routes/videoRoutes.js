const express = require("express");
const { getVideo, submitVideo } = require('../controllers/videoController')
const { videoSubmit } = require("../middleware/video.middleware");
const { getLeaderBoard } = require('../controllers/userController')

const router = express.Router();

router.get("/leaderboard", getLeaderBoard);
router.post("/submit", videoSubmit, submitVideo);
router.get("/:id", getVideo);



module.exports = router