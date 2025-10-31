const express = require("express");
const {
  getAllNotificationsController,
  getNotificationByIdController,
  createNotificationController,
  markAsReadController,
  markAllAsReadController,
  getUnreadCountController,
  deleteNotificationController,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/user/:userId", getAllNotificationsController);
router.get("/user/:userId/unread-count", getUnreadCountController);
router.get("/:id", getNotificationByIdController);
router.post("/", createNotificationController);
router.patch("/:id/read", markAsReadController);
router.patch("/user/:userId/read-all", markAllAsReadController);
router.delete("/:id", deleteNotificationController);

module.exports = router;
