const ProductVariant = require("../models/product_variant.model");

const checkProductVariantExist = async (sku) => {
  return await ProductVariant.findOne({ where: { sku } });
};

const findAllProductVariantRepository = async () => {
  return await ProductVariant.findAll();
};

const findProductVariantByIdRepository = async (id) => {
  return await ProductVariant.findByPk(id);
};

const createProductVariantRepository = async (payload) => {
  return await ProductVariant.create(payload);
};

const updateProductVariantRepository = async (id, payload) => {
  const variant = await ProductVariant.findByPk(id);
  if (!variant) return null;
  Object.assign(variant, payload);
  await variant.save();
  return variant;
};

const deleteProductVariantRepository = async (id) => {
  return await ProductVariant.destroy({ where: { id } });
};

module.exports = {
  checkProductVariantExist,
  findAllProductVariantRepository,
  findProductVariantByIdRepository,
  createProductVariantRepository,
  updateProductVariantRepository,
  deleteProductVariantRepository,
};
