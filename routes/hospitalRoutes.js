const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const { hospitalAuth  , checkHospital } = require('../middleware/authMiddleware');



const router = express.Router(); 


router.get('/signup', hospitalController.hospitalSignup_get);
router.post('/signup', hospitalController.hospitalSignup_post);
router.get('/login', hospitalController.hospitalLogin_get);
router.post('/login', hospitalController.hospitalLogin_post);
router.get('/dashboard', hospitalAuth, checkHospital, hospitalController.hospitalDashboard_get);
router.get('/addPatientDetails', hospitalAuth, checkHospital,hospitalController.hospitalAddPatientDetails_get);
router.get('/profile', hospitalAuth, checkHospital,hospitalController.hospitalProfile_get);
router.get('/logout', hospitalAuth, checkHospital, hospitalController.hospitalLogout_get); 



module.exports = router;
