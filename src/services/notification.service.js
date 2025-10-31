const notificationRepository = require("../repositories/notification.repository");

const getAllNotificationsService = async (userId, type) => {
  return await notificationRepository.findAll(userId, type);
};

const getNotificationByIdService = async (id) => {
  return await notificationRepository.findById(id);
};

const createNotificationService = async (data) => {
  return await notificationRepository.create(data);
};

const markAsReadService = async (id) => {
  return await notificationRepository.markAsRead(id);
};

const markAllAsReadService = async (userId) => {
  return await notificationRepository.markAllAsRead(userId);
};

const getUnreadCountService = async (userId) => {
  return await notificationRepository.getUnreadCount(userId);
};

const deleteNotificationService = async (id) => {
  return await notificationRepository.delete(id);
};

module.exports = {
  getAllNotificationsService,
  getNotificationByIdService,
  createNotificationService,
  markAsReadService,
  markAllAsReadService,
  getUnreadCountService,
  deleteNotificationService,
};
