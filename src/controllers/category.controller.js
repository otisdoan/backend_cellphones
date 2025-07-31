const {
  createCategory,
  getAllCategoryService,
  deleteCategoryService,
  updateCategoryService,
  getAllNameCategoryService,
} = require("../services/category.service");

const { successResponse, errorResponse } = require("../utils/response.util");

const getAllCategoryController = async (req, res) => {
  try {
    const category = await getAllCategoryService();
    successResponse(res, "Get all category successfully!", category, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const addCategory = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    successResponse(res, "Create category successfully!", category, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategoryService(id);
    successResponse(res, "Deleted category successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const paload = req.body;
    const newCategory = await updateCategoryService(id, paload);
    successResponse(res, "Update category successfully!", newCategory, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAllNameCategoryController = async (req, res) => {
  try {
    const allCategory = await getAllNameCategoryService();
    successResponse(
      res,
      "Get all name category successfully!",
      allCategory,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addCategory,
  getAllCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getAllNameCategoryController,
};
