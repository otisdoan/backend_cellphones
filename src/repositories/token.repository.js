const Token = require("../models/token.model");

const createToken = async (token) => {
  return await Token.create(token);
};

module.exports = {
  createToken,
};
