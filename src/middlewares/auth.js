const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const { sendError } = require("../utils/commonUtils");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return sendError(res, 401, "Unauthorized");
    }
    const decodedJWT = await jwt.verify(token, process.env.JWT_SECRET);
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
    sendError(res, 400, "ERROR", err);
  }
};

module.exports = {
  userAuth,
};
