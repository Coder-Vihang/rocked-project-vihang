
module.exports = (sequelize, DataTypes) => {
  const WatchLog = sequelize.define("WatchLog", {
    logid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    videoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Videos", key: "id" },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "userid" },
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
