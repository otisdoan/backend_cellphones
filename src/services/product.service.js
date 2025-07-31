const {
  checkNameExist,
  checkSlugExist,
  createProductRepository,
  getAllProductReposiroty,
  deleteProductRepository,
  updateProductRepository,
  getAllNameProductRepository,
} = require("../repositories/product.repository");

const createProductService = async (payload) => {
  const { name, slug, sku } = payload;

  const nameProduct = await checkNameExist(name);
  if (nameProduct) throw new Error("Product is already exist!");

  const slugProduct = await checkSlugExist(slug);
  if (slugProduct) throw new Error("Slug is already exist!");

  const skuBrand = await checkSlugExist(sku);
  if (skuBrand) throw new Error("Sku is already exist!");

  return await createProductRepository(payload);
};

const getAllProductService = async () => {
  return await getAllProductReposiroty();
};

const deleteProductService = async (id) => {
  return await deleteProductRepository(id);
};

const updateProductService = async (id, payload) => {
  const { name, slug, sku } = payload;

  const nameProduct = await checkNameExist(name);
  if (nameProduct) throw new Error("Product is already exist!");

  const slugProduct = await checkSlugExist(slug);
  if (slugProduct) throw new Error("Slug is already exist!");

  const skuBrand = await checkSlugExist(sku);
  if (skuBrand) throw new Error("Sku is already exist!");

  return await updateProductRepository(id, payload);
};

const getAllNameProductService = async () => {
  const result = await getAllNameProductRepository();
  const customResult = result.map((item) => {
    return {
      value: Number(item.id),
      label: item.name,
    };
  });
  return customResult;
};

module.exports = {
  createProductService,
  getAllProductService,
  deleteProductService,
  updateProductService,
  getAllNameProductService,
};
