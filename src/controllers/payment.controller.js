const payos = require("../configs/payos.config");

const createPayment = async (req, res) => {
  const paymentData = {
    orderCode: Date.now(),
    amount: 2000,
    description: "Thanh toán đơn hàng",
    returnUrl: "http://localhost:3000/success",
    cancelUrl: "http://localhost:3000/cancel",
  };
  try {
    const paymentLink = await payos.paymentRequests.create(paymentData);
    res.json({
      qrCode: paymentLink.qrCode,
      checkoutUrl: paymentLink.checkoutUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
};
