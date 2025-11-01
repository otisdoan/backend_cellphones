const {
  createProductService,
  getAllProductService,
  deleteProductService,
  updateProductService,
  getAllNameProductService,
  getProductDetailBySlugService,
  getProductByIdService,
  getProductByCategoryService,
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

const getProductDetailBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await getProductDetailBySlugService(slug);
    successResponse(res, "Get product by slug successfully!", product, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if (!product) {
      return successResponse(res, "Product not found!", null, 404);
    }
    successResponse(res, "Get product by id successfully!", product, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProductByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await getProductByCategoryService(categoryId);
    successResponse(res, "Get products by category successfully!", products, 200);
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
  getProductDetailBySlugController,
  getProductByIdController,
  getProductByCategoryController,
};
