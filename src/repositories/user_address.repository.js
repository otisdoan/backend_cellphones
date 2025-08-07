const UserAddress = require("../models/user_address.model");

const findAllUserAddressRepository = async () => {
  return await UserAddress.findAll();
};

const findUserAddressByIdRepository = async (id) => {
  return await UserAddress.findByPk(id);
};

const createUserAddressRepository = async (payload) => {
  return await UserAddress.create(payload);
};

const updateUserAddressRepository = async (id, payload) => {
  const address = await UserAddress.findByPk(id);
  if (!address) return null;
  Object.assign(address, payload);
  await address.save();
  return address;
};

const deleteUserAddressRepository = async (id) => {
  return await UserAddress.destroy({ where: { id } });
};

module.exports = {
  findAllUserAddressRepository,
  findUserAddressByIdRepository,
  createUserAddressRepository,
  updateUserAddressRepository,
  deleteUserAddressRepository,
};
