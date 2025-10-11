const { findByVideoId } = require('../repository/video.repository');
const { createWatchLog } = require('../repository/watchLog.repository');
const { Constants } =require("../constants");
const { findUserbyEmailId } = require('../repository/user.repository');


getVideoById = async (videoId) => {

    const videoObject = await findByVideoId(videoId);

    if (!videoObject) {
        throw new Error(`No Video Found with the following VideoId : ${videoId}`)
    }

    const { id, title, description, url } = videoObject;

    const response = {
        isSuccess: true,
        id: id.toString(),
        title,
        description,
        url

    }

    return response
}

submitVideoForUser = async(userEmail, videoId) => {

    const videoObject = await findByVideoId(videoId);

    if (!videoObject) {
        throw new Error(`No Video Found with the following VideoId : ${videoId}`)
    }

    const userObject = await findUserbyEmailId(userEmail)

     if (!userObject) {
        throw new Error(`No User Found with the following EMail : ${userEmail}`)
    }

    const { id } = videoObject;

    const watchLogObject = {
        videoId: id,
        userid: userObject.userid,
        pointsEarned: Constants.DefaultPointsEarned,
    }

    await createWatchLog(watchLogObject)

    return {
        isSuccess: true,
        message: "Log Entry Created Successfully"
    }
}

module.exports = {
    getVideoById,
    submitVideoForUser
}