const express = require("express");
const {
  createProductController,
  getAllProductController,
  deleteProductController,
  updateProductController,
  getAllNameProductController,
} = require("../controllers/product.controller");
const routes = express.Router();

routes.get("/", getAllProductController);
routes.get("/name", getAllNameProductController);
routes.post("/", createProductController);
routes.delete("/:id", deleteProductController);
routes.patch("/:id", updateProductController);

module.exports = routes;
