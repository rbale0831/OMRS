


module.exports.userDashboard_get = (req, res)=>{
    res.status(200).render('user/index');
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
