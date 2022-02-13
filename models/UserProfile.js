const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  mname: {
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