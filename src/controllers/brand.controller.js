const {
  createBrandService,
  getAllBrandService,
  deleteBrandService,
  updateBrandService,
  getAllNameBrandService,
  getBrandByCategoryService,
  getBrandByIdService,
} = require("../services/brand.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllBrandController = async (req, res) => {
  try {
    const allBrand = await getAllBrandService();
    successResponse(res, "Get all brand successfully!", allBrand, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAllNameBrandController = async (req, res) => {
  try {
    const allNameBrand = await getAllNameBrandService();
    successResponse(res, "Get all name brand successfully!", allNameBrand, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};
const createBrandController = async (req, res) => {
  try {
    const brand = await createBrandService(req.body);
    successResponse(res, "Create brand successfully!", brand, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBrandService(id);
    successResponse(res, "Detele brand successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const newBrand = await updateBrandService(id, payload);
    successResponse(res, "Update brand successfully!", newBrand, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if (!brand) {
      return successResponse(res, "Brand not found!", null, 404);
    }
    successResponse(res, "Get brand by id successfully!", brand, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

// const getBrandCategoryController = async (req, res) => {
//   try {
//     const brand = await getBrandByCategoryService(id);
//     successResponse(res, "Get brand by category successfully!", brand, 200);
//   } catch (error) {
//     errorResponse(res, error);
//   }
// };
module.exports = {
  createBrandController,
  getAllBrandController,
  deleteBrandController,
  updateBrandController,
  getAllNameBrandController,
  getBrandByIdController,
  // getBrandCategoryController,
};
