const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Inventor = sequelize.define(
  "Inventor",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouse_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    variant_id: {
      type: DataTypes.BIGINT,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reserved_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    min_stock_alert: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "inventor",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Inventor;
