const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/connectionrequest", userAuth, async (req, res) => {
  res.send(`Connection Request sent`);
});

module.exports = requestRouter;
