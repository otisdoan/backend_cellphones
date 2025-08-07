const {
  getAllUserAddressService,
  getUserAddressByIdService,
  createUserAddressService,
  updateUserAddressService,
  deleteUserAddressService,
} = require("../services/user_address.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllUserAddressController = async (req, res) => {
  try {
    const allAddresses = await getAllUserAddressService();
    successResponse(
      res,
      "Get all user addresses successfully!",
      allAddresses,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getUserAddressByIdController = async (req, res) => {
  try {
    const address = await getUserAddressByIdService(req.params.id);
    if (!address) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Get user address by id successfully!", address, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createUserAddressController = async (req, res) => {
  try {
    const address = await createUserAddressService(req.body);
    successResponse(res, "Create user address successfully!", address, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateUserAddressController = async (req, res) => {
  try {
    const address = await updateUserAddressService(req.params.id, req.body);
    if (!address) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update user address successfully!", address, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUserAddressController = async (req, res) => {
  try {
    await deleteUserAddressService(req.params.id);
    successResponse(res, "Delete user address successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllUserAddressController,
  getUserAddressByIdController,
  createUserAddressController,
  updateUserAddressController,
  deleteUserAddressController,
};
