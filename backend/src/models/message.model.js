const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Message = mongoose.model('message', messageSchema);

module.exports = Message