const mongoose = require("mongoose");
const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://madhuyelubandy:mzLHE1lI7lGieQ2W@namastenodemongopractic.3hder.mongodb.net/devtinder"
  );
};
module.exports = ConnectDB;
