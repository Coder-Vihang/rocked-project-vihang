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

User.hasMany(WatchLog, { foreignKey: "userid" });
WatchLog.belongsTo(User, { foreignKey: "userid" });
Video.hasMany(WatchLog, { foreignKey: "videoid" });
WatchLog.belongsTo(Video, { foreignKey: "videoid" });

async function initDB() {
  try {
    await sequelize.sync({ sync: true });

    await syncUsers(User);
    await syncVideos(Video);
    console.log("✅ Syncing complete!");
  } catch (err) {
    console.error("❌ DB init failed:", err);
  }
}

initDB();
module.exports = { sequelize, User, Video, WatchLog };
