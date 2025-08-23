const {
  findAllProductVariantRepository,
  findProductVariantByIdRepository,
  createProductVariantRepository,
  updateProductVariantRepository,
  deleteProductVariantRepository,
  getCapacityByProductIdRepository,
  getProductVariantsByCapacityRepository,
  getProductVariantByArrayIdRepository,
} = require("../repositories/product_variant.repository");

const getProductVariantsByCapacityService = async (capacity, group_name) => {
  return await getProductVariantsByCapacityRepository(capacity, group_name);
};

const getCapacityByProductIdService = async (group_name) => {
  return await getCapacityByProductIdRepository(group_name);
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

const getProductVariantByArrayIdService = async (ids) => {
  return await getProductVariantByArrayIdRepository(ids);
};

module.exports = {
  getAllProductVariantService,
  getProductVariantByIdService,
  createProductVariantService,
  updateProductVariantService,
  deleteProductVariantService,
  getCapacityByProductIdService,
  getProductVariantsByCapacityService,
  getProductVariantByArrayIdService,
};
