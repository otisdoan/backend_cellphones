const {
  findAllUserRepository,
  findUserByIdRepository,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository,
} = require("../repositories/user.repository");

const getAllUsersService = async () => {
  return await findAllUserRepository();
};

const getUserByIdService = async (id) => {
  return await findUserByIdRepository(id);
};

const createUserService = async (payload) => {
  return await createUserRepository(payload);
};

const updateUserService = async (id, payload) => {
  return await updateUserRepository(id, payload);
};

const deleteUserService = async (id) => {
  return await deleteUserRepository(id);
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
