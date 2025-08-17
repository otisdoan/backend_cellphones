const User = require("../models/user.model");

const findAllUserRepository = async () => {
  return await User.findAll({ order: [["id"]] });
};

const findUserByIdRepository = async (id) => {
  return await User.findOne({ where: { id } });
};

const createUserRepository = async (payload) => {
  return await User.create(payload);
};

const updateUserRepository = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  Object.assign(user, payload);
  await user.save();
  return user;
};

const deleteUserRepository = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  findAllUserRepository,
  findUserByIdRepository,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
};
