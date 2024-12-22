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
        return res
          .status(404)
          .json({ status: "Error", message: "User Not Found" });
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

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    //Check if request id and status are valid, not some random
    //status should be either accepted or rejected
    //Current status in db should be interested, only then the user can accpet or reject right
    //toUserId should be the logged In user

    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const ACCEPTED_STATUS = ["accepted", "rejected"];
      if (!ACCEPTED_STATUS.includes(status)) {
        throw new Error(`Status ${status} is not valid`);
      }

      const connetionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        status: "interested",
        toUserId: loggedInUser._id,
      });
      if (!connetionRequest) {
        return res.status(404).send("Connection Request Not found");
      }
      connetionRequest.status = status;
      const data = await connetionRequest.save();
      res.send({ message: `Connection request ${status} Successfull!!`, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err);
    }
  }
);

module.exports = requestRouter;
