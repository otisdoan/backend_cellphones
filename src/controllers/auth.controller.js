require("dotenv").config();
const {
  registerUser,
  getUserByPhone,
  getUserByEmail,
} = require("../services/auth.service");
const { saveToken } = require("../services/token.service");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");
const { generateToken } = require("../utils/jwt.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { OAuth2Client } = require("google-auth-library");

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

const loginWithGoogle = async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const { email } = payload;
    const user = await getUserByEmail(email);
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
  loginWithGoogle,
};
