const express = require("express");
const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello from Home");
// }); conflicting with other routes
app.use("/user", (req, res) => {
  res.send("Hello from user updated");
});
app.use("/api", (req, res) => {
  res.send("Hello from API");
});
app.listen(3000, () => {
  console.log("Successfully running on port 3000");
});
