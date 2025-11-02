-- Migration: Create Chat Tables for AI Chatbox
-- Date: 2025-11-02
-- Description: Tables for chat sessions, messages, analytics, and feedback

-- 1. Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for chat_sessions
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);

-- 2. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  products_shown JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for chat_messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON chat_messages(role);

-- Foreign key (soft reference, no CASCADE to preserve history)
ALTER TABLE chat_messages 
  DROP CONSTRAINT IF EXISTS fk_chat_messages_session;
ALTER TABLE chat_messages
  ADD CONSTRAINT fk_chat_messages_session 
  FOREIGN KEY (session_id) 
  REFERENCES chat_sessions(session_id)
  ON DELETE CASCADE;

-- 3. Chat Analytics Table
CREATE TABLE IF NOT EXISTS chat_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for chat_analytics
CREATE INDEX IF NOT EXISTS idx_chat_analytics_session_id ON chat_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_event_type ON chat_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_created_at ON chat_analytics(created_at);

-- 4. Chat Feedback Table
CREATE TABLE IF NOT EXISTS chat_feedback (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT REFERENCES chat_messages(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,
  feedback VARCHAR(20) NOT NULL CHECK (feedback IN ('positive', 'negative', 'neutral')),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for chat_feedback
CREATE INDEX IF NOT EXISTS idx_chat_feedback_message_id ON chat_feedback(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_feedback_session_id ON chat_feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_feedback_feedback ON chat_feedback(feedback);

-- 5. Update products table (add embedding metadata)
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS embedding_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS embedding_updated_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_products_embedding_id ON products(embedding_id);

-- 6. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for chat_sessions
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your user)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON chat_sessions TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON chat_messages TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON chat_analytics TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON chat_feedback TO your_app_user;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Chat tables created successfully!';
  RAISE NOTICE 'Tables: chat_sessions, chat_messages, chat_analytics, chat_feedback';
  RAISE NOTICE 'Products table updated with embedding columns';
END $$;
