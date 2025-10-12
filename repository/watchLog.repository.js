const { WatchLog } = require("../models");
const { User } = require("../models");
const { Op, fn, literal, col } = require("sequelize");

async function createWatchLog(data) {
  return await WatchLog.create(data);
};

// SELECT
//   u.userid AS userId,
//   u.email AS emailid,
//   u.department as department,
//   u.gender as gender,
//   SUM(wl.pointsEarned) AS totalpoints
// FROM
//   WatchLogs wl
// INNER JOIN
//   Users u ON wl.userId = u.userid
// GROUP BY
//   u.userid, u.email, u. gender, u.department
// ORDER BY
//   totalpoints DESC

async function findLeaderBoard(name, gender, department, limit, offset) {

  let whereCondtion = {};

  if (name) {
    whereCondtion[Op.or] = [
      { first: { [Op.like]: `%${name}%` } },
      { last: { [Op.like]: `%${name}%` } }
    ];
  }

  if (gender) whereCondtion.gender = gender.toLowerCase();
  if (department) whereCondtion.department = department.toUpperCase();

  const users = await User.findAll({
    attributes: [
      "userid",
      "email",
      "title",
      "first",
      "last",
      "gender",
      "department",
      [fn("SUM", col("WatchLogs.pointsEarned")), "totalpoints"]
    ],
    include: [
      {
        model: WatchLog,
        attributes: [],
      },
    ],
    where: whereCondtion,
    limit: limit,
    subQuery: false,
    offset: offset,
    group: ["User.userid"],
    order: [[literal("totalpoints"), "DESC"]],
    raw: true
  });


  return users
}

module.exports = {
  createWatchLog,
  findLeaderBoard
}


