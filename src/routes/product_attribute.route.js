const express = require("express");
const {
  getAllProductAttributeController,
  getProductAttributeByIdController,
  createProductAttributeController,
  updateProductAttributeController,
  deleteProductAttributeController,
  getProductAttributeByIdProductController,
} = require("../controllers/product_attribute.controller");
const router = express.Router();

router.get("/", getAllProductAttributeController);
router.get("/:id/detail", getProductAttributeByIdController);
router.get("/:id", getProductAttributeByIdProductController);
router.post("/", createProductAttributeController);
router.patch("/:id", updateProductAttributeController);
router.delete("/:id", deleteProductAttributeController);

module.exports = router;
