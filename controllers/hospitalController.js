const Hospital = require('../models/Hospital');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
 
// handele errors
const handleErrors = (err) => {
    console.log(err.message,err.code);     
    let errors = { hosname: '', email: '', password: '' };

    // duplicate errors
    if (err.code === 11000){
        errors.hosname = "That hospital name is already registered";
        errors.email = "That email is already registered";
        return errors;
    };

    // incorrect email
    if (err.message === 'Incorrect Email') {
        errors.email = 'Email Is Not Registered';
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'Password Is Incorrect';
    }

    //validate errors
    if (err.message.includes('hospital validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            return errors;
        });
    };

    return errors;
}

// create json web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id},'omrs meridan hospital',{
        expiresIn: maxAge
    });
};

module.exports.hospitalSignup_get = (req, res) => {
    res.status(200).render('hospital/signup',{ title: "Hospital Sign" });
};

module.exports.hospitalLogin_get = (req, res) => {
    res.status(200).render('hospital/login',{ title: "Hospital Login" });
};

module.exports.hospitalSignup_post = async (req, res) => {
    const { hosname, email, password } = req.body;
    
    try{
        const hospital = await Hospital.create({ hosname, email, password });
        const token = createToken(hospital._id);
        res.cookie('hsign', token, { httpOnly: true, maxAge: maxAge * 3 })
        res.status(201).json({hospital : hospital._id});
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.hospitalLogin_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const hospital = await Hospital.login(email, password);
        const token = createToken(hospital._id);
        res.cookie('hlogin', token, { httpOnly: true, maxAge: maxAge * 3 });
        res.status(200).json({hospital: hospital._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
};

module.exports.hospitalDashboard_get = (req, res)=>{
    res.status(200).render('hospital/index',{ title: 'Hospital Dashboard'});
};

module.exports.hospitalAddPatientDetails_get = async (req, res)=>{
    const id = req.params._id
    // console.log(id);
    await User.find()
        .then(result => {
            res.status(200).render('hospital/add', { users: result, title: 'Patient Details' })
        })
        .catch(err =>{
            res.json(err);
        })
};

module.exports.hospitalProfile_get = (req, res)=>{
    res.status(200).render('hospital/profile', { title: 'Profile'});
};

module.exports.hospitalLogout_get = (req, res) => {          
    res.cookie('hlogin','',{ maxAge: 1 });
    res.redirect('/hospital/login')
};