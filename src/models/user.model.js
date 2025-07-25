const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    avatar_url: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "banned"),
      defaultValue: "inactive",
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
