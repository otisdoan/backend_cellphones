const express = require("express");
const {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/", getAllOrdersController);
router.get("/:id", getOrderByIdController);
router.post("/", createOrderController);
router.patch("/:id", updateOrderController);
router.delete("/:id", deleteOrderController);

module.exports = router;
