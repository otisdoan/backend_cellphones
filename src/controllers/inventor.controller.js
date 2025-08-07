const {
  getAllInventorService,
  getInventorByIdService,
  createInventorService,
  updateInventorService,
  deleteInventorService,
} = require("../services/inventor.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllInventorController = async (req, res) => {
  try {
    const allInventors = await getAllInventorService();
    successResponse(res, "Get all inventors successfully!", allInventors, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getInventorByIdController = async (req, res) => {
  try {
    const inventor = await getInventorByIdService(req.params.id);
    if (!inventor) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Get inventor by id successfully!", inventor, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createInventorController = async (req, res) => {
  try {
    const inventor = await createInventorService(req.body);
    successResponse(res, "Create inventor successfully!", inventor, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateInventorController = async (req, res) => {
  try {
    const inventor = await updateInventorService(req.params.id, req.body);
    if (!inventor) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update inventor successfully!", inventor, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteInventorController = async (req, res) => {
  try {
    await deleteInventorService(req.params.id);
    successResponse(res, "Delete inventor successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllInventorController,
  getInventorByIdController,
  createInventorController,
  updateInventorController,
  deleteInventorController,
};
