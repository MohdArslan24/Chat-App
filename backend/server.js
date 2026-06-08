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

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please close other processes or change the PORT in your .env file.`);
        process.exit(1);
    } else {
        throw error;
    }
});