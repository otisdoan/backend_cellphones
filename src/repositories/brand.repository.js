const Brand = require("../models/brand.model");

const createBrandRepository = async (payload) => {
  return await Brand.create(payload);
};

const checkBrandExist = async (name) => {
  return await Brand.findOne({ where: { name } });
};

const checkSlugExist = async (slug) => {
  return await Brand.findOne({ where: { slug } });
};

const getAllBrandRepository = async () => {
  return await Brand.findAll();
};

const deleteBrandRepository = async (id) => {
  return await Brand.destroy({ where: { id } });
};

const getAllNameBrandRepository = async () => {
  return await Brand.findAll({
    attributes: ["id", "name"],
    raw: true,
  });
};

const updateBrandRepository = async (id, payload) => {
  const brand = await Brand.findByPk(id);
  Object.assign(brand, payload);
  await brand.save();
  return brand;
};

module.exports = {
  createBrandRepository,
  checkBrandExist,
  checkSlugExist,
  getAllBrandRepository,
  deleteBrandRepository,
  updateBrandRepository,
  getAllNameBrandRepository,
};
