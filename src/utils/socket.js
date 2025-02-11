const socket = require("socket.io");
const getRoomId = require("./socketUtils");
const ChatSystem = require("../modals/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
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
