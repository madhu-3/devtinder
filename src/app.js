const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./modals/user");
const { userSignupValidator } = require("./utils/validations");
const { userAuth } = require("./middlewares/auth");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    userSignupValidator(req);
    const { firstName, lastName, email: emailId, password, skills } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    console.log(passHash);
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdata = await User.findOne({ email: email });
    if (!userdata) {
      throw new Error("Invalid Credentials-Wrong email");
    }
    const isPasswordValid = await bcrypt.compare(password, userdata.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: userdata._id }, "DEVTINDER@123$", {
        expiresIn: 120,
      });
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

app.post("/connectionrequest", userAuth, async (req, res) => {
  res.send(`Connection Request sent`);
});

ConnectDB()
  .then(() => {
    console.log("Database Connection Successfull");
    app.listen(3000, () => {
      console.log("Successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
