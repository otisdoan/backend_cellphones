const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("order", "promotion", "system", "smember"),
      defaultValue: "order",
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    icon_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "cart, bag, bell, gift, etc.",
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Additional data like order status, amounts, etc.",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Notification;
