const {
  findAllProductVariantRepository,
  findProductVariantByIdRepository,
  createProductVariantRepository,
  updateProductVariantRepository,
  deleteProductVariantRepository,
  getCapacityByProductIdRepository,
  getProductVariantsByCapacityRepository,
} = require("../repositories/product_variant.repository");

const getProductVariantsByCapacityService = async (capacity) => {
  return await getProductVariantsByCapacityRepository(capacity);
};

const getCapacityByProductIdService = async (product_id) => {
  return await getCapacityByProductIdRepository(product_id);
};

const getAllProductVariantService = async () => {
  return await findAllProductVariantRepository();
};

const getProductVariantByIdService = async (id) => {
  return await findProductVariantByIdRepository(id);
};

const createProductVariantService = async (payload) => {
  return await createProductVariantRepository(payload);
};

const updateProductVariantService = async (id, payload) => {
  return await updateProductVariantRepository(id, payload);
};

const deleteProductVariantService = async (id) => {
  return await deleteProductVariantRepository(id);
};

module.exports = {
  getAllProductVariantService,
  getProductVariantByIdService,
  createProductVariantService,
  updateProductVariantService,
  deleteProductVariantService,
  getCapacityByProductIdService,
  getProductVariantsByCapacityService,
};
