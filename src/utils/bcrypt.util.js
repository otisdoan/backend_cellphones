const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (passwordLogin, passwordHashed) => {
  const validPassword = await bcrypt.compare(passwordLogin, passwordHashed);
  if (!validPassword) throw new Error("Password is invalid!");
  return validPassword;
};

module.exports = {
  hashPassword,
  comparePassword,
};
