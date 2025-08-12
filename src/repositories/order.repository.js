const Order = require("../models/order.model");

const findAllOrderRepository = async () => {
  return await Order.findAll();
};

const findOrderByIdRepository = async (id) => {
  return await Order.findByPk(id);
};

const createOrderRepository = async (payload) => {
  return await Order.create(payload);
};

const updateOrderRepository = async (id, payload) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  Object.assign(order, payload);
  await order.save();
  return order;
};

const deleteOrderRepository = async (id) => {
  return await Order.destroy({ where: { id } });
};

module.exports = {
  findAllOrderRepository,
  findOrderByIdRepository,
  createOrderRepository,
  updateOrderRepository,
  deleteOrderRepository,
};
