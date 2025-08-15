const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
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

const getBrandByCategory = async (idCategory) => {
  const result = sequelize.query(
    `
      SELECT DISTINCT b.name, b.logo_url
      FROM products p
      JOIN brands b ON b.id = p.brand_id
      JOIN categories c ON c.id = p.category_id
      WHERE c.id = :idCategory
    `,
    {
      type: QueryTypes.SELECT,
      replacements: { idCategory },
    }
  );
  return result;
};

const getBrandByIdRepository = async (id) => {
  const [result] = await Brand.findAll({ where: { id } });
  return result;
};

module.exports = {
  createBrandRepository,
  checkBrandExist,
  checkSlugExist,
  getAllBrandRepository,
  deleteBrandRepository,
  updateBrandRepository,
  getAllNameBrandRepository,
  getBrandByCategory,
  getBrandByIdRepository,
};
