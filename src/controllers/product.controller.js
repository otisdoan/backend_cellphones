const { createProductService } = require("../services/product.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const createProductController = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    successResponse(res, "Create product successfully!", product, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  createProductController,
};
