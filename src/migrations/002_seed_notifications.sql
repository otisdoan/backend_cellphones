-- Seed data for notifications table
-- This creates sample notifications for testing

-- Insert sample order notifications
INSERT INTO `notifications` 
  (`user_id`, `type`, `title`, `message`, `order_id`, `order_number`, `is_read`, `icon_type`, `metadata`, `created_at`) 
VALUES
  -- Order notification 1 (unread)
  (1, 'order', 'Đơn hàng đã được xác nhận', 'Đơn hàng #ORD123456 đã được xác nhận và đang được chuẩn bị', 1, 'ORD123456', FALSE, 'cart', 
   JSON_OBJECT('status', 'confirmed', 'amount', 12990000, 'product_name', 'iPhone 15 Pro Max 256GB'),
   DATE_SUB(NOW(), INTERVAL 2 HOUR)),

  -- Order notification 2 (unread)
  (1, 'order', 'Đơn hàng đang được giao', 'Đơn hàng #ORD123457 đang trên đường giao đến bạn', 2, 'ORD123457', FALSE, 'bag',
   JSON_OBJECT('status', 'delivering', 'amount', 8900000, 'product_name', 'Samsung Galaxy S24 Ultra'),
   DATE_SUB(NOW(), INTERVAL 5 HOUR)),

  -- Order notification 3 (read)
  (1, 'order', 'Đơn hàng đã giao thành công', 'Đơn hàng #ORD123455 đã được giao thành công. Cảm ơn bạn đã mua hàng!', 3, 'ORD123455', TRUE, 'cart',
   JSON_OBJECT('status', 'completed', 'amount', 3900000, 'product_name', 'AirPods Pro 2'),
   DATE_SUB(NOW(), INTERVAL 1 DAY)),

  -- Promotion notification (unread)
  (1, 'promotion', 'Giảm giá đặc biệt cuối năm', 'Giảm ngay 10% cho đơn hàng từ 5 triệu đồng. Mã: SALE10', NULL, NULL, FALSE, 'gift',
   JSON_OBJECT('discount_percent', 10, 'min_amount', 5000000, 'code', 'SALE10', 'expires_at', '2024-12-31'),
   DATE_SUB(NOW(), INTERVAL 3 HOUR)),

  -- Smember notification (unread)
  (1, 'smember', 'Chúc mừng bạn đã trở thành Smember', 'Chào mừng bạn gia nhập chương trình Smember. Tận hưởng nhiều ưu đãi độc quyền!', NULL, NULL, FALSE, 'bell',
   JSON_OBJECT('membership_level', 'silver', 'points', 0, 'benefits', JSON_ARRAY('Giảm 5% mọi đơn hàng', 'Miễn phí vận chuyển', 'Ưu tiên hỗ trợ')),
   DATE_SUB(NOW(), INTERVAL 6 HOUR)),

  -- System notification (read)
  (1, 'system', 'Cập nhật chính sách bảo hành', 'Chính sách bảo hành mới đã được cập nhật. Vui lòng xem chi tiết tại mục Điều khoản.', NULL, NULL, TRUE, 'bell',
   JSON_OBJECT('link', '/terms', 'category', 'warranty'),
   DATE_SUB(NOW(), INTERVAL 2 DAY)),

  -- More order notifications
  (1, 'order', 'Đơn hàng chờ thanh toán', 'Đơn hàng #ORD123458 đang chờ thanh toán. Vui lòng hoàn tất thanh toán trong 24h.', 4, 'ORD123458', FALSE, 'cart',
   JSON_OBJECT('status', 'pending', 'amount', 25790000, 'product_name', 'MacBook Air M2 13 inch'),
   DATE_SUB(NOW(), INTERVAL 1 HOUR)),

  -- Promotion notification for student
  (1, 'promotion', 'Ưu đãi sinh viên - Giảm đến 15%', 'Đăng ký S-Student ngay để nhận ưu đãi giảm đến 15% cho laptop, tablet.', NULL, NULL, FALSE, 'gift',
   JSON_OBJECT('discount_percent', 15, 'category', 'student', 'products', JSON_ARRAY('laptop', 'tablet', 'ipad')),
   DATE_SUB(NOW(), INTERVAL 4 HOUR));

-- Create notifications for user 2 (if exists)
INSERT INTO `notifications` 
  (`user_id`, `type`, `title`, `message`, `order_id`, `order_number`, `is_read`, `icon_type`, `metadata`, `created_at`) 
VALUES
  (2, 'smember', 'Chúc mừng bạn đã trở thành Smember', 'Chào mừng bạn gia nhập chương trình Smember.', NULL, NULL, FALSE, 'bell',
   JSON_OBJECT('membership_level', 'silver', 'points', 0),
   DATE_SUB(NOW(), INTERVAL 1 HOUR))
ON DUPLICATE KEY UPDATE id=id; -- Skip if user 2 doesn't exist

SELECT 
  COUNT(*) as total_notifications,
  SUM(CASE WHEN is_read = FALSE THEN 1 ELSE 0 END) as unread_count,
  SUM(CASE WHEN type = 'order' THEN 1 ELSE 0 END) as order_notifications,
  SUM(CASE WHEN type = 'promotion' THEN 1 ELSE 0 END) as promotion_notifications,
  SUM(CASE WHEN type = 'smember' THEN 1 ELSE 0 END) as smember_notifications
FROM `notifications`
WHERE user_id = 1;
