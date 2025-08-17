const {
  getAllProductAttributeService,
  getProductAttributeByIdService,
  createProductAttributeService,
  updateProductAttributeService,
  deleteProductAttributeService,
  getProductAttributeByIdProductService,
} = require("../services/product_attribute.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllProductAttributeController = async (req, res) => {
  try {
    const allAttributes = await getAllProductAttributeService();
    successResponse(
      res,
      "Get all product attributes successfully!",
      allAttributes,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductAttributeByIdProductController = async (req, res) => {
  try {
    const attribute = await getProductAttributeByIdProductService(
      req.params.id
    );
    if (!attribute) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(
      res,
      "Get product attribute by id successfully!",
      attribute,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const createProductAttributeController = async (req, res) => {
  try {
    const attribute = await createProductAttributeService(req.body);
    successResponse(
      res,
      "Create product attribute successfully!",
      attribute,
      201
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateProductAttributeController = async (req, res) => {
  try {
    const attribute = await updateProductAttributeService(
      req.params.id,
      req.body
    );
    if (!attribute) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(
      res,
      "Update product attribute successfully!",
      attribute,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductAttributeByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await getProductAttributeByIdService(id);
    if (!attribute) {
      return successResponse(res, "Product attribute not found!", null, 404);
    }
    successResponse(
      res,
      "Get product attribute by id successfully!",
      attribute,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteProductAttributeController = async (req, res) => {
  try {
    await deleteProductAttributeService(req.params.id);
    successResponse(res, "Delete product attribute successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllProductAttributeController,
  getProductAttributeByIdController,
  getProductAttributeByIdProductController,
  createProductAttributeController,
  updateProductAttributeController,
  deleteProductAttributeController,
};
