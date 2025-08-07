const express = require("express");
const {
  getAllProductVariantController,
  getProductVariantByIdController,
  createProductVariantController,
  updateProductVariantController,
  deleteProductVariantController,
} = require("../controllers/product_variant.controller");
const routes = express.Router();

routes.get("/", getAllProductVariantController);
routes.get("/:id", getProductVariantByIdController);
routes.post("/", createProductVariantController);
routes.patch("/:id", updateProductVariantController);
routes.delete("/:id", deleteProductVariantController);

module.exports = routes;
