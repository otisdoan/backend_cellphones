const axios = require("axios");
const ChatModel = require("../models/chat.model");
const { v4: uuidv4 } = require("uuid");

// FastAPI service URL from environment
const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

class ChatController {
  // Send message to AI chatbot
  static async sendMessage(req, res) {
    try {
      const { message, session_id, user_id } = req.body;

      // Validate request
      if (!message || !message.trim()) {
        return res.status(400).json({
          success: false,
          error: "Message is required",
        });
      }

      // Generate session_id if not provided
      const sessionId = session_id || `session_${uuidv4()}`;

      // Create or update session in database
      await ChatModel.createSession(sessionId, user_id || null, {
        ip: req.ip,
        user_agent: req.headers["user-agent"],
      });

      // Save user message to database
      const userMessage = await ChatModel.createMessage(
        sessionId,
        "user",
        message.trim()
      );

      // Get recent chat history for context
      const chatHistory = await ChatModel.getRecentMessages(sessionId, 5);

      // Prepare request to FastAPI
      const fastApiRequest = {
        message: message.trim(),
        session_id: sessionId,
        user_id: user_id || null,
        chat_history: chatHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      };

      // Call FastAPI service
      const startTime = Date.now();
      const fastApiResponse = await axios.post(
        `${FASTAPI_URL}/chat/message`,
        fastApiRequest,
        {
          timeout: 30000, // 30 second timeout
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const processingTime = Date.now() - startTime;

      // Extract response data
      const aiResponse = fastApiResponse.data;

      // Save assistant response to database
      await ChatModel.createMessage(
        sessionId,
        "assistant",
        aiResponse.text,
        aiResponse.products || [],
        {
          message_id: aiResponse.message_id,
          intent: aiResponse.metadata?.intent,
          confidence: aiResponse.metadata?.confidence,
          processing_time: processingTime,
          actions: aiResponse.actions,
        }
      );

      // Log analytics
      await ChatModel.logAnalytics(sessionId, "message_sent", {
        user_message_length: message.trim().length,
        products_returned: aiResponse.products?.length || 0,
        processing_time: processingTime,
        intent: aiResponse.metadata?.intent,
      });

      // Update session activity
      await ChatModel.updateSessionActivity(sessionId);

      // Return response to client
      return res.status(200).json({
        success: true,
        data: {
          session_id: sessionId,
          message_id: aiResponse.message_id,
          text: aiResponse.text,
          products: aiResponse.products || [],
          quick_replies: aiResponse.quick_replies || [],
          actions: aiResponse.actions || [],
          metadata: {
            intent: aiResponse.metadata?.intent,
            confidence: aiResponse.metadata?.confidence,
            processing_time: processingTime,
          },
        },
      });
    } catch (error) {
      console.error("Chat Controller Error:", error);

      // Handle FastAPI service errors
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          error: "AI service error",
          details: error.response.data,
        });
      }

      // Handle timeout errors
      if (error.code === "ECONNABORTED") {
        return res.status(504).json({
          success: false,
          error: "Request timeout. Please try again.",
        });
      }

      // Handle connection errors
      if (error.code === "ECONNREFUSED") {
        return res.status(503).json({
          success: false,
          error: "AI service unavailable. Please try again later.",
        });
      }

      // Generic error
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // Get chat history
  static async getChatHistory(req, res) {
    try {
      const { session_id } = req.params;
      const { limit = 20 } = req.query;

      if (!session_id) {
        return res.status(400).json({
          success: false,
          error: "Session ID is required",
        });
      }

      // Get session
      const session = await ChatModel.getSession(session_id);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      // Get chat history
      const messages = await ChatModel.getChatHistory(
        session_id,
        parseInt(limit)
      );

      // Get session stats
      const stats = await ChatModel.getSessionStats(session_id);

      return res.status(200).json({
        success: true,
        data: {
          session_id: session_id,
          messages: messages,
          stats: stats,
          session: {
            started_at: session.started_at,
            last_activity_at: session.last_activity_at,
            ended_at: session.ended_at,
          },
        },
      });
    } catch (error) {
      console.error("Get Chat History Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // Submit feedback
  static async submitFeedback(req, res) {
    try {
      const { message_id, session_id, feedback, comment } = req.body;

      // Validate
      if (!message_id || !session_id || !feedback) {
        return res.status(400).json({
          success: false,
          error: "message_id, session_id, and feedback are required",
        });
      }

      if (!["positive", "negative", "neutral"].includes(feedback)) {
        return res.status(400).json({
          success: false,
          error: "feedback must be positive, negative, or neutral",
        });
      }

      // Create feedback
      const feedbackRecord = await ChatModel.createFeedback(
        message_id,
        session_id,
        feedback,
        comment || null
      );

      // Log analytics
      await ChatModel.logAnalytics(session_id, "feedback_submitted", {
        message_id,
        feedback,
        has_comment: !!comment,
      });

      return res.status(200).json({
        success: true,
        data: feedbackRecord,
      });
    } catch (error) {
      console.error("Submit Feedback Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // End chat session
  static async endSession(req, res) {
    try {
      const { session_id } = req.params;

      if (!session_id) {
        return res.status(400).json({
          success: false,
          error: "Session ID is required",
        });
      }

      // End session
      const session = await ChatModel.endSession(session_id);

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      // Log analytics
      await ChatModel.logAnalytics(session_id, "session_ended", {
        duration: new Date(session.ended_at) - new Date(session.started_at),
      });

      return res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      console.error("End Session Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // Health check
  static async healthCheck(req, res) {
    try {
      // Check FastAPI service
      const fastApiHealth = await axios.get(`${FASTAPI_URL}/chat/health`, {
        timeout: 5000,
      });

      return res.status(200).json({
        success: true,
        service: "express-chat-proxy",
        fastapi: fastApiHealth.data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(503).json({
        success: false,
        service: "express-chat-proxy",
        error: "FastAPI service unavailable",
        timestamp: new Date().toISOString(),
      });
    }
  }
}

module.exports = ChatController;
