
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

    validateLeaderBoardRequest(gender, department, numericPage, numericLimit);

    let offset = (numericPage - 1) * numericLimit;

    const userRankedData = await findLeaderBoard(name, gender, department, numericLimit, offset)

    const rankedData = userRankedData.map((user, index) => ({
        email: user.email,
        name: `${user.title} ${user.first} ${user.last}`,
        points: user.totalpoints ?? 0,
        rank: offset + index + 1
    }));

    return rankedData
}

function validateLeaderBoardRequest(gender, department, page, limit) {
    const errorArray = [];

    //gender in an enum
    if (gender) {
        const { isSuccess, message } = validateValueInList(gender, Constants.CorrectGenderList, ValidationFieldNames.gender )
        if (!isSuccess) {
            errorArray.push(message)
        }
    }

    //department in an enum
    if (department) {
        const { isSuccess, message } = validateValueInList(department, Constants.CorrectDepartmentList, ValidationFieldNames.department)
        if (!isSuccess) {
            errorArray.push(message)
        }

    }

    //page Number starts from 1 and a number

    if ( isNaN(page) || page < 1) {
        errorArray.push(ErrorMessages.pageLessthanOne);
    }
    
    //limit between 1 and 10 not beyond this rangs
    if (isNaN(limit) || limit < 1 || limit > Constants.DefaultPageSize) {
        errorArray.push(`Limit must be within the range of 1 and ${Constants.DefaultPageSize} and must be a number`);
    }

    if (errorArray.length > 0) {
        throw new CustomError(errorArray.join("; "), StatusCodes.BadRequest);
    }

    return;
}

module.exports = {
    getUserLeaderBoard
}