
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { compareStrings } = require("../utils/string.utils")
const { Constants } = require("../constants")


async function getUserLeaderBoard(filters) {

    const { name, gender, department, page = Constants.DefaultPageNumber, limit = Constants.DefaultPageSize } = filters;

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

module.exports = {
    getUserLeaderBoard
}