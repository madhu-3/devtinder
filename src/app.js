const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

ConnectDB()
  .then(() => {
    console.log("Database Connection Successfull");
    app.listen(process.env.PORT, () => {
      console.log("Successfully running");
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
