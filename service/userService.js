
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { Constants } = require("../constants")
const { StatusCodes, Gender } = require("../enums")
const CustomError = require("../utils/error.utils");
const { validateValueInList } = require("../utils/validate.util")


async function getUserLeaderBoard(filters) {

    const { name, gender, department, page = Constants.DefaultPageNumber, limit = Constants.DefaultPageSize } = filters;

    validateLeaderBoardRequest(gender, department);

    const numericPage = parseInt(page);
    const numericLimit = parseInt(limit)

    let offset = (numericPage - 1) * numericLimit;

    const userRankedData = await findLeaderBoard(name, gender, department, numericLimit, offset)

    const rankedData = userRankedData.map((user, index) => ({
        email: user.email,
        name: `${user.title} ${user.first} ${user.last}`,
        rank: offset + index + 1
    }));

    return rankedData
}

function validateLeaderBoardRequest(gender, department) {
    const errorArray = [];
    if (gender) {
        const { isSuccess, message } = validateValueInList(gender, Constants.CorrectGenderList, "gender")
        if (!isSuccess) {
            errorArray.push(message)
        }
    }

    if (department) {
        const { isSuccess, message } = validateValueInList(department, Constants.CorrectDepartmentList, "department")
        if (!isSuccess) {
            errorArray.push(message)
        }

    }

    if (errorArray.length > 0) {
        throw new CustomError(errorArray.join("; "), StatusCodes.BadRequest);
    }

    return;
}

module.exports = {
    getUserLeaderBoard
}