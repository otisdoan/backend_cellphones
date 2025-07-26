const express = require("express");
const {
  createProductController,
} = require("../controllers/product.controller");
const routes = express.Router();

routes.post("/", createProductController);

module.exports = routes;
