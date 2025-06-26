const { createToken } = require("../repositories/token.repository");

const saveToken = async (token) => {
  return await createToken(token);
};

module.exports = {
  saveToken,
};
