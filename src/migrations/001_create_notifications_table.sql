-- Migration: Create notifications table (PostgreSQL version)
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'order' CHECK (type IN ('order', 'promotion', 'system', 'smember')),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  order_id BIGINT,
  order_number VARCHAR(50),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  icon_type VARCHAR(50),
  metadata JSONB, -- dùng JSONB cho hiệu năng tốt hơn JSON
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_notifications_order
    FOREIGN KEY (order_id)
    REFERENCES orders (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Các index cần thiết
CREATE INDEX idx_user_id ON notifications (user_id);
CREATE INDEX idx_order_id ON notifications (order_id);
CREATE INDEX idx_type ON notifications (type);
CREATE INDEX idx_is_read ON notifications (is_read);
CREATE INDEX idx_created_at ON notifications (created_at);
CREATE INDEX idx_user_type_read ON notifications (user_id, type, is_read);
CREATE INDEX idx_user_created ON notifications (user_id, created_at DESC);
