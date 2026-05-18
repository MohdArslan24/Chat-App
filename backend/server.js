require('dotenv').config()

const http = require("http");

const app = require("./src/app")
const { initSocket } = require("./src/socket/socket")


const connectDB = require('./src/config/db')

const server = http.createServer(app);
initSocket(server);

const port = process.env.PORT || 3000

//Connect MongoDB
connectDB()

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})