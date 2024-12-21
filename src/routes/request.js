const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../modals/request");
const User = require("../modals/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserData = req.user;
      const fromUserId = fromUserData._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const ALLOWED_STATUS = ["interested", "ignored"];
      if (!ALLOWED_STATUS.includes(status)) {
        throw new Error(
          `${status} status is not allowed on this type of request`
        );
      }

      const toUserData = await User.findById(toUserId);
      if (!toUserData) {
        return res.status(404).json({ status: "Error", message: "User Not Found" });
      }

      const isConnectionRequestAlreadyexists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnectionRequestAlreadyexists) {
        throw new Error(
          `Connection Request between ${fromUserData.firstName} and ${toUserData.firstName} already exists`
        );
      }
      const connetionRequest = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      await connetionRequest.save();
      res.send("Connection Request sent Successful");
    } catch (err) {
      res.status(400).send("ERROR " + err.message);
    }
  }
);

module.exports = requestRouter;
