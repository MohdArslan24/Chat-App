const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ""
    }

},{timestamps: true})

userSchema.pre('save', async function(next){
    const user = this
    if(!user.isModified('password')) return next;

    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    next;
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User