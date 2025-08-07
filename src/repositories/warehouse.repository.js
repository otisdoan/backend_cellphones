const Warehouse = require("../models/warehouse.model");

const checkWarehouseExist = async (code) => {
  return await Warehouse.findOne({ where: { code } });
};

const findAllWarehouseRepository = async () => {
  return await Warehouse.findAll();
};

const findWarehouseByIdRepository = async (id) => {
  return await Warehouse.findByPk(id);
};

const createWarehouseRepository = async (payload) => {
  return await Warehouse.create(payload);
};

const updateWarehouseRepository = async (id, payload) => {
  const warehouse = await Warehouse.findByPk(id);
  if (!warehouse) return null;
  Object.assign(warehouse, payload);
  await warehouse.save();
  return warehouse;
};

const deleteWarehouseRepository = async (id) => {
  return await Warehouse.destroy({ where: { id } });
};

module.exports = {
  checkWarehouseExist,
  findAllWarehouseRepository,
  findWarehouseByIdRepository,
  createWarehouseRepository,
  updateWarehouseRepository,
  deleteWarehouseRepository,
};
