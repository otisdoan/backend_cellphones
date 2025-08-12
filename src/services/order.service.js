const {
  findAllOrderRepository,
  findOrderByIdRepository,
  createOrderRepository,
  updateOrderRepository,
  deleteOrderRepository,
} = require("../repositories/order.repository");

const getAllOrdersService = async () => {
  return await findAllOrderRepository();
};

const getOrderByIdService = async (id) => {
  return await findOrderByIdRepository(id);
};

const createOrderService = async (payload) => {
  return await createOrderRepository(payload);
};

const updateOrderService = async (id, payload) => {
  return await updateOrderRepository(id, payload);
};

const deleteOrderService = async (id) => {
  return await deleteOrderRepository(id);
};

module.exports = {
  getAllOrdersService,
  getOrderByIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
};
