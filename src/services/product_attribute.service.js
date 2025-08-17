const {
  findAllProductAttributeRepository,
  findProductAttributeByIdProductRepository,
  createProductAttributeRepository,
  updateProductAttributeRepository,
  deleteProductAttributeRepository,
  getProductAttributeByIdRepository,
} = require("../repositories/product_attribute.repository");

const getAllProductAttributeService = async () => {
  return await findAllProductAttributeRepository();
};

const getProductAttributeByIdProductService = async (id) => {
  return await findProductAttributeByIdProductRepository(id);
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

const getProductAttributeByIdService = async (id) => {
  return await getProductAttributeByIdRepository(id);
};
module.exports = {
  getAllProductAttributeService,
  getProductAttributeByIdProductService,
  createProductAttributeService,
  updateProductAttributeService,
  deleteProductAttributeService,
  getProductAttributeByIdService,
};
