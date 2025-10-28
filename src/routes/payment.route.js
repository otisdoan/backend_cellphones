const express = require("express");
const { createPayment } = require("../controllers/payment.controller");
const router = express.Router();

router.post("/checkout", createPayment);

module.exports = router;
