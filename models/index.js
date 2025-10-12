const { Sequelize, DataTypes } = require("sequelize");
const { syncUsers, syncVideos} = require("../addDummyTableData")
const UserModel = require("./user.model");
const VideoModel =  require("./video.model");
const WatchLogModel = require("./watchLog.model")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});


const User = UserModel(sequelize, DataTypes);
const Video = VideoModel(sequelize, DataTypes);
const WatchLog = WatchLogModel(sequelize, DataTypes);

User.hasMany(WatchLog, { foreignKey: "userid", sourceKey: "userid" });
WatchLog.belongsTo(User, { foreignKey: "userid", targetKey: "userid" });

Video.hasMany(WatchLog, { foreignKey: "videoid", sourceKey: "videoid" });
WatchLog.belongsTo(Video, { foreignKey: "videoid", targetKey: "videoid" });

/*** 
 * Here we need to initialize the User and Videos Tables
 * Using alter: true over here to create/modify existing tables to match table models
 * Getting data from json files and creting them in the sqlite table
 ***/
async function initiliazeTables() {
  try {
    // run this only once while creating tables at the start
    //await sequelize.sync({ force: true });
    await sequelize.sync();
    await syncUsers(User);
    await syncVideos(Video);
    console.log("Users and Videos Syncing complete!");
  } catch (err) {
    console.error("DB init failed:", err.message);
  }
}

initiliazeTables();
module.exports = { sequelize, User, Video, WatchLog };
