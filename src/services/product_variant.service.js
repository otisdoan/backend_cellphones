const productVariantRepository = require("../repositories/product_variant.repository");

const getAllProductVariantService = async () => {
  return await productVariantRepository.findAll();
};

const getProductVariantByIdService = async (id) => {
  return await productVariantRepository.findById(id);
};

const createProductVariantService = async (payload) => {
  return await productVariantRepository.create(payload);
};

const updateProductVariantService = async (id, payload) => {
  return await productVariantRepository.update(id, payload);
};

const deleteProductVariantService = async (id) => {
  return await productVariantRepository.delete(id);
};

module.exports = {
  getAllProductVariantService,
  getProductVariantByIdService,
  createProductVariantService,
  updateProductVariantService,
  deleteProductVariantService,
};
