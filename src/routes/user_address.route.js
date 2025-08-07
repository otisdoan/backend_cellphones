const express = require("express");
const {
  getAllUserAddressController,
  getUserAddressByIdController,
  createUserAddressController,
  updateUserAddressController,
  deleteUserAddressController,
} = require("../controllers/user_address.controller");
const router = express.Router();

router.get("/", getAllUserAddressController);
router.get("/:id", getUserAddressByIdController);
router.post("/", createUserAddressController);
router.patch("/:id", updateUserAddressController);
router.delete("/:id", deleteUserAddressController);

module.exports = router;
