const OrderItem = require("../models/order_item.model");

const findAllOrderItemRepository = async () => {
  return await OrderItem.findAll();
};

const findOrderItemByIdRepository = async (id) => {
  return await OrderItem.findByPk(id);
};

const createOrderItemRepository = async (payload) => {
  return await OrderItem.create(payload);
};

const updateOrderItemRepository = async (id, payload) => {
  const item = await OrderItem.findByPk(id);
  if (!item) return null;
  Object.assign(item, payload);
  await item.save();
  return item;
};

const deleteOrderItemRepository = async (id) => {
  return await OrderItem.destroy({ where: { id } });
};

module.exports = {
  findAllOrderItemRepository,
  findOrderItemByIdRepository,
  createOrderItemRepository,
  updateOrderItemRepository,
  deleteOrderItemRepository,
};
