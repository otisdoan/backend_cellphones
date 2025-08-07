const express = require("express");
const routes = express.Router();
const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");
const brandRoute = require("./brand.route");
const productRoute = require("./product.route");
const uploadRoute = require("./upload.route");
const product_imageRoute = require("./product_image.route");
const menuRoute = require("./menu.route");
const product_variantRoute = require("./product_variant.route");

routes.use("/auth", authRoute);
routes.use("/category", categoryRoute);
routes.use("/brand", brandRoute);
routes.use("/products", productRoute);
routes.use("/upload", uploadRoute);
routes.use("/product-images", product_imageRoute);
routes.use("/menu", menuRoute);
routes.use("/product-variant", product_variantRoute);

module.exports = routes;
