# Database Migrations

## Hướng dẫn chạy migrations

### 1. Tạo bảng notifications

```bash
mysql -u your_username -p your_database < src/migrations/001_create_notifications_table.sql
```

### 2. Seed dữ liệu mẫu

```bash
mysql -u your_username -p your_database < src/migrations/002_seed_notifications.sql
```

## Cấu trúc bảng notifications

```sql
notifications (
  id                BIGINT (PK, AUTO_INCREMENT)
  user_id           BIGINT (FK -> users.id) [NOT NULL, INDEXED]
  type              ENUM('order', 'promotion', 'system', 'smember') [DEFAULT 'order']
  title             VARCHAR(255) [NOT NULL]
  message           TEXT
  order_id          BIGINT (FK -> orders.id) [INDEXED]
  order_number      VARCHAR(50)
  is_read           BOOLEAN [DEFAULT FALSE, INDEXED]
  icon_type         VARCHAR(50) [cart, bag, bell, gift]
  metadata          JSON [Additional data]
  created_at        TIMESTAMP [DEFAULT CURRENT_TIMESTAMP, INDEXED]
  updated_at        TIMESTAMP [ON UPDATE CURRENT_TIMESTAMP]
)
```

## Indexes

- `idx_user_id` - Tìm kiếm theo user
- `idx_order_id` - Tìm kiếm theo đơn hàng
- `idx_type` - Filter theo loại notification
- `idx_is_read` - Filter đã đọc/chưa đọc
- `idx_created_at` - Sắp xếp theo thời gian
- `idx_user_type_read` - Composite index cho query phức tạp
- `idx_user_created` - Lấy notifications mới nhất của user

## Foreign Keys

- `user_id` -> `users.id` (CASCADE on DELETE/UPDATE)
- `order_id` -> `orders.id` (CASCADE on DELETE/UPDATE)

## Sample Data

File `002_seed_notifications.sql` tạo 8 notifications mẫu cho user_id = 1:

- 4 Order notifications (2 unread, 2 read)
- 2 Promotion notifications (2 unread)
- 1 Smember notification (1 unread)
- 1 System notification (1 read)

## Rollback

Để xóa bảng notifications:

```sql
DROP TABLE IF EXISTS notifications;
```

## Notes

- Đảm bảo bảng `users` và `orders` đã tồn tại trước khi chạy migration
- Metadata field dùng JSON để lưu thông tin bổ sung linh hoạt
- Indexes được tối ưu cho các query thường dùng (get by user, filter by type, order by time)
