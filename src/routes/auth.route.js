const express = require("express");
const authController = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { registerSchema } = require("../validators/auth.validator");
const routes = express.Router();

routes.post("/register", validateBody(registerSchema), authController.register);

module.exports = routes;
