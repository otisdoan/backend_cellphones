const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "token",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Token;
