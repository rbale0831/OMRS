const UserProfile = require("../models/UserProfile")
const User = require("../models/User");
const multer = require('multer');

// create json web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'omrs meridan',{
        expiresIn: maxAge
    });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round( Math.random() * 1e9 )}${path.extname(file.originalname)}`;
      cb(null, uniqueName)
  }
})

const handleMultipartData = multer({ storage}).single('image')


 module.exports.userDashboard_get =  (req, res) => {

    res.status(200).render('user/index', { title: 'Profile' })
};
// module.exports.userDashboard_post = async (req, res) => {
//   const { fname, lname, email } = req.body;
//     try{
//         const profile  = await  UserProfile.create({fname , lname  , email})
//         res.status(201).json(profile)
//     }
//     catch(err){
//         console.log(err)
//     }

// };
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
// module.exports.userEditProfile_put =  async (req, res) => {
//   const { fname, mname, lname, occupation, age, bg, gender, dob, lan, cp, hadd, city, loc, state, pincode, cno } = req.body;
  
//   const id = req.params.id
//   handleMultipartData  (req, res, async (err) =>{
    
//     let filePath;
//     if(req.file){
//         filePath = req.file.path;
//     }

//     let updateUser;
//     try{ 
//       updateUser = await User.findOneAndUpdate({ _id: id}, { $set : { 
//         fname,
//         mname, 
//         lname, 
//         occupation, 
//         age, 
//         bg, 
//         gender, 
//         dob,
//         lan,
//         ...(req.file && { cp: filePath}),
//         hadd, 
//         city, 
//         loc, 
//         state, 
//         pincode, 
//         cno
//        }})
//     }
//     catch (err){
//       throw err
//     }
//     res.status(201).json({ user: updateUser });
//   })
// }
module.exports.userEditProfile_put = /*handleMultipartData,*/ async (req, res) => {
  const { fname, mname, lname, occupation, age, bg, gender, dob, lan, cp, hadd, city, loc, state, pincode, cno } = req.body;
  
  const id = req.params.id
    
    // let filePath;
    // if(req.file){
    //     filePath = req.file.path;
    // }

    try{ 
      const updateUser = await User.findOneAndUpdate({ _id: id}, { $set : { 
        fname,
        mname, 
        lname, 
        occupation, 
        age, 
        bg, 
        gender, 
        dob,
        lan,
        // ...(req.file && { cp: filePath}),
        hadd, 
        city, 
        loc, 
        state, 
        pincode, 
        cno
       }},{ new: true })
       res.status(201).json({ user: updateUser });
    }
    catch (err){
      throw err
    }
    
  
}

module.exports.userLogout_get = (req, res) => {
  res.cookie("clogin", "", { maxAge: 1 });
  res.redirect("/home/login");
};
