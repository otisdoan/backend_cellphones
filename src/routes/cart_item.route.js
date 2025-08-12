const express = require("express");
const {
  getAllCartItemsController,
  getCartItemByIdController,
  createCartItemController,
  updateCartItemController,
  deleteCartItemController,
} = require("../controllers/cart_item.controller");

const router = express.Router();

router.get("/", getAllCartItemsController);
router.get("/:id", getCartItemByIdController);
router.post("/", createCartItemController);
router.patch("/:id", updateCartItemController);
router.delete("/:id", deleteCartItemController);

module.exports = router;
