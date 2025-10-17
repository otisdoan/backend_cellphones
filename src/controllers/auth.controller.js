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
    const { token } = req.body;
    const googleUser = await getGoogleUserInfo(token);

    const existingUser = await getUserByEmail(googleUser.email);
    if (!existingUser) {
      existingUser = await registerUser({
        ...req.body,
        phone: Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 10)
        ).join(""),
        email: googleUser.email,
        full_name: googleUser.name,
        password_hash: await hashPassword(
          Array.from({ length: 12 }, () =>
            Math.random().toString(36).charAt(2)
          ).join("")
        ),
      });
    }

    const tokens = await generateToken(existingUser.dataValues, res);
    await saveToken(tokens);
    successResponse(res, "Login successfully!", {
      ...existingUser.dataValues,
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
