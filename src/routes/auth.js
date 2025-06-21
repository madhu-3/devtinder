const express = require("express");
const bcrypt = require("bcrypt");
const { userSignupValidator } = require("../utils/validations");
const User = require("../modals/user");
const { sendSuccess, sendError } = require("../utils/commonUtils");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    userSignupValidator(req);
    const {
      firstName,
      lastName,
      email: emailId,
      password,
      skills,
      about,
      age,
      gender,
    } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email: emailId,
      password: passHash,
      about: about,
      age: age,
      gender: gender,
    });
    if (skills?.length > 10) {
      throw new Error("Max allowed skills are only 10");
    }
    await user.save();
    sendSuccess(res, {}, 200, "Saved Successfully");
  } catch (err) {
    sendError(res, 400, "Failed to Save data", err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdata = await User.findOne({ email: email });
    if (!userdata) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await userdata.validatePassword(password);
    if (isPasswordValid) {
      const token = await userdata.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 10 * 60 * 60 * 1000),
      });
      const userObj = userdata.toObject();
      const { password, __v, ...result } = userObj;
      sendSuccess(res, result, 200, "Logged In Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    sendError(res, 400, "", err);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  sendSuccess(res, {}, 200, "Logout Successfull");
});
module.exports = authRouter;
