const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Coupons = sequelize.define(
  "Coupons",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    min_order_amount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    max_discount_amount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    usage_limit: {
      type: DataTypes.INTEGER,
    },
    used_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_usage_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "coupons",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Coupons;
