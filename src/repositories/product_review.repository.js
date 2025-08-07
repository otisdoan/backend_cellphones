const ProductReview = require("../models/product_review.model");

const checkProductReviewExist = async (product_id, user_id) => {
  return await ProductReview.findOne({ where: { product_id, user_id } });
};

const findAllProductReviewRepository = async () => {
  return await ProductReview.findAll();
};

const findProductReviewByIdRepository = async (id) => {
  return await ProductReview.findByPk(id);
};

const createProductReviewRepository = async (payload) => {
  return await ProductReview.create(payload);
};

const updateProductReviewRepository = async (id, payload) => {
  const review = await ProductReview.findByPk(id);
  if (!review) return null;
  Object.assign(review, payload);
  await review.save();
  return review;
};

const deleteProductReviewRepository = async (id) => {
  return await ProductReview.destroy({ where: { id } });
};

module.exports = {
  checkProductReviewExist,
  findAllProductReviewRepository,
  findProductReviewByIdRepository,
  createProductReviewRepository,
  updateProductReviewRepository,
  deleteProductReviewRepository,
};
