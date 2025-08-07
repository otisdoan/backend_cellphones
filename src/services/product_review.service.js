const {
  findAllProductReviewRepository,
  findProductReviewByIdRepository,
  createProductReviewRepository,
  updateProductReviewRepository,
  deleteProductReviewRepository,
} = require("../repositories/product_review.repository");

const getAllProductReviewService = async () => {
  return await findAllProductReviewRepository();
};

const getProductReviewByIdService = async (id) => {
  return await findProductReviewByIdRepository(id);
};

const createProductReviewService = async (payload) => {
  return await createProductReviewRepository(payload);
};

const updateProductReviewService = async (id, payload) => {
  return await updateProductReviewRepository(id, payload);
};

const deleteProductReviewService = async (id) => {
  return await deleteProductReviewRepository(id);
};

module.exports = {
  getAllProductReviewService,
  getProductReviewByIdService,
  createProductReviewService,
  updateProductReviewService,
  deleteProductReviewService,
};
