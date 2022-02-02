const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userProfileSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Enter Your Email"],
    unique: true,
    lowercase: true,
  }
});

const UserProfile = mongoose.model('userProfile' , userProfileSchema)
module.exports = UserProfile;