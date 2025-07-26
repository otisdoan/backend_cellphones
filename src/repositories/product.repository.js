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
  return await Product.findAll();
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

module.exports = {
  createProductRepository,
  checkNameExist,
  checkSkuExist,
  checkSlugExist,
  getAllProductReposiroty,
  deleteProductRepository,
  updateProductRepository,
};
