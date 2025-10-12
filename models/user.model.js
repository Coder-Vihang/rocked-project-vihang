
const { Gender, Department } = require('../enums')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(Gender.male, Gender.female),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM(Department.HR, Department.MARKETING, Department.SALES, Department.SERVICES),
      allowNull: false,
    },
  });

  return User;
};
