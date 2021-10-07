const Hospital = require('../models/Hospital');
 
// handele errors
const handleErrors = (err) => {
    console.log(err.message,err.code);     
    let errors = { hosname: '', email: '', password: '' };

    // duplicate errors
    if (err.code === 11000){
        errors.hosname = "That hospital name is already registered";
        errors.email = "That email is already registered";
        return errors;
    }

    //validate errors
    if (err.message.includes('hospital validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            return errors;
        });
    }

    return errors;
}



module.exports.index_get = (req, res) => {
    res.status(200).render('hospital/index', { title: "Hospital" });
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
        res.status(201).json(hospital);
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.hospitalLogin_post = async (req, res) => {
    const { hosname, email, password } = req.body;
    console.log(hosname, email, password);
    res.send('new login');
};

