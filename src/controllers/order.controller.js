const {
  getAllOrdersService,
  getOrderByIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order.service");

const getAllOrdersController = async (req, res, next) => {
  try {
    const data = await getAllOrdersService();
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

const createOrderController = async (req, res, next) => {
  try {
    const data = await createOrderService(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
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
