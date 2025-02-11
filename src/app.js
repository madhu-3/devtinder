const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/imageFile");
const chatRouter = require("./routes/chat");
const http = require("http");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", fileRouter);
app.use("/", chatRouter);
const initializeSocket = require("./utils/socket");

const server = http.createServer(app);
initializeSocket(server);

ConnectDB()
  .then(() => {
    console.log("Database Connection Successfull");
    server.listen(process.env.PORT, () => {
      console.log("Successfully running");
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
