const {
  getAllProductReviewService,
  getProductReviewByIdService,
  createProductReviewService,
  updateProductReviewService,
  deleteProductReviewService,
} = require("../services/product_review.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllProductReviewController = async (req, res) => {
  try {
    const allReviews = await getAllProductReviewService();
    successResponse(res, "Get all product reviews successfully!", allReviews, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductReviewByIdController = async (req, res) => {
  try {
    const review = await getProductReviewByIdService(req.params.id);
    if (!review) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Get product review by id successfully!", review, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createProductReviewController = async (req, res) => {
  try {
    const review = await createProductReviewService(req.body);
    successResponse(res, "Create product review successfully!", review, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateProductReviewController = async (req, res) => {
  try {
    const review = await updateProductReviewService(req.params.id, req.body);
    if (!review) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update product review successfully!", review, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteProductReviewController = async (req, res) => {
  try {
    await deleteProductReviewService(req.params.id);
    successResponse(res, "Delete product review successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllProductReviewController,
  getProductReviewByIdController,
  createProductReviewController,
  updateProductReviewController,
  deleteProductReviewController,
};
