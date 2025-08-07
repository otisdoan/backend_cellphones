const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const ProductAttribute = sequelize.define(
  "ProductAttribute",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    attribute_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    attribute_value: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    attribute_group: {
      type: DataTypes.STRING(100),
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_attributes",
    timestamps: false,
    underscored: true,
  }
);

module.exports = ProductAttribute;
