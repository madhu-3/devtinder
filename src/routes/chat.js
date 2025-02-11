const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ChatSystem = require("../modals/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params?.targetUserId;

    let chat = await ChatSystem.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new ChatSystem({
        participants: [senderId, receiverId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.log(err);
  }
});

module.exports = chatRouter;
