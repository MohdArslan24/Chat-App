const cloudinary = require("../config/cloudinary")
const streamifier = require('streamifier')

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "chat-app" },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result.secure_url)
                }
            }
        )
        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}

module.exports = uploadToCloudinary