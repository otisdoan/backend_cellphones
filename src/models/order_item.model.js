const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    variant_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    product_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    variant_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock_quantity: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

module.exports = OrderItem;
