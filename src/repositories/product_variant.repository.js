const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const ProductVariant = require("../models/product_variant.model");

const getProductVariantsByCapacityRepository = async (capacity, group_name) => {
  const result = await sequelize.query(
    ` SELECT pv.*
      FROM product_variants pv
      JOIN products p ON p.id = pv.product_id
      WHERE p.group_name = :group_name AND pv.capacity = :capacity`,
    {
      replacements: { capacity, group_name },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return result;
};

const getCapacityByProductIdRepository = async (group_name) => {
  const result = await sequelize.query(
    ` SELECT distinct pv.capacity
      FROM product_variants pv
      JOIN products p ON p.id = pv.product_id
      WHERE p.group_name = :group_name`,
    { replacements: { group_name }, type: sequelize.QueryTypes.SELECT }
  );
  return result;
};

const checkProductVariantExist = async (sku) => {
  return await ProductVariant.findOne({ where: { sku } });
};

const findAllProductVariantRepository = async () => {
  return await sequelize.query(
    `
      SELECT pv.*, p.name
      FROM product_variants pv
      JOIN products p ON p.id = pv.product_id
      ORDER BY pv.id
    `,
    { type: QueryTypes.SELECT }
  );
};

const findProductVariantByIdRepository = async (id) => {
  return await sequelize.query(
    `
      SELECT pv.*
      FROM product_variants pv
      JOIN products p ON p.id = pv.product_id
      WHERE pv.id = :id
      ORDER BY pv.id
    `,
    { replacements: { id }, type: QueryTypes.SELECT }
  );
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
        FROM product_variants pv
        JOIN cart_items ci ON pv.product_id = ci.product_id
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
