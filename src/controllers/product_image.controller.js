const {
  getAllImageService,
  createImageService,
  deleteImageService,
  updateImageService,
} = require("../services/product_image.service");
const { errorResponse, successResponse } = require("../utils/response.util");

const getAllImageController = async (req, res) => {
  try {
    const allImage = await getAllImageService();
    successResponse(res, "Get all image successfully!", allImage, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};
const createImageController = async (req, res) => {
  try {
    const image = await createImageService(req.body);
    successResponse(res, "Create image product successfully!", image, 200);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteImageController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await deleteImageService(id);
    successResponse(
      res,
      "Delete image product successfully!",
      deletedImage,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateImageController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedImage = await updateImageService(id, req.body);
    successResponse(
      res,
      "Update image product successfully!",
      updatedImage,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  getAllImageController,
  createImageController,
  deleteImageController,
  updateImageController,
};
