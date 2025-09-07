require("dotenv").config();
const {
  registerUser,
  getUserByPhone,
  getUserByEmail,
} = require("../services/auth.service");
const { getGoogleUserInfo } = require("../services/google.service");
const { saveToken } = require("../services/token.service");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util");
const { generateToken } = require("../utils/jwt.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const jwt = require("jsonwebtoken");

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
    const { id, role } = user;
    await comparePassword(password_login, user.password_hash);
    const token = await generateToken(
      {
        id,
        role,
      },
      res
    );
    await saveToken(token);
    successResponse(res, "Login successfully!", {
      ...{ id, role },
      ...token,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
    // const ticket = await client.verifyIdToken({
    //   idToken: credential,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    // const payload = ticket.getPayload();
    // console.log(payload);
    const googleUser = await getGoogleUserInfo(token);
    const user = await getUserByEmail(googleUser.email);
    const tokens = await generateToken(user.dataValues, res);
    await saveToken(tokens);
    successResponse(res, "Login successfully!", {
      ...user.dataValues,
      ...tokens,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    const token = generateToken(payload, res);
    successResponse(res, "", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  register,
  login,
  loginWithGoogle,
  refreshTokenController,
};
