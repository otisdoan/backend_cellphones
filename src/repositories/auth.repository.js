const User = require("../models/user.model");

const checkPhoneExists = async (phone) => {
  return await User.findOne({ where: { phone } });
};

const checkEmailExists = async (email) => {
  return await User.findOne({ where: { email } });
};

const createUser = async (data) => {
  return await User.create(data);
};

const findUserByPhone = async (phone) => {
  return await User.findOne({ where: { phone } });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  checkPhoneExists,
  checkEmailExists,
  createUser,
  findUserByPhone,
  findUserByEmail,
};
