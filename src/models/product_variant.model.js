const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const ProductVariant = sequelize.define(
  "ProductVariant",
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
    variant_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
    stock_quantity: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    capacity: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "product_variants",
    timestamps: true,
    underscored: true,
  }
);

module.exports = ProductVariant;
