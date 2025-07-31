const {
  getAllImageRepository,
  createImageRepository,
  deleteImageRepository,
  updateImageRepository,
} = require("../repositories/product_image.repository");

const getAllImageService = async () => {
  return await getAllImageRepository();
};

const createImageService = async (payload) => {
  return await createImageRepository(payload);
};

const deleteImageService = async (id) => {
  return await deleteImageRepository(id);
};

const updateImageService = async (id, payload) => {
  return await updateImageRepository(id, payload);
};

module.exports = {
  getAllImageService,
  createImageService,
  deleteImageService,
  updateImageService,
};
