const {
  getAllOrdersService,
  getOrdersByUserIdService,
  getOrderByIdService,
  createOrderService,
  createOrderWithItemsService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllOrdersController = async (req, res, next) => {
  try {
    // Check if user_id query param exists
    const { user_id } = req.query;

    let data;
    if (user_id) {
      data = await getOrdersByUserIdService(user_id);
    } else {
      data = await getAllOrdersService();
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getOrderByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOrderByIdService(id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createOrderController = async (req, res) => {
  try {
    const { items, ...orderData } = req.body;

    let data;
    if (items && items.length > 0) {
      // Create order with items in transaction
      data = await createOrderWithItemsService(orderData, items);
    } else {
      // Create order only
      data = await createOrderService(orderData);
    }

    successResponse(res, "Create order successfully!", data, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateOrderController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateOrderService(id, req.body);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const deleteOrderController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOrderService(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};
