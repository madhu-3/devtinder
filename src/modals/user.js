const mongoose = require("mongoose");
const validator = require("validator");
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
      unique: true,
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
      default:
        "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not good URL");
        }
      },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
