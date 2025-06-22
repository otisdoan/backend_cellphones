const express = require("express");
const { register } = require("../controllers/auth.controller");
const routes = express.Router();

routes.post("/register", register);

module.exports = routes;
