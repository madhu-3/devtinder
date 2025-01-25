const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is mandatory"],
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true, // this will add index automatically
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (value) {
      //     return emailRegex.test(value);
      //   },
      //   message: (props) => `Please enter valid email address ${props.value}`,
      // },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Inavlid Email Address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(`Invalid Gender ${value}`);
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "Dev with Interest in connecting with fellow devs",
    },
    skills: {
      type: [String],
      default: ["Javascript"],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const userdata = this;
  const token = await jwt.sign({ _id: userdata._id }, "DEVTINDER@123$", {
    expiresIn: "2h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const passHash = this.password;
  const isPasswordValid = await bcrypt.compare(password, passHash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
