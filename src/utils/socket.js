const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const getRoomId = require("./socketUtils");
const ChatSystem = require("../modals/chat");
const User = require("../modals/user");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }
    try {
      const decodedJWT = await jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decodedJWT;
      if (!_id) {
        return next(new Error("Authentication error: No ID"));
      }
      const user = await User.findOne({ _id });
      if (!user) {
        return next(new Error("Authentication error: No User"));
      }
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication Failed: Invalid Token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ fromUserId, toUserId }) => {
      const roomId = getRoomId(fromUserId, toUserId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, fromUserId, toUserId, text }) => {
        try {
          const roomId = getRoomId(fromUserId, toUserId);
          let chat = await ChatSystem.findOne({
            participants: { $all: [fromUserId, toUserId] },
          });
          if (!chat) {
            chat = new ChatSystem({
              participants: [fromUserId, toUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: fromUserId,
            text,
          });
          await chat.save();
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            createdAt: new Date(),
          });
        } catch (err) {}
      }
    );

    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
