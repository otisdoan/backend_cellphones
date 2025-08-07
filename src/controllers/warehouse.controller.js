const {
  getAllWarehouseService,
  getWarehouseByIdService,
  createWarehouseService,
  updateWarehouseService,
  deleteWarehouseService,
} = require("../services/warehouse.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllWarehouseController = async (req, res) => {
  try {
    const allWarehouses = await getAllWarehouseService();
    successResponse(
      res,
      "Get all warehouses successfully!",
      allWarehouses,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const getWarehouseByIdController = async (req, res) => {
  try {
    const warehouse = await getWarehouseByIdService(req.params.id);
    if (!warehouse) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Get warehouse by id successfully!", warehouse, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const createWarehouseController = async (req, res) => {
  try {
    const warehouse = await createWarehouseService(req.body);
    successResponse(res, "Create warehouse successfully!", warehouse, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateWarehouseController = async (req, res) => {
  try {
    const warehouse = await updateWarehouseService(req.params.id, req.body);
    if (!warehouse) return errorResponse(res, { message: "Not found" }, 404);
    successResponse(res, "Update warehouse successfully!", warehouse, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteWarehouseController = async (req, res) => {
  try {
    await deleteWarehouseService(req.params.id);
    successResponse(res, "Delete warehouse successfully!", "", 200);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllWarehouseController,
  getWarehouseByIdController,
  createWarehouseController,
  updateWarehouseController,
  deleteWarehouseController,
};
