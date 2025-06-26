const {
  checkPhoneExists,
  checkEmailExists,
  createUser,
  findUserByPhone,
} = require("../repositories/auth.repository");

const registerUser = async (data) => {
  const { phone, email } = data;

  const existingPhone = await checkPhoneExists(phone);
  if (existingPhone) throw new Error("Phone is already registered!");

  const existingEmail = await checkEmailExists(email);
  if (existingEmail) throw new Error("Email is already registered!");

  return await createUser(data);
};

const getUserByPhone = async (phone) => {
  const existingPhone = await checkPhoneExists(phone);
  if (!existingPhone) throw new Error("Phone number is not registered");
  return await findUserByPhone(phone);
};
module.exports = {
  registerUser,
  getUserByPhone,
};
