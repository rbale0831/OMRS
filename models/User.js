const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fname:{
        type: String, 
        required: true,
        lowercase: true,
    },
    lname:{
        type: String,
        required: true,
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


// fires a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// statics method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        else{
            throw Error('Incorrect Password');
        };
    }
    else{
        throw Error('Incorrect Email');
    };
};

const User = mongoose.model('user', userSchema);
module.exports = User;
