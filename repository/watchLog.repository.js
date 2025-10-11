const { WatchLog } = require("../models");
const { User } = require("../models");
const { fn, col, literal } = require("sequelize");

async function createWatchLog(data) {
  return await WatchLog.create(data);
};

async function findLeaderBoard() {

  const users = await User.findAll({
  attributes: [
    "userid",
    "email",
    "title",
    "first",
    "last",
    "gender",
    "department",
    [
      literal(`(
        SELECT SUM(pointsEarned)
        FROM WatchLogs wl
        WHERE wl.userid = User.userid
      )`),
      "totalpoints",
    ],
  ],
  order: [[literal("totalpoints"), "DESC"]],
  raw: true,
});

  return users
}

module.exports = {
  createWatchLog,
  findLeaderBoard
}


