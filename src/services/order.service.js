const {
  findAllOrderRepository,
  findOrdersByUserIdRepository,
  findOrderByIdRepository,
  createOrderRepository,
  createOrderWithItemsRepository,
  updateOrderRepository,
  deleteOrderRepository,
} = require("../repositories/order.repository");

const getAllOrdersService = async () => {
  return await findAllOrderRepository();
};

const getOrdersByUserIdService = async (userId) => {
  return await findOrdersByUserIdRepository(userId);
};

const getOrderByIdService = async (id) => {
  return await findOrderByIdRepository(id);
};

const createOrderService = async (payload) => {
  return await createOrderRepository(payload);
};

const createOrderWithItemsService = async (orderData, items) => {
  return await createOrderWithItemsRepository(orderData, items);
};

const updateOrderService = async (id, payload) => {
  return await updateOrderRepository(id, payload);
};

const deleteOrderService = async (id) => {
  return await deleteOrderRepository(id);
};

module.exports = {
  getAllOrdersService,
  getOrdersByUserIdService,
  getOrderByIdService,
  createOrderService,
  createOrderWithItemsService,
  updateOrderService,
  deleteOrderService,
};
