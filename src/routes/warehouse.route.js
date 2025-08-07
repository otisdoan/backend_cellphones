const express = require("express");
const {
  getAllWarehouseController,
  getWarehouseByIdController,
  createWarehouseController,
  updateWarehouseController,
  deleteWarehouseController,
} = require("../controllers/warehouse.controller");
const router = express.Router();

router.get("/", getAllWarehouseController);
router.get("/:id", getWarehouseByIdController);
router.post("/", createWarehouseController);
router.patch("/:id", updateWarehouseController);
router.delete("/:id", deleteWarehouseController);

module.exports = router;
