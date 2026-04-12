const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URI}/Chat-App`)
        console.log(`\n MongoDB connected !!! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database Connection Error",error)
        throw error;
    }
}

module.exports = connectDB