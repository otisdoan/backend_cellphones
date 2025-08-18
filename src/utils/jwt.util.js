const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (payload, res) => {
  const access_token = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  const refresh_token = await jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("access_token", access_token, {
    httpOnly: false,
    maxAge: 60 * 1000,
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateToken,
};
