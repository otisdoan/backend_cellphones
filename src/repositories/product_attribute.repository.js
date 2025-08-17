const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const ProductAttribute = require("../models/product_attribute.model");

const checkProductAttributeExist = async (product_id, attribute_name) => {
  return await ProductAttribute.findOne({
    where: { product_id, attribute_name },
  });
};

const findAllProductAttributeRepository = async () => {
  return await sequelize.query(
    `
      SELECT pa.*, p.name as product_name
      FROM product_attributes pa
      JOIN products p ON p.id = pa.product_id
      ORDER BY pa.id
    `,
    { type: QueryTypes.SELECT }
  );
};

const findProductAttributeByIdProductRepository = async (id) => {
  return await ProductAttribute.findAll({ where: { product_id: id } });
};

const createProductAttributeRepository = async (payload) => {
  return await ProductAttribute.create(payload);
};

const updateProductAttributeRepository = async (id, payload) => {
  const attribute = await ProductAttribute.findByPk(id);
  if (!attribute) return null;
  Object.assign(attribute, payload);
  await attribute.save();
  return attribute;
};

const deleteProductAttributeRepository = async (id) => {
  return await ProductAttribute.destroy({ where: { id } });
};

const getProductAttributeByIdRepository = async (id) => {
  const result = await ProductAttribute.findOne({ where: { id } });
  return result;
};
module.exports = {
  checkProductAttributeExist,
  findAllProductAttributeRepository,
  findProductAttributeByIdProductRepository,
  createProductAttributeRepository,
  updateProductAttributeRepository,
  deleteProductAttributeRepository,
  getProductAttributeByIdRepository,
};
