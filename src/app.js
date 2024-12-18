const express = require("express");
const app = express();

app.use("/abc", (req, res) => {
  console.log("Test No Res");
  //Not sending any response, API will wait wait and eventually timeout
});

// We can add as many route handlers as we want, it will execute only the first route handler unless explictly called next()
app.use(
  "/user",
  (req, res, next) => {
    console.log("Route handler 1");
    res.send("Route Hanlder -> 1");
  },
  (req, res, next) => {
    console.log("Route handler 2");
    res.send("Route Hanlder -> 2");
  },
  (req, res, next) => {
    console.log("Route handler 3");
    res.send("Route Hanlder -> 3");
  }
);

// if we already sent the response and calling next and in the next route handler, the API will work but we will get error
app.use(
  "/test",
  (req, res, next) => {
    console.log("Route handler 1");
    //res.send("Route Hanlder -> 1");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 2");
    res.send("Route Hanlder -> 2");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 3");
    //res.send("Route Hanlder -> 3");
  }
);
// Array of route handlers
const rhArray = [
  (req, res, next) => {
    console.log("Route handler 1");
    res.send("Route Hanlder -> 1");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 2");
    res.send("Route Hanlder -> 2");
  },
];
app.get("/arrayof", rhArray);
app.listen(3000, () => {
  console.log("Successfully running on port 3000");
});
