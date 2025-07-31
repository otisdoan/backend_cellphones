const express = require("express");
const {
  getAllImageController,
  createImageController,
  deleteImageController,
  updateImageController,
} = require("../controllers/product_image.controller");
const routes = express.Router();

routes.get("/", getAllImageController);
routes.post("/", createImageController);
routes.delete("/:id", deleteImageController);
routes.patch("/:id", updateImageController);

module.exports = routes;
