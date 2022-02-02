const User = require('../models/User');
const jwt = require('jsonwebtoken');


// handele errors
const handleErrors = (err) => {
    console.log(err.message,err.code);     
    let errors = {  fname:'', lname:'', uname:'', email:'', password:'' };

    // duplicate errors
    if (err.code === 11000){
        errors.uname = "That Username is already taken";
        errors.email = "That email is already registered";
        return errors;
    }


    // incorrect email
    if (err.message === 'Incorrect Email') {
        errors.email = 'Email Is Not Registered';
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'Password Is Incorrect';
    }

    //validate errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            return errors;
        });
    }

    return errors;
}

// create json web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'omrs meridan',{
        expiresIn: maxAge
    });
};


module.exports.index_get = (req, res) => {
    res.status(200).render('infoPage/home', { title: 'Home' });
};

module.exports.userSignup_get = (req, res) => {
    res.status(200).render('infoPage/signup', { title: 'User Register' });
};

module.exports.userLogin_get = (req, res) => {
    res.status(200).render('infoPage/login', { title: 'User Login' });
};

module.exports.userSignup_post = async (req, res) => {
    const { fname, lname, uname, dob, gender, add1, add2, locality, district, state, pincode, occupation, pmn, smn, email, password } = req.body;
    try {
        const user = await User.create({ fname, lname, uname, email, password });
        const token = createToken(user._id);
        res.cookie('csign', token, { httpOnly: true, maxAge: maxAge * 3 });
        res.status(201).json({ user: user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors }); 
    }
};

module.exports.userLogin_post =  async (req, res) => {
    const { email, password} = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('clogin', token, { httpOnly: true, maxAge: maxAge * 3 });
        res.status(200).json({user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
}; 

