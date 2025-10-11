const { Sequelize, DataTypes } = require("sequelize");
const { seedUsers, seedVideos} = require("../addDummyTableData")
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

User.hasMany(WatchLog, { foreignKey: "userId" });
WatchLog.belongsTo(User, { foreignKey: "userId" });



Video.hasMany(WatchLog, { foreignKey: "videoId" });
WatchLog.belongsTo(Video, { foreignKey: "videoId" });



async function initDB() {
  try {
    await sequelize.sync({ alter: true });

    await seedUsers(User);
    await seedVideos(Video);
    console.log("✅ Seeding complete!");
  } catch (err) {
    console.error("❌ DB init failed:", err);
  }
}

initDB();
module.exports = { sequelize, User, Video, WatchLog };
