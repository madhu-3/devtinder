//Ep-5
const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

//Importance of middlewares
app.use(
  "/admin/getallusers",
  (req, res, next) => {
    const token = "xyzToken"; // ideally we get it from req.body.token
    const isAuthorized = token === "xyzTok";
    if (isAuthorized) {
      next();
    } else {
      res.status(401).send("unauthorized to access");
    }
  },
  (req, res) => {
    console.log("fetching users...");
    res.send("all user data sent");
  }
);

//here we need to add the auth code for all the admin routes, so we can do below
app.use("/admin", adminAuth);

app.get("/admin/getallusers", (req, res) => {
  res.send("sending all user data");
});
app.delete("/admin/delete", (req, res) => {
  res.send("deleted data");
});

//instead of using use for all routes, we can also pass the middleware in the request
app.post("/user/login", (req, res) => {
  res.send("user login process");
});
app.get("/user/profile", userAuth, (req, res) => {
  res.send("sending user profile");
});
app.post("/user/profile", userAuth, (req, res) => {
  res.send("updated user profile");
});

// Error handling
// we should write code using try, catch blocks but we can also handle using the wildcard route
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
app.get("/testerr", userAuth, (req, res, next) => {
  throw new Error("unexprected error");
  res.send("testing the error");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Successfully running on port 7777");
});
