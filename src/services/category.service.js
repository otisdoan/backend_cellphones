const { getBrandByCategory } = require("../repositories/brand.repository");
const {
  checkCategoryExist,
  checkSlugExist,
  addCategory,
  getAllCategoryRepository,
  deleteCategoryRepository,
  updateCategoryRepository,
  getAllNameCategoryRepository,
} = require("../repositories/category.repository");
const { getProductFeatured } = require("../repositories/product.repository");
const recursionCategory = require("../utils/recursionCategory");

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

const getAllNameCategoryService = async () => {
  const result = await getAllNameCategoryRepository();
  return recursionCategory(result);
};

const categoryMobileService = async () => {
  const result = [];
  const brand = await getBrandByCategory(9);
  result.push({ title: "Hãng điện thoại", brand });
  result.push({
    title: "Phân khúc giá",
    price: [
      { content: "Dưới 2 triệu" },
      { content: "Từ 2 - 4 triệu" },
      { content: "Từ 4 - 7 triệu" },
      { content: "Từ 7 - 13 triệu" },
      { content: "Từ 13 - 20 triệu" },
      { content: "Trên 20 triệu" },
    ],
  });
  const products = await getProductFeatured(9);
  result.push({ title: "Điện thoại HOT ⚡", products });
  return result;
};

const categoryTabletMobileService = async () => {
  const result = [];
  const brand = await getBrandByCategory(10);
  result.push({ title: "Hãng máy tính bảng", brand });
  const products = await getProductFeatured(10);
  result.push({ title: "Máy tính bảng HOT ⚡", products });
  return result;
};

module.exports = {
  createCategory,
  getAllCategoryService,
  deleteCategoryService,
  updateCategoryService,
  getAllNameCategoryService,
  categoryMobileService,
  categoryTabletMobileService,
};
