const { registerUser } = require("../services/auth.service");
const { hashPassword } = require("../utils/hash");
const { successResponse, errorResponse } = require("../utils/response");

const register = async (req, res) => {
  try {
    const { password_hash } = req.body;
    const password_hashed = await hashPassword(password_hash);
    const newUser = await registerUser({
      ...req.body,
      password_hash: password_hashed,
    });
    successResponse(res, "Register successfully!", newUser);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  register,
};
