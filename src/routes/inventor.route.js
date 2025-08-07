const express = require("express");
const {
  getAllInventorController,
  getInventorByIdController,
  createInventorController,
  updateInventorController,
  deleteInventorController,
} = require("../controllers/inventor.controller");
const router = express.Router();

router.get("/", getAllInventorController);
router.get("/:id", getInventorByIdController);
router.post("/", createInventorController);
router.patch("/:id", updateInventorController);
router.delete("/:id", deleteInventorController);

module.exports = router;
