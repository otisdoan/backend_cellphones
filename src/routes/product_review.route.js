const express = require("express");
const {
  getAllProductReviewController,
  getProductReviewByIdController,
  createProductReviewController,
  updateProductReviewController,
  deleteProductReviewController,
} = require("../controllers/product_review.controller");
const router = express.Router();

router.get("/", getAllProductReviewController);
router.get("/:id", getProductReviewByIdController);
router.post("/", createProductReviewController);
router.patch("/:id", updateProductReviewController);
router.delete("/:id", deleteProductReviewController);

module.exports = router;
