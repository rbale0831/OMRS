const UserProfile = require("../models/UserProfile")
const User = require("../models/User");

// create json web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'omrs meridan',{
        expiresIn: maxAge
    });
};

 module.exports.userDashboard_get =  (req, res) => {

    res.status(200).render('user/index', { title: 'Profile' })
};
module.exports.userDashboard_post = async (req, res) => {
  const { fname, lname, email } = req.body;
    try{
        const profile  = await  UserProfile.create({fname , lname  , email})
        res.status(201).json(profile)
    }
    catch(err){
        console.log(err)
    }

};
module.exports.userAppointment_History_get = (req, res) => {
  res
    .status(200)
    .render("user/Appointment_History", { title: "Appointment History" });
};
module.exports.userBook_Appointment_get = (req, res) => {
  res
    .status(200)
    .render("user/Book_Appointment", { title: "Book Appointment" });
};
module.exports.userRecords_get = (req, res) => {
  res.status(200).render("user/Records", { title: "Records" });
};
module.exports.userProfile_get = (req, res) => {
  res.status(200).render("user/profile", { title: "" });
};
module.exports.userChangePassword_get = (req, res) => {
  res.status(200).render("user/changePassword", { title: "Change Password" });
};
module.exports.userEditProfile_get = (req, res) => {
  res.status(200).render("user/editProfile", { title: "Edit Profile" });
};
module.exports.userEditProfile_put = async (req, res) => {
  const { fname, mname, lname, uname, email, occupation, age, bg, gender, dob, lan, cp, hadd, city, loc, state, pincode, cno } = req.body;
  const id = req.params._id

  try{
    /* const profile  = await  UserProfile.create({fname , lname  , email}) */
    const updateUser = await User.updateOne({ _id: id }, { fname, mname, lname, uname, email, occupation, age, bg, gender, dob, lan, cp, hadd, city, loc, state, pincode, cno })
    const token = createToken(updateUser._id);
    res.cookie('csign', token, { httpOnly: true, maxAge: maxAge * 3 });
    res.status(201).json({ user: updateUser._id });
    
  }
  catch (err){
    throw err
  }
}

module.exports.userLogout_get = (req, res) => {
  res.cookie("clogin", "", { maxAge: 1 });
  res.redirect("/home/login");
};
