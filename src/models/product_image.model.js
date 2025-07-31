const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const ProductImage = sequelize.define(
  "ProductImage",
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
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alt_text: {
      type: DataTypes.STRING(255),
    },
    sort_order: {
      type: DataTypes.INTEGER,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "product_images",
    timestamps: true,
    underscored: true,
  }
);

module.exports = ProductImage;
