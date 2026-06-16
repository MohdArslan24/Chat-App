const express = require("express")
const checkForAuthCookie = require("../middlewares/protect")
const upload = require("../middlewares/upload")
const {
  sendMessage,
  getMessages,
  markAsRead,
  getConversations,
  deleteMessage,
  getUnreadCount,
  uploadImage,
} = require("../controller/message.controller")

const router = express.Router()

// All routes require authentication
router.use(checkForAuthCookie)

// Upload image
router.post('/upload', upload.single("image"), uploadImage)

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