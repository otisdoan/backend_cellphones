const { errorResponse } = require("../utils/response.util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const reuqireToken = (req, res, next) => {
  try {
    if (!req.cookies.access_token) {
      throw new Error("Required token or expired token!");
    }
    const decoded = jwt.verify(
      req.cookies.access_token,
      process.env.JWT_ACCESS_TOKEN
    );
    req.user_infor = decoded;
    next();
  } catch (error) {
    errorResponse(res, error, 401);
  }
};

module.exports = { reuqireToken };
