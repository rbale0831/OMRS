const express = require('express')
const { checkUser } = require('../middleware/authMiddleware')
const { 
    userDashboard_get,
    userAppointment_History_get,
    userBook_Appointment_get,
    userRecords_get,
    userProfile_get,
    userChangePassword_get,
    userChangePassword_put,
    userEditProfile_get,
    userEditProfile_put,
    userLogout_get
} = require('../controllers/userController');

const router = express.Router(); 

router.use('*', checkUser);

router.get('/dashboard', userDashboard_get);
// router.post('/dashboard', userDashboard_post);
router.get('/appointment_history', userAppointment_History_get);
router.get('/book_appointment', userBook_Appointment_get);
router.get('/records', userRecords_get);
router.get('/profile', userProfile_get);
router.get('/changePassword/:id', userChangePassword_get);
router.put('/changePassword/:id', userChangePassword_put);
router.get('/editProfile/:id', userEditProfile_get);
router.put('/editProfile/:id', userEditProfile_put);
router.get('/logout', userLogout_get);

module.exports = router;