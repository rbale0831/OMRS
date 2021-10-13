const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const token = req.cookies.clogin
    
    // check json web token exists & is verified
    if(token){
        jwt.verify(token, 'omrs meridan', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/home/login');
            }
            else{
                console.log(decodedToken);
                next();
            };
        });
    }
    else{
        res.redirect('/home/login');
    };
};
const hospitalAuth = (req, res, next) => {
    const token = req.cookies.hlogin
    
    // check json web token exists & is verified
    if(token){
        jwt.verify(token, 'omrs meridan hospital', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/hospital/login');
            }
            else{
                console.log(decodedToken);
                next();
            };
        });
    }
    else{
        res.redirect('/hospital/login');
    };
};
const adminAuth = (req, res, next) => {
    const token = req.cookies.alogin
    
    // check json web token exists & is verified
    if(token){
        jwt.verify(token, 'omrs meridan admin', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/admin/login');
            }
            else{
                console.log(decodedToken);
                next();
            };
        });
    }
    else{
        res.redirect('/admin/login');
    };
};

// const checkUser = async (req, res, next) =>{
//     const token = req.cookies.clogin

//     if (token){
//         jwt.verify(token, 'omrs meridan', (err, decodedToken)=>{
//             if(err){
//                 res.locals.user = null;
//                 next();
//             }
//             else{
//                 let user = await User.findById(decodedToken.id);
//                 res.locals.user = user;
//                 next();
//             };
//         });
//     }
//     else{
//         res.locals.user = null;
//     }
// }
// const checkHospital = async (req, res, next) =>{
//     const token = req.cookies.hlogin

//     if (token){
//         jwt.verify(token, 'omrs meridan hospital', (err, decodedToken)=>{
//             if(err){
//                 res.locals.hospital = null;
//                 next();
//             }
//             else{
//                 let hospital = await Hospital.findById(decodedToken.id);
//                 res.locals.hospital = hospital;
//                 next();
//             };
//         });
//     }
//     else{
//         res.locals.hospital = null;
//     }
// }
// const checkAdmin = async (req, res, next) =>{
//     const token = req.cookies.alogin

//     if (token){
//         jwt.verify(token, 'omrs meridan admin', (err, decodedToken)=>{
//             if(err){
//                 res.locals.admin = null;
//                 next();
//             }
//             else{
//                 let admin = await Admin.findById(decodedToken.id);
//                 res.locals.admin = admin;
//                 next();
//             };
//         });
//     }
//     else{
//         res.locals.admin = null;
//     }
// }

module.exports = { userAuth, hospitalAuth, adminAuth/*, checkUser, checkHospital, checkAdmin */};
