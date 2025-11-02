const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const Product = require("../models/product.model");

const createProductRepository = async (payload) => {
  return await Product.create(payload);
};

const checkNameExist = async (name) => {
  return await Product.findOne({ where: { name } });
};

const checkSlugExist = async (slug) => {
  return await Product.findOne({ where: { slug } });
};

const checkSkuExist = async (sku) => {
  return await Product.findOne({ where: { sku } });
};

const getAllProductReposiroty = async () => {
  return await sequelize.query(
    `
      SELECT 
        p.*, 
        c.name as category_name, 
        b.name as brand_name, 
        ARRAY_AGG(pi.image_url ORDER BY pi.sort_order) FILTER (WHERE pi.image_url IS NOT NULL) AS product_image
      FROM products p
      JOIN categories c on c.id = p.category_id
      JOIN brands b on b.id = p.brand_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id, c.name, b.name
      ORDER BY p.id
    `,
    {
      type: QueryTypes.SELECT,
    }
  );
};

const deleteProductRepository = async (id) => {
  return await Product.destroy({ where: { id } });
};

const updateProductRepository = async (id, payload) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  Object.assign(product, payload);
  await product.save();
};

const getAllNameProductRepository = async () => {
  return await Product.findAll({
    attributes: ["id", "name"],
    raw: true,
  });
};

const getProductFeatured = async (idCategory) => {
  return await sequelize.query(
    `
      SELECT p.name
      FROM products p
      WHERE p.is_featured = true AND p.category_id = :idCategory
    `,
    {
      type: QueryTypes.SELECT,
      replacements: { idCategory },
    }
  );
};

const getProductDetailBySlugRepository = async (slug) => {
  return await sequelize.query(
    `
      SELECT 
        p.*, 
        c.name as category_name, 
        b.name as brand_name, 
        ARRAY_AGG(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL) AS product_image
      FROM products p
      JOIN categories c on c.id = p.category_id
      JOIN brands b on b.id = p.brand_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.slug = :slug
      GROUP BY p.id, c.name, b.name
      ORDER BY p.id
    `,
    {
      replacements: { slug },
      type: QueryTypes.SELECT,
    }
  );
};

const getProductByIdRepository = async (id) => {
  const result = await sequelize.query(
    `
      SELECT 
        p.*, 
        c.name as category_name, 
        b.name as brand_name, 
        ARRAY_AGG(pi.image_url ORDER BY pi.sort_order) FILTER (WHERE pi.image_url IS NOT NULL) AS product_image
      FROM products p
      JOIN categories c on c.id = p.category_id
      JOIN brands b on b.id = p.brand_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = :id
      GROUP BY p.id, c.name, b.name
    `,
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    }
  );
  return result[0] || null;
};

const getProductByCategoryRepository = async (categoryId) => {
  return await sequelize.query(
    `
      SELECT 
        p.*, 
        c.name as category_name, 
        b.name as brand_name, 
        ARRAY_AGG(pi.image_url ORDER BY pi.sort_order) FILTER (WHERE pi.image_url IS NOT NULL) AS product_image
      FROM products p
      JOIN categories c on c.id = p.category_id
      JOIN brands b on b.id = p.brand_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.category_id = :categoryId
      GROUP BY p.id, c.name, b.name
      ORDER BY p.id
    `,
    {
      replacements: { categoryId },
      type: QueryTypes.SELECT,
    }
  );
};

module.exports = {
  createProductRepository,
  checkNameExist,
  checkSkuExist,
  checkSlugExist,
  getAllProductReposiroty,
  deleteProductRepository,
  updateProductRepository,
  getAllNameProductRepository,
  getProductFeatured,
  getProductDetailBySlugRepository,
  getProductByIdRepository,
  getProductByCategoryRepository,
};
