const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const ProductImage = require("../models/product_image.model");

const getAllImageRepository = async () => {
  const result = await sequelize.query(
    `
      SELECT pi.*, p.name
      FROM products p
      JOIN product_images pi ON pi.product_id = p.id
    `,
    {
      type: QueryTypes.SELECT,
    }
  );
  return result;
};

const createImageRepository = async (payload) => {
  return await ProductImage.create(payload);
};

const deleteImageRepository = async (id) => {
  return await ProductImage.destroy({ where: { id } });
};

const updateImageRepository = async (id, payload) => {
  return await ProductImage.update(payload, { where: { id } });
};

module.exports = {
  getAllImageRepository,
  createImageRepository,
  deleteImageRepository,
  updateImageRepository,
};
