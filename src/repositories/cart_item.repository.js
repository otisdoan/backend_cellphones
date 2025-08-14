const CartItem = require("../models/cart_item.model");

const findAllCartItemRepository = async () => {
  return await CartItem.findAll();
};

const findCartItemByIdRepository = async (id) => {
  return await CartItem.findAll({ where: { user_id: id } });
};

const createCartItemRepository = async (payload) => {
  return await CartItem.create(payload);
};

const updateCartItemRepository = async (id, payload) => {
  const item = await CartItem.findByPk(id);
  if (!item) return null;
  Object.assign(item, payload);
  await item.save();
  return item;
};

const deleteCartItemRepository = async (id) => {
  return await CartItem.destroy({ where: { id } });
};

const getCartItemByUserIdRepository = async (user_id) => {
  return await CartItem.findAll({ where: { user_id } });
};

module.exports = {
  findAllCartItemRepository,
  findCartItemByIdRepository,
  createCartItemRepository,
  updateCartItemRepository,
  deleteCartItemRepository,
  getCartItemByUserIdRepository,
};
