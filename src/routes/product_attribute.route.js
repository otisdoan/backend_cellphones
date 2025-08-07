const express = require("express");
const {
  getAllProductAttributeController,
  getProductAttributeByIdController,
  createProductAttributeController,
  updateProductAttributeController,
  deleteProductAttributeController,
} = require("../controllers/product_attribute.controller");
const router = express.Router();

router.get("/", getAllProductAttributeController);
router.get("/:id", getProductAttributeByIdController);
router.post("/", createProductAttributeController);
router.patch("/:id", updateProductAttributeController);
router.delete("/:id", deleteProductAttributeController);

module.exports = router;
