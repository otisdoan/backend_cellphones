const express = require("express");
const { addCategory } = require("../controllers/category.controller");
const routes = express.Router();

routes.post("/", addCategory);

module.exports = routes;
