const express = require("express");
const multer = require("multer");
const cloudinary = require("../configs/cloudinary.config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { uploadController } = require("../controllers/upload.controller");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cellphones",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "*"],
  },
});

const upload = multer({ storage });

const routers = express.Router();

routers.post("/", upload.single("file"), uploadController);

module.exports = routers;
