const {
  getAllNotificationsService,
  getNotificationByIdService,
  createNotificationService,
  markAsReadService,
  markAllAsReadService,
  getUnreadCountService,
  deleteNotificationService,
} = require("../services/notification.service");
const { successResponse, errorResponse } = require("../utils/response.util");

const getAllNotificationsController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    const data = await getAllNotificationsService(userId, type);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getNotificationByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getNotificationByIdService(id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createNotificationController = async (req, res) => {
  try {
    const data = await createNotificationService(req.body);
    successResponse(res, "Create notification successfully!", data, 201);
  } catch (error) {
    errorResponse(res, error);
  }
};

const markAsReadController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await markAsReadService(id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Marked as read", data });
  } catch (error) {
    next(error);
  }
};

const markAllAsReadController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await markAllAsReadService(userId);
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

const getUnreadCountController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const count = await getUnreadCountService(userId);
    res.json({ success: true, data: { count } });
  } catch (error) {
    next(error);
  }
};

const deleteNotificationController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteNotificationService(id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotificationsController,
  getNotificationByIdController,
  createNotificationController,
  markAsReadController,
  markAllAsReadController,
  getUnreadCountController,
  deleteNotificationController,
};
