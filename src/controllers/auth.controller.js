const { registerUser, getUserByPhone } = require("../services/auth.service");
const { saveToken } = require("../services/token.service");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");
const { generateToken } = require("../utils/jwt.util");
const { successResponse, errorResponse } = require("../utils/response.util");

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

const login = async (req, res) => {
  try {
    const { password_login, phone } = req.body;
    const user = await getUserByPhone(phone);
    await comparePassword(password_login, user.dataValues.password_hash);
    const token = await generateToken(user.dataValues);
    await saveToken(token);
    successResponse(res, "Login successfully!", {
      ...user.dataValues,
      ...token,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  register,
  login,
};
