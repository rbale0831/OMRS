const express = require('express');
const userController = require('../controllers/userController');
const { checkUser } = require('../middleware/authMiddleware')

const router = express.Router(); 

router.use('*', checkUser);

router.get('/dashboard', userController.userDashboard_get);
// router.post('/dashboard', userController.userDashboard_post);
router.get('/appointment_history', userController.userAppointment_History_get);
router.get('/book_appointment', userController.userBook_Appointment_get);
router.get('/records', userController.userRecords_get);
router.get('/profile', userController.userProfile_get);
router.get('/changePassword/:id', userController.userChangePassword_get);
router.put('/changePassword/:id', userController.userChangePassword_put);
router.get('/editProfile/:id', userController.userEditProfile_get);
router.put('/editProfile/:id', userController.userEditProfile_put);
router.get('/logout', userController.userLogout_get);

module.exports = router;