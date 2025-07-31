const {
  createProductService,
  getAllProductService,
  deleteProductService,
  updateProductService,
  getAllNameProductService,
} = require("../services/product.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const createProductController = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    successResponse(res, "Create product successfully!", product, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAllProductController = async (req, res) => {
  try {
    const allProduct = await getAllProductService();
    successResponse(res, "Get all product successfully!", allProduct, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    successResponse(res, "Delete product successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const paload = req.body;
    const product = await updateProductService(id, paload);
    successResponse(res, "Update product successfully!", product, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAllNameProductController = async (req, res) => {
  try {
    const allNameProduct = await getAllNameProductService();
    successResponse(
      res,
      "Get all name product successfully!",
      allNameProduct,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  deleteProductController,
  updateProductController,
  getAllNameProductController,
};
