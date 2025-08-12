const {
  getAllOrderItemsService,
  getOrderItemByIdService,
  createOrderItemService,
  updateOrderItemService,
  deleteOrderItemService,
} = require("../services/order_item.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllOrderItemsController = async (req, res, next) => {
  try {
    const data = await getAllOrderItemsService();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getOrderItemByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOrderItemByIdService(id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createOrderItemController = async (req, res) => {
  try {
    const data = await createOrderItemService(req.body);
    successResponse(res, "Create order items successfully!", data, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateOrderItemController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateOrderItemService(id, req.body);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteOrderItemController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOrderItemService(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrderItemsController,
  getOrderItemByIdController,
  createOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
};
