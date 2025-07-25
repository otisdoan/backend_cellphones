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

module.exports = {
  checkCategoryExist,
  checkSlugExist,
  addCategory,
};
