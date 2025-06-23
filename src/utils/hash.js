const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (passwordLogin, passwordHashed) => {
  return await bcrypt.compare(passwordLogin, passwordHashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
