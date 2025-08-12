const ProductAttribute = require("../models/product_attribute.model");

const checkProductAttributeExist = async (product_id, attribute_name) => {
  return await ProductAttribute.findOne({
    where: { product_id, attribute_name },
  });
};

const findAllProductAttributeRepository = async () => {
  return await ProductAttribute.findAll();
};

const findProductAttributeByIdRepository = async (id) => {
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

module.exports = {
  checkProductAttributeExist,
  findAllProductAttributeRepository,
  findProductAttributeByIdRepository,
  createProductAttributeRepository,
  updateProductAttributeRepository,
  deleteProductAttributeRepository,
};
