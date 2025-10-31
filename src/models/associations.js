// Models
const User = require("./user.model");
const Order = require("./order.model");
const OrderItem = require("./order_item.model");
const Product = require("./product.model");
const ProductVariant = require("./product_variant.model");
const ProductImage = require("./product_image.model");
const ProductAttribute = require("./product_attribute.model");
const ProductReview = require("./product_review.model");
const Category = require("./category.model");
const Brand = require("./brand.model");
const CartItem = require("./cart_item.model");
const UserAddress = require("./user_address.model");
const Coupon = require("./coupons.model");
const Notification = require("./notification.model");

/**
 * Define all model associations
 */
const defineAssociations = () => {
  // User <-> Order (1:N)
  User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
  });
  Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // User <-> Notification (1:N)
  User.hasMany(Notification, {
    foreignKey: "user_id",
    as: "notifications",
  });
  Notification.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // Order <-> Notification (1:N)
  Order.hasMany(Notification, {
    foreignKey: "order_id",
    as: "notifications",
  });
  Notification.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
  });

  // Order <-> OrderItem (1:N)
  Order.hasMany(OrderItem, {
    foreignKey: "order_id",
    as: "items",
  });
  OrderItem.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
  });

  // User <-> CartItem (1:N)
  User.hasMany(CartItem, {
    foreignKey: "user_id",
    as: "cartItems",
  });
  CartItem.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // User <-> UserAddress (1:N)
  User.hasMany(UserAddress, {
    foreignKey: "user_id",
    as: "addresses",
  });
  UserAddress.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // User <-> ProductReview (1:N)
  User.hasMany(ProductReview, {
    foreignKey: "user_id",
    as: "reviews",
  });
  ProductReview.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  // Product <-> ProductVariant (1:N)
  Product.hasMany(ProductVariant, {
    foreignKey: "product_id",
    as: "variants",
  });
  ProductVariant.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  // Product <-> ProductImage (1:N)
  Product.hasMany(ProductImage, {
    foreignKey: "product_id",
    as: "images",
  });
  ProductImage.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  // Product <-> ProductAttribute (1:N)
  Product.hasMany(ProductAttribute, {
    foreignKey: "product_id",
    as: "attributes",
  });
  ProductAttribute.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  // Product <-> ProductReview (1:N)
  Product.hasMany(ProductReview, {
    foreignKey: "product_id",
    as: "reviews",
  });
  ProductReview.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  // Category <-> Product (1:N)
  Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
  });
  Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category",
  });

  // Brand <-> Product (1:N)
  Brand.hasMany(Product, {
    foreignKey: "brand_id",
    as: "products",
  });
  Product.belongsTo(Brand, {
    foreignKey: "brand_id",
    as: "brand",
  });

  // ProductVariant <-> OrderItem (1:N)
  ProductVariant.hasMany(OrderItem, {
    foreignKey: "variant_id",
    as: "orderItems",
  });
  OrderItem.belongsTo(ProductVariant, {
    foreignKey: "variant_id",
    as: "variant",
  });

  // ProductVariant <-> CartItem (1:N)
  ProductVariant.hasMany(CartItem, {
    foreignKey: "variant_id",
    as: "cartItems",
  });
  CartItem.belongsTo(ProductVariant, {
    foreignKey: "variant_id",
    as: "variant",
  });

  console.log("✅ Model associations defined successfully");
};

module.exports = { defineAssociations };
