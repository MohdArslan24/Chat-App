require('dotenv').config()

const app = require("./src/app")
const server = require("./src/socket/socket")

const connectDB = require('./src/config/db')


const port = process.env.PORT || 3000

//Connect MongoDB
connectDB()

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})