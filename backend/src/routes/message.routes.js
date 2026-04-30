const express = require("express")
const checkForAuthCookie = require("../middlewares/protect")
const {
  sendMessage,
  getMessages,
  markAsRead,
  getConversations,
  deleteMessage,
  getUnreadCount,
} = require("../controller/message.controller")

const router = express.Router()

// All routes require authentication
router.use(checkForAuthCookie)

// Send a message
router.post('/send/:receiverId', sendMessage)

// Get messages between current user and receiver
router.get('/recieve/:receiverId', getMessages)

// Mark message as read
router.patch('/read/:messageId', markAsRead)

// Get all conversations for current user
router.get('/conversations', getConversations)

// Get unread messages count
router.get('/unread', getUnreadCount)

// Delete a message
router.delete('/:messageId', deleteMessage)

module.exports = router