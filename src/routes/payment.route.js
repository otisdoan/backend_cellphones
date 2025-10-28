const express = require("express");
const {
  createPayment,
  verifyPayment,
} = require("../controllers/payment.controller");
const router = express.Router();

router.post("/checkout", createPayment);
router.post("/webhook", verifyPayment);

module.exports = router;
