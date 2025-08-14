const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const ProductVariant = require("../models/product_variant.model");

const getProductVariantsByCapacityRepository = async (capacity) => {
  const result = await sequelize.query(
    `SELECT * FROM product_variants WHERE capacity = :capacity`,
    { replacements: { capacity }, type: sequelize.QueryTypes.SELECT }
  );
  return result;
};

const getCapacityByProductIdRepository = async (product_id) => {
  const result = await sequelize.query(
    `SELECT DISTINCT capacity FROM product_variants WHERE product_id = :product_id`,
    { replacements: { product_id }, type: sequelize.QueryTypes.SELECT }
  );
  return result;
};

const checkProductVariantExist = async (sku) => {
  return await ProductVariant.findOne({ where: { sku } });
};

const findAllProductVariantRepository = async () => {
  return await ProductVariant.findAll();
};

const findProductVariantByIdRepository = async (id) => {
  return await ProductVariant.findAll({ where: { id } });
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

const getProductVariantByArrayIdRepository = async (ids) => {
  return await sequelize.query(
    `
        SELECT *
        FROM product_variants
        WHERE id IN (${ids})
    `,
    { replacements: { ids }, type: QueryTypes.SELECT }
  );
};

module.exports = {
  checkProductVariantExist,
  findAllProductVariantRepository,
  findProductVariantByIdRepository,
  createProductVariantRepository,
  updateProductVariantRepository,
  deleteProductVariantRepository,
  getCapacityByProductIdRepository,
  getProductVariantsByCapacityRepository,
  getProductVariantByArrayIdRepository,
};
