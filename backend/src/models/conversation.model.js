const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
        default: null
    },
    lastMessageTime: {
        type: Date,
        default: null
    }
}, {timestamps: true})

const Conversation = mongoose.model('conversation', conversationSchema)

module.exports = Conversation