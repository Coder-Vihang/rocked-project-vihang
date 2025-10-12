const { WatchLog } = require("../models");
const { User } = require("../models");
const { literal, Op } = require("sequelize");

async function createWatchLog(data) {
  return await WatchLog.create(data);
};

async function findLeaderBoard(name, gender, department, limit, offset) {

  let whereCondtion = {};

  if (name) {
    whereCondtion[Op.or] = [
      { first: { [Op.like]: `%${name}%` } },
      { last: { [Op.like]: `%${name}%` } }
    ];
  }

  if (gender) whereCondtion.gender = gender;
  if (department) whereCondtion.department = department;

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
    where: whereCondtion,
    limit: limit,
    offset: offset,
    order: [[literal("totalpoints"), "DESC"]],
    raw: true,
  });

  return users
}

module.exports = {
  createWatchLog,
  findLeaderBoard
}


