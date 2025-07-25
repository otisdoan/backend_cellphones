const { createCategory } = require("../services/category.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const addCategory = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    successResponse(res, "Create category successfully!", category, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addCategory,
};
