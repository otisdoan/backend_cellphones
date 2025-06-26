const express = require("express");
const authController = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const routes = express.Router();

routes.post("/register", validateBody(registerSchema), authController.register);
routes.post("/login", validateBody(loginSchema), authController.login);
routes.post("/google", authController.loginWithGoogle);

module.exports = routes;
