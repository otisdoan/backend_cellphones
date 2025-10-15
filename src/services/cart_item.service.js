const {
  findAllCartItemRepository,
  findCartItemByIdRepository,
  createCartItemRepository,
  updateCartItemRepository,
  deleteCartItemRepository,
  getCartItemByUserIdRepository,
  checkItemExistRepository,
} = require("../repositories/cart_item.repository");

const getAllCartItemsService = async () => {
  return await findAllCartItemRepository();
};

const getCartItemByIdService = async (id) => {
  return await findCartItemByIdRepository(id);
};

const createCartItemService = async (payload) => {
  const { product_id, variant_id, quantity } = payload;
  const existingItems = await checkItemExistRepository(product_id, variant_id);

  if (existingItems) {
    const updatedItem = await updateCartItemRepository(existingItems.id, {
      ...payload,
      quantity: existingItems.quantity + (Number(quantity) || 1),
    });
    return updatedItem;
  }
  return await createCartItemRepository(payload);
};

const updateCartItemService = async (id, payload) => {
  return await updateCartItemRepository(id, payload);
};

const deleteCartItemService = async (id) => {
  return await deleteCartItemRepository(id);
};

const getCartItemByUserIdService = async (user_id) => {
  return await getCartItemByUserIdRepository(user_id);
};

module.exports = {
  getAllCartItemsService,
  getCartItemByIdService,
  createCartItemService,
  updateCartItemService,
  deleteCartItemService,
  getCartItemByUserIdService,
};
