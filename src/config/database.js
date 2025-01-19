const mongoose = require("mongoose");
const ConnectDB = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
};
module.exports = ConnectDB;
