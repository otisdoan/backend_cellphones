const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const { default: slugify } = require("slugify");

const Brand = sequelize.define(
  "Brand",
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
    logo_url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "brands",
    timestamps: true,
    underscored: true,
  }
);

Brand.beforeCreate((brand) => {
  if (!brand.slug && brand.name) {
    brand.slug = slugify(brand.name, {
      lower: true,
      strict: true,
      locale: "vi",
    });
  }
});

Brand.beforeUpdate((brand) => {
  if (brand.changed("name")) {
    brand.slug = slugify(brand.name, {
      lower: true,
      strict: true,
      locale: "vi",
    });
  }
});

module.exports = Brand;
