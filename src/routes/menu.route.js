const express = require("express");
const {
  menuSmartPhoneController,
  menuLaptopController,
} = require("../controllers/menu.controller");
const routes = express.Router();

routes.get("/", menuSmartPhoneController);
routes.get("/laptop", menuLaptopController);

module.exports = routes;
