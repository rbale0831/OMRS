const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');



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

// fires a function before doc saved to db
hospitalSchema.pre('save', async function(next){
    const salt = bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

hospitalSchema.statics.login = async function(email, password) {
    const hospital = await this.findOne({ email });
    if (hospital){
        const auth = await bcrypt.compare(password, hospital.password);
        if (auth){
            return hospital;
        }
        else{
            throw Error('Incorrect Password');
        };
    }
    else{
        throw Error('Incorrect Email');
    };
};

const Hospital = mongoose.model('hospital', hospitalSchema);
module.exports = Hospital;
