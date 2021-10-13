


module.exports.userDashboard_get = (req, res)=>{
    res.status(200).render('user/dashboard');
};
module.exports.userProfile_get = (req, res)=>{
    res.status(200).render('user/profile');
};

module.exports.userLogout_get = (req, res) => {          
    res.cookie('clogin','',{ maxAge: 1 });
    res.redirect('/home/login'); 
};
