const express = require("express");
const {
  createProductController,
  getAllProductController,
  deleteProductController,
  updateProductController,
  getAllNameProductController,
  getProductDetailBySlugController,
  getProductByIdController,
  getProductByCategoryController,
} = require("../controllers/product.controller");
const routes = express.Router();

routes.get("/", getAllProductController);
routes.get("/category/:categoryId", getProductByCategoryController);
routes.get("/:id/detail", getProductByIdController);
routes.get("/name", getAllNameProductController);
routes.get("/:slug", getProductDetailBySlugController);
routes.post("/", createProductController);
routes.delete("/:id", deleteProductController);
routes.patch("/:id", updateProductController);

module.exports = routes;
