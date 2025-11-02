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
    // Get query parameters
    const { ids, limit, brand } = req.query;

    // If specific IDs requested, fetch only those
    if (ids) {
      const productIds = ids
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));
      const products = await Promise.all(
        productIds.map((id) => getProductByIdService(id))
      );
      // Filter out null results (products not found)
      const validProducts = products.filter((p) => p !== null);
      return successResponse(
        res,
        "Get products successfully!",
        validProducts,
        200
      );
    }

    // Otherwise get all products
    let allProduct = await getAllProductService();

    // Apply filters if provided
    if (brand) {
      allProduct = allProduct.filter(
        (p) =>
          p.brand_name && p.brand_name.toLowerCase() === brand.toLowerCase()
      );
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        allProduct = allProduct.slice(0, limitNum);
      }
    }

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
    successResponse(
      res,
      "Get products by category successfully!",
      products,
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
  getProductDetailBySlugController,
  getProductByIdController,
  getProductByCategoryController,
};
