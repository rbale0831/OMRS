const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
 
const adminSchema = new mongoose.Schema({
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
        required : [true, 'Enter your password'],
        minlength: [8, 'Minimum password length 8 charaters'],
        maxlength: [16, 'Maximum password length 16 charaters'],
    },
});

// fires a function before doc saved to db
adminSchema.pre('save', async function(next){
    const salt = await bcrpt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
