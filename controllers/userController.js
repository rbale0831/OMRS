const User = require("../models/User");
const multer = require('multer');
const path = require('path')
const bcrypt = require('bcryptjs');
const Joi = require('joi')


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round( Math.random() * 1e9 )}${path.extname(file.originalname)}`;
      cb(null, uniqueName)
  }
})

const handleMultipartData = multer({ storage }).single('cp')


 module.exports.userDashboard_get =  (req, res) => {
    res.status(200).render('user/index', { title: 'Profile' })
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
module.exports.userChangePassword_get = (req, res) => {
  res.status(200).render("user/changePassword", { title: "Change Password" });
};
module.exports.userChangePassword_put = async (req, res) => {
  const id = req.params.id

  const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('newPassword')

  })
  const { error } = changePasswordSchema.validate(req.body);
        
  if (error){
      return next(error)
  }
  const { oldPassword, newPassword } = (req.body)

  try{
    const user = await User.findById({ _id: id})
    // console.log(user)
    if( await bcrypt.compare(oldPassword, user.password)){
        const salt = await bcrypt.genSalt()
        newHashedPassword = bcrypt.hashSync(newPassword, salt)
        await User.findOneAndUpdate({ _id: id }, { $set: {
          password: newHashedPassword
        }})
        res.status(201).json({ status: "Password Updated Sucessfully" })
      }else{
        throw Error("Password Entered didn't match with Old Password")
      }
  }catch(err){
    throw Error("User not found")
  }
  
  
};
module.exports.userEditProfile_get = (req, res) => {
  const id = req.params.id
  User.findOne({ _id: id })
      .then((user) => {
        res.status(200).render("user/editProfile", { title: "Edit Profile", token: req.cookies.clogin, user });
      })
      .catch((err) => {});
  
};
module.exports.userEditProfile_put = (req, res) => { 

  const id = req.params.id
  
  handleMultipartData(req,res, async (err)=> {

    const { fname, mname, lname, occupation, age, bg, gender, dob, lan, hadd, city, loc, state, pincode, cno } = req.body;

    let filePath;
    if(req.file){
        filePath = req.file.path;
    }

    let updateUser;
    try{ 

      updateUser = await User.findOneAndUpdate({ _id: id}, { $set : { 
      fname,
      mname,
      lname,
      occupation, 
      age,
      bg,
      gender,
      dob,
      lan,
      ...(req.file && { cp: filePath}),
      hadd,
      city,
      loc,
      state,
      pincode, 
      cno
     }},{ new: true })
  }
  catch (err){
    throw err
  }
  res.status(201).json({ updateUser });
  })
}

module.exports.userLogout_get = (req, res) => {
  res.cookie("clogin", "", { maxAge: 1 });
  res.redirect("/home/login");
};
