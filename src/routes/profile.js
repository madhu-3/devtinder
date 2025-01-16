const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validatePatchUserProfileRequest } = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isReqValid = validatePatchUserProfileRequest(req);
    if (isReqValid) {
      const loggedInUser = req.user;
      console.log("loggedInUser", loggedInUser);
      Object.keys(req.body).forEach(
        (item) => (loggedInUser[item] = req.body[item])
      );
      console.log("loggedInUser", loggedInUser);
      await loggedInUser.save();
      res.send(loggedInUser);
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = profileRouter;
