const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const UserAddress = sequelize.define(
  "UserAddress",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    recipient_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    recipient_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address_detail: {
      type: DataTypes.TEXT,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "user_addresses",
    timestamps: true,
    underscored: true,
  }
);

module.exports = UserAddress;
