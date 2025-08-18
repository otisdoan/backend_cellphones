const express = require("express");
const {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");
const { role } = require("../middlewares/verify.middleware");
const { reuqireToken } = require("../middlewares/token.middleware");

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id/detail", reuqireToken, role(["admin"]), getUserByIdController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUserController);

module.exports = router;
