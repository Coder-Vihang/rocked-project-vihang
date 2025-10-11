
const { findLeaderBoard } = require("../repository/watchLog.repository")
const { compareStrings } = require("../utils/string.utils")
const { Constants } = require("../constants")


async function getUserLeaderBoard(params) {

    const { name, gender, department, page = Constants.DefaultPageNumber, limit = Constants.DefaultPageSize } = params;


    const userRankedData = await findLeaderBoard(page, limit)

    const rankedData = userRankedData.map((user, index) => ({
        ...user,
        userName: `${user.title} ${user.first} ${user.last}`,
        rank: (page - 1) * limit + index + 1,
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

    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return paginatedData.map((user) => ({
        email: user.email,
        name: user.name,
        rank: user.rank,
    }));
}

module.exports = {
    getUserLeaderBoard
}