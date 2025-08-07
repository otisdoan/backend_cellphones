const express = require("express");
const {
  getAllCouponsController,
  getCouponByIdController,
  createCouponController,
  updateCouponController,
  deleteCouponController,
} = require("../controllers/coupons.controller");
const router = express.Router();

router.get("/", getAllCouponsController);
router.get("/:id", getCouponByIdController);
router.post("/", createCouponController);
router.patch("/:id", updateCouponController);
router.delete("/:id", deleteCouponController);

module.exports = router;
