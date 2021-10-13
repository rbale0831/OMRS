const User = require('../models/User');

// handele errors
const handleErrors = (err) => {
    console.log(err.message,err.code);     
    let errors = {  fname:"", lname:"", uname:"", email:"", password:""};

    // duplicate errors
    if (err.code === 11000){
        errors.uname = "That Username is already taken";
        errors.email = "That email is already registered";
        return errors;
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


module.exports.index_get = (req, res) => {
    res.status(200).render('infoPage/home', { title: 'Home' });
};

module.exports.userSignup_get = (req, res) => {
    res.status(200).render('infoPage/signup', { title: 'User Signup' });
};

module.exports.userLogin_get = (req, res) => {
    res.status(200).render('infoPage/login', { title: 'User Login' });
};

module.exports.userSignup_post = async (req, res) => {
    const { fname, lname, uname, email, password} = req.body;
    try {
        const user = await User.create({ fname, lname, uname, email, password});
        res.status(201).send(user);
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.userLogin_post =  async (req, res) => {
    const { fname, lname, uname, email, password} = req.body;
    console.log(fname, lname, uname, email, password);
    res.status(201).send('new login');
};

