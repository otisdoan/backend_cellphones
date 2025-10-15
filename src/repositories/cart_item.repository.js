const CartItem = require("../models/cart_item.model");
const sequelize = require("../configs/database.config");
const { QueryTypes } = require("sequelize");

const findAllCartItemRepository = async () => {
  return await CartItem.findAll();
};

const findCartItemByIdRepository = async (id) => {
  return await sequelize.query(
    ` select pv.*, ci.quantity
      from product_variants pv
      join cart_items ci on pv.product_id = ci.product_id
      where ci.user_id = :id
    `,
    {
      type: QueryTypes.SELECT,
      replacements: { id },
    }
  );
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
