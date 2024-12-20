const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./modals/user");
const { userSignupValidator } = require("./utils/validations");
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
      const token = jwt.sign({ _id: userdata._id }, "DEVTINDER@123$");
      res.cookie("token", token);
      res.send("Login success");
    } else {
      throw new Error("Invalid Credentials-Wrong password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const userTokenDetails = jwt.verify(token, "DEVTINDER@123$");
    const { _id } = userTokenDetails;
    if (!_id) {
      throw new Error("Invalid Token");
    }
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  try {
    const userbyemailId = await User.find({ email: emailId });
    res.send(userbyemailId);
  } catch (err) {
    res.status(400).send("Failed to fetch data" + err.message);
  }
});

app.get("/userbyemail", async (req, res) => {
  const emailId = req.query.email;
  try {
    const userbyemailId = await User.find({ email: emailId });
    res.send(userbyemailId);
  } catch (err) {
    res.status(400).send("Failed to fetch data" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(400).send("Bad Request " + err);
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedAck = await User.findByIdAndDelete(userId);
    res.send(`Successfully deleted ${userId}`);
  } catch (err) {
    res.status(400).send("Bad Request " + err);
  }
});

app.delete("/user/:email", async (req, res) => {
  const emailId = req.params.email;
  try {
    const deletedAck = await User.deleteMany({ email: emailId });
    if (deletedAck.deletedCount > 0) {
      res.send(`Successfully deleted ${emailId}`);
    } else {
      res.status(404).send(`${emailId} Not found`);
    }
  } catch (err) {
    res.status(400).send("Bad Request " + err);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updatedObj = req.body;
  try {
    const ALLOWED_FIELDS = ["userId", "photoUrl", "about", "skills"];
    if (!Object.keys(updatedObj).every((i) => ALLOWED_FIELDS.includes(i))) {
      throw new Error("Not allowed to update");
    }
    if (updatedObj.skills.length > 10) {
      throw new Error("Max allowed skills are only 10");
    }
    const updated = await User.findByIdAndUpdate(userId, updatedObj, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(201).send(updated);
  } catch (err) {
    res.status(400).send("Bad Request " + err);
  }
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
