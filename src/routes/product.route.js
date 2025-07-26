const express = require("express");
const {
  createProductController,
  getAllProductController,
  deleteProductController,
  updateProductController,
} = require("../controllers/product.controller");
const routes = express.Router();

routes.get("/", getAllProductController);
routes.post("/", createProductController);
routes.delete("/:id", deleteProductController);
routes.patch("/:id", updateProductController);

module.exports = routes;
