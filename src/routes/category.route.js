const express = require("express");
const {
  addCategory,
  getAllCategoryController,
  deleteCategoryController,
  updateCategoryController,
} = require("../controllers/category.controller");
const routes = express.Router();

routes.get("/", getAllCategoryController);
routes.post("/", addCategory);
routes.delete("/:id", deleteCategoryController);
routes.patch("/:id", updateCategoryController);

module.exports = routes;
