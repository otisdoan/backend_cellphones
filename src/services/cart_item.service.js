const {
  findAllCartItemRepository,
  findCartItemByIdRepository,
  createCartItemRepository,
  updateCartItemRepository,
  deleteCartItemRepository,
} = require("../repositories/cart_item.repository");

const getAllCartItemsService = async () => {
  return await findAllCartItemRepository();
};

const getCartItemByIdService = async (id) => {
  return await findCartItemByIdRepository(id);
};

const createCartItemService = async (payload) => {
  return await createCartItemRepository(payload);
};

const updateCartItemService = async (id, payload) => {
  return await updateCartItemRepository(id, payload);
};

const deleteCartItemService = async (id) => {
  return await deleteCartItemRepository(id);
};

module.exports = {
  getAllCartItemsService,
  getCartItemByIdService,
  createCartItemService,
  updateCartItemService,
  deleteCartItemService,
};
