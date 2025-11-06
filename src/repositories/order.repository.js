const Order = require("../models/order.model");
const OrderItem = require("../models/order_item.model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const findAllOrderRepository = async () => {
  // Get all orders with items using raw SQL
  const orders = await sequelize.query(
    `
    SELECT 
      o.*,
      json_agg(
        json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'product_name', oi.product_name,
          'variant_name', oi.variant_name,
          'sku', oi.sku,
          'price', oi.price,
          'sale_price', oi.sale_price,
          'quantity', oi.quantity,
          'total', oi.total,
          'image_url', oi.image_url
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  return orders;
};

const findOrdersByUserIdRepository = async (userId) => {
  // Get orders with items using raw SQL for better performance
  const orders = await sequelize.query(
    `
    SELECT 
      o.*,
      json_agg(
        json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'product_name', oi.product_name,
          'variant_name', oi.variant_name,
          'sku', oi.sku,
          'price', oi.price,
          'sale_price', oi.sale_price,
          'quantity', oi.quantity,
          'total', oi.total,
          'image_url', oi.image_url
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = :userId
    GROUP BY o.id
    ORDER BY o.created_at DESC
    `,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );

  return orders;
};

const findOrderByIdRepository = async (id) => {
  const [order] = await sequelize.query(
    `
    SELECT 
      o.*,
      json_agg(
        json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'product_name', oi.product_name,
          'variant_name', oi.variant_name,
          'sku', oi.sku,
          'price', oi.price,
          'sale_price', oi.sale_price,
          'quantity', oi.quantity,
          'total', oi.total,
          'image_url', oi.image_url
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.id = :id
    GROUP BY o.id
    `,
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    }
  );

  return order;
};

const createOrderRepository = async (payload) => {
  return await Order.create(payload);
};

const createOrderWithItemsRepository = async (orderData, items) => {
  const transaction = await sequelize.transaction();

  try {
    // Create order
    const order = await Order.create(orderData, { transaction });

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id || null,
      product_name: item.product_name,
      variant_name: item.variant_name || null,
      sku: item.sku,
      price: item.price,
      sale_price: item.sale_price,
      quantity: item.quantity,
      total: item.sale_price * item.quantity,
      image_url: item.image_url || null,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });

    await transaction.commit();

    // Return order with items
    return await findOrderByIdRepository(order.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateOrderRepository = async (id, payload) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  Object.assign(order, payload);
  await order.save();
  return order;
};

const deleteOrderRepository = async (id) => {
  return await Order.destroy({ where: { id } });
};

module.exports = {
  findAllOrderRepository,
  findOrdersByUserIdRepository,
  findOrderByIdRepository,
  createOrderRepository,
  createOrderWithItemsRepository,
  updateOrderRepository,
  deleteOrderRepository,
};
