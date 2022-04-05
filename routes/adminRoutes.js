const express = require('express');
const {
    adminSignup_get,
    adminSignup_post,
    adminLogin_get,
    adminLogin_post,
    adminDashboard_get,
    adminListPaitents,
    adminProfile_get,
    adminLogout_get
} = require('../controllers/adminController');
const { adminAuth, checkAdmin } = require('../middleware/authMiddleware');

const router = express.Router(); 

router.get('/signup', adminSignup_get );
router.post('/signup', adminSignup_post);
router.get('/login', adminLogin_get);
router.post('/login',  adminLogin_post);
router.get('/dashboard', [adminAuth,  checkAdmin], adminDashboard_get);
router.get('/listPaitents', [adminAuth, checkAdmin], adminListPaitents);
router.get('/profile', [adminAuth, checkAdmin], adminProfile_get);
router.get('/logout', [adminAuth, checkAdmin], adminLogout_get); 

module.exports = router;