const express = require("express");
const {
  getAllOrderItemsController,
  getOrderItemByIdController,
  createOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
} = require("../controllers/order_item.controller");

const router = express.Router();

router.get("/", getAllOrderItemsController);
router.get("/:id", getOrderItemByIdController);
router.post("/", createOrderItemController);
router.patch("/:id", updateOrderItemController);
router.delete("/:id", deleteOrderItemController);

module.exports = router;
