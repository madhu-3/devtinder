const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../modals/request");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const userConnections = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    if (!userConnections) {
      return res.status(404).send("No Connection Requests Found");
    }
    res.send(userConnections);
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // const userConnections = await ConnectionRequest.find({
    //   $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    //   status: "accepted",
    // }).populate("fromUserId", "firstName lastName");

    const userConnections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    if (!userConnections) {
      return res.status(404).send("No Connection Requests Found");
    }

    const data = userConnections.map((item) => {
      if (
        item.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return item.toUserId;
      }
      return item.fromUserId;
    });
    console.log(data);
    res.send(data);
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});

module.exports = userRouter;
