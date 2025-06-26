const {
  checkPhoneExists,
  checkEmailExists,
  createUser,
  findUserByPhone,
  findUserByEmail,
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
  if (!existingPhone) throw new Error("Phone number is not registered!");
  return await findUserByPhone(phone);
};

const getUserByEmail = async (emai) => {
  const existingEmail = await checkEmailExists(emai);
  if (!existingEmail) throw new Error("Email is not registed!");
  return await findUserByEmail(emai);
};

module.exports = {
  registerUser,
  getUserByPhone,
  getUserByEmail,
};
