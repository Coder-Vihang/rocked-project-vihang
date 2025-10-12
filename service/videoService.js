const { findByVideoId } = require('../repository/video.repository');
const { createWatchLog, findWatchLogFromVideoIdUserId } = require('../repository/watchLog.repository');
const { Constants } = require("../constants");
const { findUserbyEmailId } = require('../repository/user.repository');
const CustomError = require("../utils/error.utils");
const { StatusCodes, ErrorMessages } = require("../enums")


/*** 
 * find the video by id in the request
 * if not throw error
 * if video found return the response
***/

async function getVideoById(videoId) {
    if (!videoId) {
        throw new CustomError(ErrorMessages.videoIdNotInRequest, StatusCodes.BadRequest)
    }

    const numericVideoId = parseInt(videoId);

    if(isNaN(numericVideoId)){
       throw new CustomError(ErrorMessages.invalidVideoId, StatusCodes.BadRequest)
    }
    const videoObject = await findByVideoId(numericVideoId);

    if (!videoObject) {
        throw new CustomError(`${ErrorMessages.noVideoFoundforVideoId}: ${numericVideoId}`, StatusCodes.NotFound)
    }

    const { videoid, title, description, url } = videoObject;

    const response = {
        isSuccess: true,
        id: videoid.toString(),
        title,
        description,
        url
    }

    return response
}

/*** 
 * find the user by userEmail in the request
 * if not throw error
 * find the video by id in the request
 * if not throw error
 * Create WatchLog Object entry in the Table
***/

async function submitVideoForUser(userEmail, videoId) {

    if (!videoId) {
        throw new CustomError(ErrorMessages.videoIdNotInRequest, StatusCodes.BadRequest)
    }

    const numericVideoId = parseInt(videoId);

     if(isNaN(numericVideoId)){
       throw new CustomError(ErrorMessages.invalidVideoId, StatusCodes.BadRequest)
    }

    const userObject = await findUserbyEmailId(userEmail)

    if (!userObject) {
        throw new CustomError(`${ErrorMessages.userNotFoundWithEmail} : ${userEmail}`, StatusCodes.NotFound)
    }

    const videoObject = await findByVideoId(numericVideoId);

    if (!videoObject) {
        throw new CustomError(`${ErrorMessages.noVideoFoundforVideoId}: ${numericVideoId}`, StatusCodes.NotFound)
    }

    // check the person has watched the video or not

    const watchLogResponse = await findWatchLogFromVideoIdUserId(numericVideoId, userObject.userid);

    if (watchLogResponse) {
        return {
            isSuccess: true,
            message: `Video with id ${numericVideoId} has already been watched by User with email :${userEmail}`,
            pointsEarned: Constants.zeroPoints
        }
    }

    //presently hardcoding it to Default Points
    const watchLogObject = {
        videoid: numericVideoId,
        userid: userObject.userid,
        pointsEarned: Constants.DefaultPointsEarned,
    }

    await createWatchLog(watchLogObject)

    return {
        isSuccess: true,
        message: "Watch Log Entry Created Successfully",
        pointsEarned: Constants.DefaultPointsEarned
    }
}

module.exports = {
    getVideoById,
    submitVideoForUser
}