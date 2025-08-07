const {
  findAllInventorRepository,
  findInventorByIdRepository,
  createInventorRepository,
  updateInventorRepository,
  deleteInventorRepository,
} = require("../repositories/inventor.repository");

const getAllInventorService = async () => {
  return await findAllInventorRepository();
};

const getInventorByIdService = async (id) => {
  return await findInventorByIdRepository(id);
};

const createInventorService = async (payload) => {
  return await createInventorRepository(payload);
};

const updateInventorService = async (id, payload) => {
  return await updateInventorRepository(id, payload);
};

const deleteInventorService = async (id) => {
  return await deleteInventorRepository(id);
};

module.exports = {
  getAllInventorService,
  getInventorByIdService,
  createInventorService,
  updateInventorService,
  deleteInventorService,
};
