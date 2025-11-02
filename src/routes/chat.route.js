const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chat.controller");

// Health check
router.get("/health", ChatController.healthCheck);

// Send message to AI chatbot
router.post("/message", ChatController.sendMessage);

// Get chat history
router.get("/history/:session_id", ChatController.getChatHistory);

// Submit feedback
router.post("/feedback", ChatController.submitFeedback);

// End chat session
router.post("/session/:session_id/end", ChatController.endSession);

module.exports = router;
