const express = require("express");
const {
  createBrandController,
  getAllBrandController,
  deleteBrandController,
  updateBrandController,
  getAllNameBrandController,
  getBrandCategoryController,
} = require("../controllers/brand.controller");
const routes = express.Router();

routes.get("/", getAllBrandController);
routes.get("/name", getAllNameBrandController);
routes.get("/:id", getBrandCategoryController);
routes.post("/", createBrandController);
routes.delete("/:id", deleteBrandController);
routes.patch("/:id", updateBrandController);

module.exports = routes;
