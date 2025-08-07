const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const ProductReview = sequelize.define(
  "ProductReview",
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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.BIGINT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
    },
    content: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.JSONB,
    },
    is_verified_purchase: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    helpful_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_reviews",
    timestamps: true,
    underscored: true,
  }
);

module.exports = ProductReview;
