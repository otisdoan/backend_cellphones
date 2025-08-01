const express = require("express");
const { menuSmartPhoneController } = require("../controllers/menu.controller");
const routes = express.Router();

routes.get("/", menuSmartPhoneController);
module.exports = routes;
