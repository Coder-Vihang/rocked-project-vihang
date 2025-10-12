const { findByVideoId } = require('../repository/video.repository');
const { createWatchLog } = require('../repository/watchLog.repository');
const { Constants } =require("../constants");
const { findUserbyEmailId } = require('../repository/user.repository');
const CustomError = require("../utils/error.utils");
const { StatusCodes } =require("../enums")


async function getVideoById(videoId){

    const videoObject = await findByVideoId(videoId);

    if (!videoObject) {
        throw new CustomError(`No Video Found with the following VideoId : ${videoId}`, StatusCodes.NotFound)
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

async function submitVideoForUser(userEmail, videoId){

    const videoObject = await findByVideoId(videoId);

    if (!videoObject) {
          throw new CustomError(`No Video Found with the following VideoId : ${videoId}`, StatusCodes.NotFound)
    }

    const userObject = await findUserbyEmailId(userEmail)

     if (!userObject) {
         throw new CustomError(`No User Found with the following EMail : ${userEmail}`, StatusCodes.NotFound)
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