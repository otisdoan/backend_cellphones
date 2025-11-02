const sequelize = require("../configs/database.config");
const { QueryTypes } = require("sequelize");

class ChatModel {
  // Create or get chat session
  static async createSession(sessionId, userId = null, metadata = {}) {
    const [result] = await sequelize.query(
      `
      INSERT INTO chat_sessions (session_id, user_id, metadata)
      VALUES (:sessionId, :userId, :metadata)
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        last_activity_at = NOW(),
        metadata = EXCLUDED.metadata
      RETURNING *
      `,
      {
        replacements: {
          sessionId,
          userId,
          metadata: JSON.stringify(metadata),
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Get session by ID
  static async getSession(sessionId) {
    const [result] = await sequelize.query(
      "SELECT * FROM chat_sessions WHERE session_id = :sessionId",
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Update session activity
  static async updateSessionActivity(sessionId) {
    const [result] = await sequelize.query(
      `
      UPDATE chat_sessions 
      SET last_activity_at = NOW() 
      WHERE session_id = :sessionId
      RETURNING *
      `,
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // End session
  static async endSession(sessionId) {
    const [result] = await sequelize.query(
      `
      UPDATE chat_sessions 
      SET ended_at = NOW() 
      WHERE session_id = :sessionId
      RETURNING *
      `,
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Create message
  static async createMessage(
    sessionId,
    role,
    content,
    productsShown = [],
    metadata = {}
  ) {
    const [result] = await sequelize.query(
      `
      INSERT INTO chat_messages (session_id, role, content, products_shown, metadata)
      VALUES (:sessionId, :role, :content, :productsShown, :metadata)
      RETURNING *
      `,
      {
        replacements: {
          sessionId,
          role,
          content,
          productsShown: JSON.stringify(productsShown),
          metadata: JSON.stringify(metadata),
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Get chat history
  static async getChatHistory(sessionId, limit = 20) {
    const results = await sequelize.query(
      `
      SELECT * FROM chat_messages 
      WHERE session_id = :sessionId 
      ORDER BY created_at ASC 
      LIMIT :limit
      `,
      {
        replacements: { sessionId, limit },
        type: QueryTypes.SELECT,
      }
    );
    return results;
  }

  // Get recent messages for context
  static async getRecentMessages(sessionId, limit = 5) {
    const results = await sequelize.query(
      `
      SELECT role, content, created_at 
      FROM chat_messages 
      WHERE session_id = :sessionId 
      ORDER BY created_at DESC 
      LIMIT :limit
      `,
      {
        replacements: { sessionId, limit },
        type: QueryTypes.SELECT,
      }
    );
    return results.reverse(); // Return in chronological order
  }

  // Log analytics event
  static async logAnalytics(sessionId, eventType, eventData = {}) {
    const [result] = await sequelize.query(
      `
      INSERT INTO chat_analytics (session_id, event_type, event_data)
      VALUES (:sessionId, :eventType, :eventData)
      RETURNING *
      `,
      {
        replacements: {
          sessionId,
          eventType,
          eventData: JSON.stringify(eventData),
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Create feedback
  static async createFeedback(messageId, sessionId, feedback, comment = null) {
    const [result] = await sequelize.query(
      `
      INSERT INTO chat_feedback (message_id, session_id, feedback, comment)
      VALUES (:messageId, :sessionId, :feedback, :comment)
      RETURNING *
      `,
      {
        replacements: { messageId, sessionId, feedback, comment },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  // Get session statistics
  static async getSessionStats(sessionId) {
    const [result] = await sequelize.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE role = 'user') as user_messages,
        COUNT(*) FILTER (WHERE role = 'assistant') as bot_messages,
        MIN(created_at) as first_message,
        MAX(created_at) as last_message
      FROM chat_messages 
      WHERE session_id = :sessionId
      `,
      {
        replacements: { sessionId },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }
}

module.exports = ChatModel;
