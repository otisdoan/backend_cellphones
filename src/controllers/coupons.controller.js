const {
  getAllCouponsService,
  getCouponByIdService,
  createCouponService,
  updateCouponService,
  deleteCouponService,
} = require("../services/coupons.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllCouponsController = async (req, res) => {
  try {
    const allCoupons = await getAllCouponsService();
    successResponse(res, "Get all coupons successfully!", allCoupons, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getCouponByIdController = async (req, res) => {
  try {
    const coupon = await getCouponByIdService(req.params.id);
    if (!coupon) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Get coupon by id successfully!", coupon, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createCouponController = async (req, res) => {
  try {
    const coupon = await createCouponService(req.body);
    successResponse(res, "Create coupon successfully!", coupon, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateCouponController = async (req, res) => {
  try {
    const coupon = await updateCouponService(req.params.id, req.body);
    if (!coupon) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update coupon successfully!", coupon, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteCouponController = async (req, res) => {
  try {
    await deleteCouponService(req.params.id);
    successResponse(res, "Delete coupon successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllCouponsController,
  getCouponByIdController,
  createCouponController,
  updateCouponController,
  deleteCouponController,
};
