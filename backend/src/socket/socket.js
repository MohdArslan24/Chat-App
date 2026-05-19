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
    if (!userId) {
      return;
    }

    connectedUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(connectedUsers));

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = getUserId(receiverId);
      
      if (receiverSocketId) {
        
        io.to(receiverSocketId).emit("typing", senderId);
      }
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSocketId = getUserId(receiverId);
      if (receiverSocketId) {
        
        io.to(receiverSocketId).emit("stopTyping", senderId);
      }
    });

    socket.on("disconnect", () => {
      delete connectedUsers[userId];
      io.emit("onlineUsers", Object.keys(connectedUsers));
      console.log("user disconnected");
    });
  });
};

const getUserId = (userId) => {
  return connectedUsers[userId];
};

module.exports = {
  initSocket,
  getUserId,
  getIO: () => io,
};
