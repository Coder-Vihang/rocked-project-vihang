
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { Constants } = require("../constants")
const { StatusCodes, ValidationFieldNames, ErrorMessages } = require("../enums")
const CustomError = require("../utils/error.utils");
const { validateValueInList } = require("../utils/validate.util")

/*** 
 * get the improtant details such as name, gender, department from the leaderBoardRequest
 * here i have made sure we only return 10 people every time we query for pagination purpose
 * then we validate the request. 
 * get the user ranked data
***/

async function getUserLeaderBoard(leaderBoardRequest) {

    const { name, gender, department, page = Constants.DefaultPageNumber, limit = Constants.DefaultPageSize } = leaderBoardRequest;

    const numericPage = parseInt(page);
    const numericLimit = parseInt(limit);

    const normalisedName = name?.trim()
    const normalisedGender = gender?.trim()?.toLowerCase();
    const normalisedDepartment = department?.trim()?.toUpperCase();

    validateLeaderBoardRequest(normalisedName, normalisedGender, normalisedDepartment, numericPage, numericLimit);

    let offset = (numericPage - 1) * numericLimit;

    const userRankedData = await findLeaderBoard(normalisedName, normalisedGender, normalisedDepartment, numericLimit, offset)

    const rankedData = userRankedData.map((user, index) => ({
        email: user.email,
        name: `${user.title} ${user.first} ${user.last}`,
        points: user.totalpoints ?? 0,
        department: user.department,
        gender: user.gender,
        rank: offset + index + 1
    }));

    return rankedData
}

function validateLeaderBoardRequest(name, gender, department, page, limit) {
    const errorArray = [];

     //page Number starts from 1 and a number

    if (isNaN(page) || page < 1) {
        errorArray.push(ErrorMessages.pageLessthanOne);
    }

    //limit between 1 and 10 not beyond this rangs
    if (isNaN(limit) || limit < 1 || limit > Constants.DefaultPageSize) {
        errorArray.push(`Limit must be within the range of 1 and ${Constants.DefaultPageSize} and must be a number`);
    }
    
    if(typeof name !== "undefined" && name == ''){
        errorArray.push(ErrorMessages.blankName);
    }

    //gender in an enum
    if (gender !== undefined) {
        const { isSuccess, message } = validateValueInList(gender, Constants.CorrectGenderList, ValidationFieldNames.gender)
        if (!isSuccess) {
            errorArray.push(message)
        }
    }

    //department in an enum
    if (department !== undefined) {
        const { isSuccess, message } = validateValueInList(department, Constants.CorrectDepartmentList, ValidationFieldNames.department)
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