const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, res) => {
  const access_token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("access_token", access_token, {
    httpOnly: false,
    maxAge: 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return { access_token, refresh_token };
};

module.exports = {
  generateToken,
};
