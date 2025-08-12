const {
  findAllOrderItemRepository,
  findOrderItemByIdRepository,
  createOrderItemRepository,
  updateOrderItemRepository,
  deleteOrderItemRepository,
} = require("../repositories/order_item.repository");

const getAllOrderItemsService = async () => {
  return await findAllOrderItemRepository();
};

const getOrderItemByIdService = async (id) => {
  return await findOrderItemByIdRepository(id);
};

const createOrderItemService = async (payload) => {
  return await createOrderItemRepository(payload);
};

const updateOrderItemService = async (id, payload) => {
  return await updateOrderItemRepository(id, payload);
};

const deleteOrderItemService = async (id) => {
  return await deleteOrderItemRepository(id);
};

module.exports = {
  getAllOrderItemsService,
  getOrderItemByIdService,
  createOrderItemService,
  updateOrderItemService,
  deleteOrderItemService,
};
