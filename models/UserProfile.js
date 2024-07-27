const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  mname: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: [true, "Enter Your Occupation"],
  },
  age:{
    type: Number,
    required: true
  },
  bg:{
    type: String,
    required: true
  },
  gender:{
    type:String,
    required: true
  },
  dob:{
    type: Date,
    required: true
  },
  lan:{
    type: String,
    required:true
  },
  cp:{
    type:[String],
  },
  hadd:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required:true
  },
  loc:{
    type: String,
    required:true
  },
  state:{
    type: String,
    required:true
  },
  pincode:{
    type: Number,
    required:true,
    minlength:[5,"Pincode is of 5 Numbers"],
    maxlength:[5,"Pincode is of 5 Numbers"],
  },
  cno:{
    type: Number,
    required:true,
    minlength:[10,"Pincode is of 5 Numbers"],
    maxlength:[10,"Pincode is of 5 Numbers"],
  },
});

const UserProfile = mongoose.model('userProfile' , userProfileSchema)
module.exports = UserProfile;