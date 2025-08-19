const {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllUsersController = async (req, res, next) => {
  try {
    const data = await getAllUsersService();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { id_params } = req.params;
    const { id } = req.user_infor;
    const data = await getUserByIdService(id_params ?? id);
    successResponse(res, "Get user by id successfully!", data, 200);
    res.json({ success: true, data });
  } catch (error) {
    errorResponse(res, error);
  }
};

const createUserController = async (req, res) => {
  try {
    const data = await createUserService(req.body);
    successResponse(res, "Create user sucessfully!", data, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateUserService(id, req.body);
    successResponse(res, "Update user successfully!", data, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUserService(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
