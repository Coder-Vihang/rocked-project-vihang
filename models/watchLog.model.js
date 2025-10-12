
module.exports = (sequelize, DataTypes) => {
  const WatchLog = sequelize.define("WatchLog", {
    logid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    videoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "videos", key: "videoid" },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "userid" },
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return WatchLog;
};
