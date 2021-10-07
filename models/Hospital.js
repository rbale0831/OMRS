const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



const hospitalSchema = new mongoose.Schema({
    hosname:{
        type: String,
        required: [true, "Enter your hospital name"],
        lowercase: true,
        unique: true,
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

const Hospital = mongoose.model('hospital', hospitalSchema);
module.exports = Hospital;
