const express = require("express");
const {
  getAllImageController,
  createImageController,
  deleteImageController,
  updateImageController,
  getProductImageByIdController,
} = require("../controllers/product_image.controller");
const routes = express.Router();

routes.get("/", getAllImageController);
routes.get("/:id/detail", getProductImageByIdController);
routes.post("/", createImageController);
routes.delete("/:id", deleteImageController);
routes.patch("/:id", updateImageController);

module.exports = routes;
