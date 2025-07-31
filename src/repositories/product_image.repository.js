const ProductImage = require("../models/product_image.model");

const getAllImageRepository = async () => {
  return await ProductImage.findAll({ raw: true });
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
