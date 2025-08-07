const {
  findAllCouponsRepository,
  findCouponByIdRepository,
  createCouponRepository,
  updateCouponRepository,
  deleteCouponRepository,
} = require("../repositories/coupons.repository");

const getAllCouponsService = async () => {
  return await findAllCouponsRepository();
};

const getCouponByIdService = async (id) => {
  return await findCouponByIdRepository(id);
};

const createCouponService = async (payload) => {
  return await createCouponRepository(payload);
};

const updateCouponService = async (id, payload) => {
  return await updateCouponRepository(id, payload);
};

const deleteCouponService = async (id) => {
  return await deleteCouponRepository(id);
};

module.exports = {
  getAllCouponsService,
  getCouponByIdService,
  createCouponService,
  updateCouponService,
  deleteCouponService,
};
