const {
  findAllUserAddressRepository,
  findUserAddressByIdRepository,
  createUserAddressRepository,
  updateUserAddressRepository,
  deleteUserAddressRepository,
} = require("../repositories/user_address.repository");

const getAllUserAddressService = async () => {
  return await findAllUserAddressRepository();
};

const getUserAddressByIdService = async (id) => {
  return await findUserAddressByIdRepository(id);
};

const createUserAddressService = async (payload) => {
  return await createUserAddressRepository(payload);
};

const updateUserAddressService = async (id, payload) => {
  return await updateUserAddressRepository(id, payload);
};

const deleteUserAddressService = async (id) => {
  return await deleteUserAddressRepository(id);
};

module.exports = {
  getAllUserAddressService,
  getUserAddressByIdService,
  createUserAddressService,
  updateUserAddressService,
  deleteUserAddressService,
};
