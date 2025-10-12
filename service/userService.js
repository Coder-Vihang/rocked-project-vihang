
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { Constants } = require("../constants")
const { StatusCodes, Gender } =require("../enums")
const CustomError = require("../utils/error.utils");


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
        rank: index+1
    }));

     return rankedData
}

function validateLeaderBoardRequest(gender, department ){
    const errorArray = [];
    if(gender){
       if(!Constants.CorrectGenderList.includes(gender.trim().toLowerCase())){
        errorArray.push(`Invalid Gender Entered Enter ${Gender.male} or ${Gender.female}`)
       }
    }

    if(department){
        if(!Constants.CorrectDepartmentList.includes(department.trim().toLowerCase())){
            errorArray.push(`Invalid Department Entered must be in ${JSON.stringify(Constants.CorrectDepartmentList)}`);
        }
    }

    if(errorArray.length>0){
        throw new CustomError(errorArray.join(", "), StatusCodes.BadRequest);
    }

    return;
}

module.exports = {
    getUserLeaderBoard
}