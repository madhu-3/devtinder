const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validatePatchUserProfileRequest } = require("../utils/validations");
const { sendSuccess, sendError } = require("../utils/commonUtils");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    sendSuccess(res, user, 200, "");
  } catch (err) {
    sendError(res, 400, "ERROR", err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isReqValid = validatePatchUserProfileRequest(req);
    if (isReqValid) {
      const loggedInUser = req.user;
      Object.keys(req.body).forEach(
        (item) => (loggedInUser[item] = req.body[item])
      );
      await loggedInUser.save();
      sendSuccess(res, loggedInUser, 200, "");
    } else {
      throw new Error("Invalid Request");
    }
  } catch (err) {
    sendError(res, 400, "ERROR", err);
  }
});

module.exports = profileRouter;
