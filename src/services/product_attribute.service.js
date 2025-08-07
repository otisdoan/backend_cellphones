const {
  findAllProductAttributeRepository,
  findProductAttributeByIdRepository,
  createProductAttributeRepository,
  updateProductAttributeRepository,
  deleteProductAttributeRepository,
} = require("../repositories/product_attribute.repository");

const getAllProductAttributeService = async () => {
  return await findAllProductAttributeRepository();
};

const getProductAttributeByIdService = async (id) => {
  return await findProductAttributeByIdRepository(id);
};

const createProductAttributeService = async (payload) => {
  return await createProductAttributeRepository(payload);
};

const updateProductAttributeService = async (id, payload) => {
  return await updateProductAttributeRepository(id, payload);
};

const deleteProductAttributeService = async (id) => {
  return await deleteProductAttributeRepository(id);
};

module.exports = {
  getAllProductAttributeService,
  getProductAttributeByIdService,
  createProductAttributeService,
  updateProductAttributeService,
  deleteProductAttributeService,
};
