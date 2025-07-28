const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEy,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
