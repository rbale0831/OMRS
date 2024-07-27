const express = require('express');
const { hospitalAuth  , checkHospital } = require('../middleware/authMiddleware');
const { 
    hospitalSignup_get,
    hospitalSignup_post,
    hospitalLogin_get,
    hospitalLogin_post, 
    hospitalDashboard_get,
    hospitalListPatientDetails_get,
    hospitalAddListPatientDetails_get,
    hospitalListSinglePatientDetails_get,
    hospitalPaitentVistedEntry_get,
    hospitalProfile_get,
    hospitalLogout_get 
} = require('../controllers/hospitalController')

const router = express.Router(); 

router.get('/signup', hospitalSignup_get);
router.post('/signup', hospitalSignup_post);
router.get('/login', hospitalLogin_get);
router.post('/login', hospitalLogin_post);
router.get('/dashboard', [ hospitalAuth, checkHospital ], hospitalDashboard_get);
router.get('/listPatientDetails', [ hospitalAuth, checkHospital ],hospitalListPatientDetails_get);
router.get('/addPatientDetails', [ hospitalAuth, checkHospital ], hospitalAddListPatientDetails_get);
router.get('/listSinglePatientDetails/:id', [ hospitalAuth, checkHospital ],  hospitalListSinglePatientDetails_get);
router.get('/paitentVistedEntry', [ hospitalAuth, checkHospital ], hospitalPaitentVistedEntry_get);
router.get('/profile', [ hospitalAuth, checkHospital ], hospitalProfile_get);
router.get('/logout', [ hospitalAuth, checkHospital ], hospitalLogout_get); 

module.exports = router;