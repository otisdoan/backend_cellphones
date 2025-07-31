const sequelize = require("../configs/database.config");
const Category = require("../models/category.model");

const checkCategoryExist = async (name) => {
  return await Category.findOne({ where: { name } });
};

const checkSlugExist = async (slug) => {
  return await Category.findOne({ where: { slug } });
};

const addCategory = async (category) => {
  return await Category.create(category);
};

const getAllCategoryRepository = async () => {
  return await Category.findAll({ raw: true });
};

const deleteCategoryRepository = async (id) => {
  return await Category.destroy({ where: { id } });
};

const getAllNameCategoryRepository = async () => {
  const [result] = await sequelize.query(
    "SELECT id, name, parent_id FROM categories"
  );
  return result;
  // return await Category.findAll({
  //   attributes: ["name"],
  //   raw: true,
  // });
};

const updateCategoryRepository = async (id, payload) => {
  // const [count, row] = await Category.update(payload, {
  //   where: { id },
  //   returning: true,
  // });
  // if (count === 0) return null;
  // return row[0];
  const category = await Category.findByPk(id);
  if (!category) return null;
  Object.assign(category, payload);
  await category.save();
  return category;
};

module.exports = {
  checkCategoryExist,
  checkSlugExist,
  addCategory,
  getAllCategoryRepository,
  deleteCategoryRepository,
  updateCategoryRepository,
  getAllNameCategoryRepository,
};
