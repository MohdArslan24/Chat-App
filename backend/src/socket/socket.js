const { Server } = require("socket.io");

let io;
const connectedUsers = {};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if(!userId) {
      return;
    }

    connectedUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(connectedUsers));
    console.log(Object.keys(connectedUsers));

    socket.on("disconnect", () => {
      delete connectedUsers[userId];
      io.emit("onlineUsers", Object.keys(connectedUsers));
      console.log("user disconnected");
    });
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });
  });
};

const getUserId = (userId) => {
  return connectedUsers[userId];
}

module.exports = {
    initSocket,
    getUserId,
    getIO: () => io
};
