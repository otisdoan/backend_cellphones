const {
  getAllProductVariantService,
  getProductVariantByIdService,
  createProductVariantService,
  updateProductVariantService,
  deleteProductVariantService,
  getCapacityByProductIdService,
  getProductVariantsByCapacityService,
} = require("../services/product_variant.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getProductVariantsByCapacityController = async (req, res) => {
  try {
    const { capacity } = req.params;
    const result = await getProductVariantsByCapacityService(capacity);
    successResponse(
      res,
      "Get product variants by capacity successfully!",
      result,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getCapacityByProductIdController = async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await getCapacityByProductIdService(product_id);
    successResponse(
      res,
      "Get capacity by product_id successfully!",
      result,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAllProductVariantController = async (req, res) => {
  try {
    const allVariants = await getAllProductVariantService();
    successResponse(
      res,
      "Get all product variants successfully!",
      allVariants,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductVariantByIdController = async (req, res) => {
  try {
    const [variant] = await getProductVariantByIdService(req.params.id);
    if (!variant) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(
      res,
      "Get product variant by id successfully!",
      variant,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const createProductVariantController = async (req, res) => {
  try {
    const variant = await createProductVariantService(req.body);
    successResponse(res, "Create product variant successfully!", variant, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateProductVariantController = async (req, res) => {
  try {
    const variant = await updateProductVariantService(req.params.id, req.body);
    if (!variant) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update product variant successfully!", variant, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteProductVariantController = async (req, res) => {
  try {
    await deleteProductVariantService(req.params.id);
    successResponse(res, "Delete product variant successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllProductVariantController,
  getProductVariantByIdController,
  createProductVariantController,
  updateProductVariantController,
  deleteProductVariantController,
  getCapacityByProductIdController,
  getProductVariantsByCapacityController,
};
