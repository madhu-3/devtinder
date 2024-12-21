const express = require("express");
const bcrypt = require("bcrypt");
const { userSignupValidator } = require("../utils/validations");
const User = require("../modals/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    userSignupValidator(req);
    const { firstName, lastName, email: emailId, password, skills } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email: emailId,
      password: passHash,
    });
    if (skills?.length > 10) {
      throw new Error("Max allowed skills are only 10");
    }
    await user.save();
    res.send("Saved Successfully");
  } catch (err) {
    res.status(400).send("Failed to Save data " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdata = await User.findOne({ email: email });
    if (!userdata) {
      throw new Error("Invalid Credentials-Wrong email");
    }
    const isPasswordValid = await userdata.validatePassword(password);
    if (isPasswordValid) {
      const token = await userdata.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 60 * 1000),
      });
      res.send("Login success");
    } else {
      throw new Error("Invalid Credentials-Wrong password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout succesful");
});
module.exports = authRouter;
