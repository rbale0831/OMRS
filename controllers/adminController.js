const Admin = require('../models/Admin');

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

    // Incorrect Email Address
    if(err.message === 'Incorrect Email'){
        errors.email = 'That Email is Not Registered';
        return errors;
    }

    // Incorrect Password 
    if(err.message === 'Incorrect Password'){
        errors.password = 'Admin Password is Incorrect';
        return errors;
    }

    //validate errors
    if (err.message.includes('admin validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            return errors;
        });
    }

    return errors;
}

 
module.exports.index_get = (req, res) => {
    res.status(200).render('admin/index', { title: "Admin Dashboard" });
};

module.exports.adminSignup_get = (req, res) => {
    res.status(200).render('admin/signup',{ title: "Admin Signup" });
};

module.exports.adminLogin_get = (req, res) => {
    res.status(200).render('admin/login',{ title: " Admin Login" });
};

module.exports.adminSignup_post = async (req, res) => {
    const { fname, lname, uname, email, password } = req.body;
    
    try{
        const admin = await Admin.create({ fname, lname, uname, email, password });
        res.status(201).json(admin);
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.adminLogin_post = async (req, res) => {
    const { fname, lname, uname, email, password } = req.body;
    console.log( fname, lname, uname, email, password );
    res.send('new login');
};

