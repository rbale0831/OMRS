const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const { hospitalAuth } = require('../middleware/authMiddleware');



const router = express.Router(); 

router.get('/dashboard', hospitalController.index_get);
router.get('/signup', hospitalController.hospitalSignup_get);
router.post('/signup', hospitalController.hospitalSignup_post);
router.get('/login', hospitalController.hospitalLogin_get);
router.post('/login', hospitalController.hospitalLogin_post);
router.get('/dashboard', hospitalAuth, hospitalController.hospitalDashboard_get);
router.get('/addPatientDetails', hospitalAuth, hospitalController.hospitalAddPatientDetails_get);
router.get('/profile', hospitalAuth, hospitalController.hospitalProfile_get);
router.get('/logout', hospitalAuth, hospitalController.hospitalLogout_get); 



module.exports = router;
