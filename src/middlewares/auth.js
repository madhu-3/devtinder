const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedJWT = await jwt.verify(token, "DEVTINDER@123$");
    const { _id } = decodedJWT;
    if (!_id) {
      throw new Error("Invalid Token");
    }
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid Token");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
};

module.exports = {
  userAuth,
};
