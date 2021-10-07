const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: [true, "Enter your First Name"],
        lowercase: true,
    },
    lname:{
        type: String,
        required: [true, "Enter your Last Name"],
        lowercase: true,
    },
    uname:{
        type: String,
        required: [true, "Enter your Username"],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Enter Your Email Address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a Valid Email Address"],
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: [8, 'Minimum password length 8 charaters'],
        maxlength: [16, 'Maximum password length 16 charaters'],
    },
});


const User = mongoose.model('user', userSchema);
module.exports = User;
