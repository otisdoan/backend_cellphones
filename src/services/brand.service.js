const {
  checkBrandExist,
  checkSlugExist,
  createBrandRepository,
  getAllBrandRepository,
  deleteBrandRepository,
  updateBrandRepository,
  getAllNameBrandRepository,
} = require("../repositories/brand.repository");

const createBrandService = async (payload) => {
  const { name, slug } = payload;

  const nameBrand = await checkBrandExist(name);
  if (nameBrand) throw new Error("Brand is already exist!");

  const slugBrand = await checkSlugExist(slug);
  if (slugBrand) throw new Error("Slug is already exist!");

  return await createBrandRepository(payload);
};

const getAllBrandService = async () => {
  return await getAllBrandRepository();
};

const deleteBrandService = async (id) => {
  return await deleteBrandRepository(id);
};

const updateBrandService = async (id, payload) => {
  const { name, slug } = payload;
  const nameBrand = await checkBrandExist(name);
  if (nameBrand) throw new Error("Brand is already exist!");

  const slugBrand = await checkSlugExist(slug);
  if (slugBrand) throw new Error("Slug is already exist!");
  return await updateBrandRepository(id, payload);
};

const getAllNameBrandService = async () => {
  const result = await getAllNameBrandRepository();
  const customResult = result.map((item) => {
    return {
      value: Number(item.id),
      label: item.name,
    };
  });
  return customResult;
};

module.exports = {
  createBrandService,
  getAllBrandService,
  deleteBrandService,
  updateBrandService,
  getAllNameBrandService,
};
