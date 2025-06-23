const {
  checkPhoneExists,
  checkEmailExists,
  createUser,
} = require("../repositories/auth.repository");

const registerUser = async (data) => {
  const { phone, email } = data;

  const existingPhone = await checkPhoneExists(phone);
  if (existingPhone) throw new Error("Phone is already registered!");

  const existingEmail = await checkEmailExists(email);
  if (existingEmail) throw new Error("Email is already registered!");

  return await createUser(data);
};

module.exports = {
  registerUser,
};
