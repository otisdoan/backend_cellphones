const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (payload) => {
  const access_token = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  const refresh_token = await jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return { access_token, refresh_token };
};

module.exports = {
  generateToken,
};
