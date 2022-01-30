const User = require('../models/User');


module.exports.userDashboard_get = (req, res)=>{
    res.status(200).render('user/index', { title: 'Profile' });
};
module.exports.userAppointment_History_get = (req, res)=>{
    res.status(200).render('user/Appointment_History', { title: 'Appointment History' });
};
module.exports.userBook_Appointment_get = (req, res)=>{
    res.status(200).render('user/Book_Appointment', { title: 'Book Appointment' });
};
module.exports.userRecords_get = (req, res)=>{
    res.status(200).render('user/Records', { title: 'Records' });
};
module.exports.userProfile_get = (req, res)=>{
    res.status(200).render('user/profile', { title: '' });
};
module.exports.userLogout_get = (req, res) => {          
    res.cookie('clogin','',{ maxAge: 1 });
    res.redirect('/home/login'); 
};
