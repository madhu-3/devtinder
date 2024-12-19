const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./modals/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  try {
    if (userObj) {
      await user.save();
      res.send("Saved Successfully");
    } else {
      throw new Error("Invalid User");
    }
  } catch (err) {
    res.status(400).send("Failed to Save data " + err.message);
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
    const updated = await User.findByIdAndUpdate(userId, updatedObj, {
      returnDocument: "after",
      runValidators:true
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
