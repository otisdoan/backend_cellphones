const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const { default: slugify } = require("slugify");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
    },
    full_description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
    cost_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(8, 2),
    },
    dimensions: {
      type: DataTypes.STRING(100),
    },
    warranty_period: {
      type: DataTypes.INTEGER,
      defaultValue: 12,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "out_of_stock"),
      allowNull: false,
      defaultValue: "active",
    },
    rating_average: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    meta_title: {
      type: DataTypes.STRING(255),
    },
    meta_description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    underscored: true,
  }
);

Product.beforeCreate((product) => {
  if (!product.slug && product.name) {
    product.slug = slugify(product.name, {
      lower: true,
      strict: true,
      locale: "vi",
    });
  }
});

Product.beforeUpdate((product) => {
  if (product.changed("name")) {
    product.slug = slugify(product.name, {
      lower: true,
      strict: true,
      locale: "vi",
    });
  }
});

module.exports = Product;
