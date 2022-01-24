const User = require('../models/User');


module.exports.userDashboard_get = (req, res)=>{
    res.status(200).render('user/index');
};
module.exports.userDashboard_post = async (req, res)=>{
    const { fname, lname, uname, email, password } = req.body;
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
module.exports.userAppointment_History_get = (req, res)=>{
    res.status(200).render('user/Appointment_History');
};
module.exports.userBook_Appointment_get = (req, res)=>{
    res.status(200).render('user/Book_Appointment');
};
module.exports.userRecords_get = (req, res)=>{
    res.status(200).render('user/Records');
};
module.exports.userProfile_get = (req, res)=>{
    res.status(200).render('user/profile');
};
module.exports.userLogout_get = (req, res) => {          
    res.cookie('clogin','',{ maxAge: 1 });
    res.redirect('/home/login'); 
};
