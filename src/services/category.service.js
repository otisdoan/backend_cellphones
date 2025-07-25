const {
  checkCategoryExist,
  checkSlugExist,
  addCategory,
} = require("../repositories/category.repository");

const createCategory = async (payload) => {
  const { name, slug } = payload;
  const nameCategory = await checkCategoryExist(name);
  if (nameCategory) throw new Error("Category is already existed!");

  const slugCategory = await checkSlugExist(slug);
  if (slugCategory) throw new Error("Slug is already existed!");

  return await addCategory(payload);
};

module.exports = {
  createCategory,
};
