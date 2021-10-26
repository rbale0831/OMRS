const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

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

// create json web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, 'omrs meridan admin',{
        expiresIn: maxAge
    });
};
 
module.exports.index_get = (req, res) => {
    res.status(200).render('admin/index', );
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
        res.cookie('asign', token, { httpOnly: true, maxAge: maxAge * 3 })
        res.status(201).json({admin : admin._id});
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.adminLogin_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.login(email, password);
        const token = createToken(admin._id);
        res.cookie('alogin', token, { httpOnly: true, maxAge: maxAge * 3 });
        res.status(200).json({admin: admin._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
};

module.exports.adminDashboard_get = (req, res)=>{
    res.status(200).render('admin/dashboard', { title: "Admin Dashboard" });
};

module.exports.adminProfile_get = (req, res)=>{
    res.status(200).render('admin/profile', { title: "Admin Profile" });
};

module.exports.adminLogout_get = (req, res) => {          
    res.cookie('alogin','',{ maxAge: 1 });
    res.redirect('/admin/login'); 
};
