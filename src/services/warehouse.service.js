const {
  findAllWarehouseRepository,
  findWarehouseByIdRepository,
  createWarehouseRepository,
  updateWarehouseRepository,
  deleteWarehouseRepository,
} = require("../repositories/warehouse.repository");

const getAllWarehouseService = async () => {
  return await findAllWarehouseRepository();
};

const getWarehouseByIdService = async (id) => {
  return await findWarehouseByIdRepository(id);
};

const createWarehouseService = async (payload) => {
  return await createWarehouseRepository(payload);
};

const updateWarehouseService = async (id, payload) => {
  return await updateWarehouseRepository(id, payload);
};

const deleteWarehouseService = async (id) => {
  return await deleteWarehouseRepository(id);
};

module.exports = {
  getAllWarehouseService,
  getWarehouseByIdService,
  createWarehouseService,
  updateWarehouseService,
  deleteWarehouseService,
};
