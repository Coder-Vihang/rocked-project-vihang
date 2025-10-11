
const { User } = require("../models");

async function findUserbyEmailId(emailId) {
  return await User.findOne({
    where: {
     email: emailId,
    },
    raw: true
  });
};

module.exports = {
  findUserbyEmailId
}
