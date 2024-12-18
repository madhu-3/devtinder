const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./modals/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ram",
    lastName: "Charan",
    email: "ram@charan.com",
    gender: "Male",
  });
  try {
    await user.save();
    res.send("Saved Successfully");
  } catch (err) {
    res.status(400).send("Failed to Save data" + err.message);
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
