const Coupons = require("../models/coupons.model");

const checkCouponExist = async (code) => {
  return await Coupons.findOne({ where: { code } });
};

const findAllCouponsRepository = async () => {
  return await Coupons.findAll();
};

const findCouponByIdRepository = async (id) => {
  return await Coupons.findByPk(id);
};

const createCouponRepository = async (payload) => {
  return await Coupons.create(payload);
};

const updateCouponRepository = async (id, payload) => {
  const coupon = await Coupons.findByPk(id);
  if (!coupon) return null;
  Object.assign(coupon, payload);
  await coupon.save();
  return coupon;
};

const deleteCouponRepository = async (id) => {
  return await Coupons.destroy({ where: { id } });
};

module.exports = {
  checkCouponExist,
  findAllCouponsRepository,
  findCouponByIdRepository,
  createCouponRepository,
  updateCouponRepository,
  deleteCouponRepository,
};
