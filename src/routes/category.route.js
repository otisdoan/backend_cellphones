const express = require("express");
const {
  addCategory,
  getAllCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getAllNameCategoryController,
  categoryMobileController,
  categoryTabletController,
  getCategoryByIdController,
} = require("../controllers/category.controller");
const routes = express.Router();

routes.get("/", getAllCategoryController);
routes.get("/:id/detail", getCategoryByIdController);
routes.get("/name", getAllNameCategoryController);
routes.get("/category-mobile", categoryMobileController);
routes.get("/category-tablet-mobile", categoryTabletController);
routes.post("/", addCategory);
routes.delete("/:id", deleteCategoryController);
routes.patch("/:id", updateCategoryController);

module.exports = routes;
