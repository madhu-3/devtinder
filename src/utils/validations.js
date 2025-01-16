const validator = require("validator");
const userSignupValidator = (req) => {
  const { firstName, lastName, email: emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Names are mandatory");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter Strong Password");
  }
};

const validatePatchUserProfileRequest = (req) => {
  const ALLOWED_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_FIELDS.includes(field)
  );
  if (isEditAllowed) {
    if (req.body.skills?.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    if (req.body?.photoUrl) {
      if (!validator.isURL(req.body.photoUrl)) {
        throw new Error("Not a valid photo URL");
      }
    }
  }
  return isEditAllowed;
};
module.exports = { userSignupValidator, validatePatchUserProfileRequest };
