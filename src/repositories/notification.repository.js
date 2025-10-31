const Notification = require("../models/notification.model");

class NotificationRepository {
  async findAll(userId, type = null) {
    const where = { user_id: userId };
    if (type) where.type = type;

    return await Notification.findAll({
      where,
      order: [["created_at", "DESC"]],
      limit: 50,
    });
  }

  async findById(id) {
    return await Notification.findByPk(id);
  }

  async create(data) {
    return await Notification.create(data);
  }

  async update(id, data) {
    const notification = await Notification.findByPk(id);
    if (!notification) return null;
    return await notification.update(data);
  }

  async markAsRead(id) {
    return await this.update(id, { is_read: true });
  }

  async markAllAsRead(userId) {
    return await Notification.update(
      { is_read: true },
      { where: { user_id: userId, is_read: false } }
    );
  }

  async getUnreadCount(userId) {
    return await Notification.count({
      where: { user_id: userId, is_read: false },
    });
  }

  async delete(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) return null;
    await notification.destroy();
    return notification;
  }
}

module.exports = new NotificationRepository();
