const {
  checkCategoryExist,
  checkSlugExist,
  addCategory,
  getAllCategoryRepository,
  deleteCategoryRepository,
  updateCategoryRepository,
} = require("../repositories/category.repository");

const createCategory = async (payload) => {
  const { name, slug } = payload;
  const nameCategory = await checkCategoryExist(name);
  if (nameCategory) throw new Error("Category is already existed!");

  const slugCategory = await checkSlugExist(slug);
  if (slugCategory) throw new Error("Slug is already existed!");

  return await addCategory(payload);
};

const getAllCategoryService = async () => {
  return await getAllCategoryRepository();
};

const deleteCategoryService = async (id) => {
  return await deleteCategoryRepository(id);
};

const updateCategoryService = async (id, payload) => {
  const { name } = payload;

  const nameCategory = await checkCategoryExist(name);
  if (nameCategory) throw new Error("Category is already existed!");

  return await updateCategoryRepository(id, payload);
};

module.exports = {
  createCategory,
  getAllCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
