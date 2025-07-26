const express = require("express");
const {
  createBrandController,
  getAllBrandController,
  deleteBrandController,
  updateBrandController,
} = require("../controllers/brand.controller");
const routes = express.Router();

routes.get("/", getAllBrandController);
routes.post("/", createBrandController);
routes.delete("/:id", deleteBrandController);
routes.patch("/:id", updateBrandController);

module.exports = routes;
