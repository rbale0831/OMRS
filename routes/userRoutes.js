const express = require('express');
const userController = require('../controllers/userController');
const { checkUser } = require('../middleware/authMiddleware')

const router = express.Router(); 

router.use('*', checkUser);

router.get('/dashboard', userController.userDashboard_get);
router.get('/appointment_history', userController.userAppointment_History_get);
router.get('/book_appointment', userController.userBook_Appointment_get);
router.get('/records', userController.userRecords_get);
router.get('/profile', userController.userProfile_get);
router.get('/logout', userController.userLogout_get);

module.exports = router;