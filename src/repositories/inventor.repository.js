const Inventor = require("../models/inventor.model");

const checkInventorExist = async (warehouse_id, product_id, variant_id) => {
  return await Inventor.findOne({ where: { warehouse_id, product_id, variant_id } });
};

const findAllInventorRepository = async () => {
  return await Inventor.findAll();
};

const findInventorByIdRepository = async (id) => {
  return await Inventor.findByPk(id);
};

const createInventorRepository = async (payload) => {
  return await Inventor.create(payload);
};

const updateInventorRepository = async (id, payload) => {
  const inventor = await Inventor.findByPk(id);
  if (!inventor) return null;
  Object.assign(inventor, payload);
  await inventor.save();
  return inventor;
};

const deleteInventorRepository = async (id) => {
  return await Inventor.destroy({ where: { id } });
};

module.exports = {
  checkInventorExist,
  findAllInventorRepository,
  findInventorByIdRepository,
  createInventorRepository,
  updateInventorRepository,
  deleteInventorRepository,
};
