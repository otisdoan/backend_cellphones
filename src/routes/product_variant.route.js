const express = require("express");
const {
  getAllProductVariantController,
  getProductVariantByIdController,
  createProductVariantController,
  updateProductVariantController,
  deleteProductVariantController,
  getCapacityByProductIdController,
  getProductVariantsByCapacityController,
  getProductVariantByArrayIdController,
} = require("../controllers/product_variant.controller");
const routes = express.Router();

routes.get("/", getAllProductVariantController);
routes.get("/many-id", getProductVariantByArrayIdController);
routes.get("/:id/detail", getProductVariantByIdController);
routes.get("/:id", getProductVariantByIdController);
routes.get("/capacity/:product_id", getCapacityByProductIdController);
routes.get("/by-capacity/:capacity", getProductVariantsByCapacityController);
routes.post("/", createProductVariantController);
routes.patch("/:id", updateProductVariantController);
routes.delete("/:id", deleteProductVariantController);

module.exports = routes;
