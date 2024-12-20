const validator = require("validator");
const userSignupValidator = (req) => {
  const { firstName, lastName, email:emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Names are mandatory");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter Strong Password");
  }
};
module.exports = { userSignupValidator };
