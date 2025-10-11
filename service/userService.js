
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { compareStrings } = require("../utils/string.utils")
const { Constants } = require("../constants")


async function getUserLeaderBoard(filters) {

    const { name, gender, department, page = Constants.DefaultPageNumber, limit = Constants.DefaultPageSize } = filters;

    const numericPage = parseInt(page);
    const numericLimit = parseInt(limit)

    const userRankedData = await findLeaderBoard()

    const rankedData = userRankedData.map((user, index) => ({
        ...user,
        userName: `${user.title} ${user.first} ${user.last}`,
        rank: index+1,
    }));

    let filteredData = rankedData;

    if (name) {
        filteredData = filteredData.filter((user) => {
            let tempUserName = `${user.title} ${user.first} ${user.last}`;

            return compareStrings(tempUserName, name);
        })
    }

    if (gender) {
        filteredData = filteredData.filter(
            (user) => compareStrings(user.gender, gender)
        );
    }

    if (department) {
        filteredData = filteredData.filter(
            (user) => compareStrings(user.department, department)
        );
    }

const startIndex = (numericPage - 1) * numericLimit;
const paginatedData = filteredData.slice(startIndex, startIndex + numericLimit);

    return paginatedData.map((user) => ({
        email: user.email,
        name: user.userName,
        rank: user.rank,
    }));
}

module.exports = {
    getUserLeaderBoard
}