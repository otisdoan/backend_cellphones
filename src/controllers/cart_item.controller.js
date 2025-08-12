const {
  getAllCartItemsService,
  getCartItemByIdService,
  createCartItemService,
  updateCartItemService,
  deleteCartItemService,
} = require("../services/cart_item.service");

const { successResponse, errorResponse } = require("../utils/response.util");

const getAllCartItemsController = async (req, res) => {
  try {
    const items = await getAllCartItemsService();
    successResponse(res, "Get all cart items successfully!", items, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getCartItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getCartItemByIdService(id);
    if (!item) return errorResponse(res, "Not found", 404);
    successResponse(res, "Get cart item successfully!", item, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createCartItemController = async (req, res) => {
  try {
    const item = await createCartItemService(req.body);
    successResponse(res, "Create cart item successfully!", item, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCartItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateCartItemService(id, req.body);
    if (!updated) return errorResponse(res, "Not found", 404);
    successResponse(res, "Update cart item successfully!", updated, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteCartItemController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCartItemService(id);
    successResponse(res, "Deleted cart item successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllCartItemsController,
  getCartItemByIdController,
  createCartItemController,
  updateCartItemController,
  deleteCartItemController,
};
