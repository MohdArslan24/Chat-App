const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const User = require("../models/user.model");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const{  receiverId } = req.params
    const senderId = req.user.id;
    const { message } = req.body;
    

    // Validation
    if (!receiverId || !message) {
      return res.status(422).send({
        success: false,
        message: "Receiver ID and message are required.",
      });
    }

    console.log(senderId)

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).send({
        success: false,
        message: "Receiver not found.",
      });
    }

    // Cannot send message to self
    if (senderId.toString() === receiverId.toString()) {
      return res.status(422).send({
        success: false,
        message: "Cannot send message to yourself.",
      });
    }

     if (message.trim().length === 0) {
      return res.status(422).send({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    // Create message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message: message.trim(),
    });

    // Populate sender and receiver details

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
        lastMessage: newMessage._id,
        lastMessageTime: newMessage.createdAt,
      });
    } else {
      // Update conversation with new message
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = newMessage._id;
      conversation.lastMessageTime = newMessage.createdAt;
      await conversation.save();
    }

    return res.status(201).send({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const otherParticipantId = req.params.receiverId;
    const senderId = req.user.id;

    // Validation
    if (!otherParticipantId) {
      return res.status(422).send({
        success: false,
        message: "Receiver ID is required.",
      });
    }

    // Check if receiver exists
    const receiver = await User.findById(otherParticipantId);
    if (!receiver) {
      return res.status(404).send({
        success: false,
        message: "Receiver not found.",
      });
    }
  
    // Get all messages between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, otherParticipantId]},
    }).populate("messages").populate("lastMessage")

    return res.status(200).send({
      success: true,
      message: "Messages retrieved successfully.",
      data: conversation,
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Mark message as read
const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    // Validation
    if (!messageId) {
      return res.status(422).send({
        success: false,
        message: "Message ID is required.",
      });
    }

    // Find message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send({
        success: false,
        message: "Message not found.",
      });
    }

    // Check if user is the receiver
    if (message.receiver.toString() !== userId.toString()) {
      return res.status(403).send({
        success: false,
        message: "You can only mark your own messages as read.",
      });
    }

    // Mark as read
    message.isRead = true;
    await message.save();

    return res.status(200).send({
      success: true,
      message: "Message marked as read.",
      data: message,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get all conversations for current user
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name email image")
      .populate("lastMessage")
      .sort({ lastMessageTime: -1 });

    // Format conversations to include unread count and other details
    const formattedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await Message.countDocuments({
          receiver: userId,
          sender: {
            $in: conversation.participants.map((p) => p._id),
          },
          isRead: false,
        });

        const otherParticipant = conversation.participants.find(
          (p) => p._id.toString() !== userId.toString()
        );

        return {
          ...conversation.toObject(),
          otherParticipant,
          unreadCount,
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: "Conversations retrieved successfully.",
      data: formattedConversations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    // Validation
    if (!messageId) {
      return res.status(422).send({
        success: false,
        message: "Message ID is required.",
      });
    }

    // Find message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send({
        success: false,
        message: "Message not found.",
      });
    }

    // Check if user is the sender
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).send({
        success: false,
        message: "You can only delete your own messages.",
      });
    }

    // Delete message
    await Message.findByIdAndDelete(messageId);

    return res.status(200).send({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get unread messages count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadCount = await Message.countDocuments({
      receiver: userId,
      isRead: false,
    });

    return res.status(200).send({
      success: true,
      message: "Unread count retrieved successfully.",
      data: {
        unreadCount,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsRead,
  getConversations,
  deleteMessage,
  getUnreadCount,
};
