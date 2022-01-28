const express = require('express');
const adminController = require('../controllers/adminController');
const { adminAuth, checkAdmin } = require('../middleware/authMiddleware');


const router = express.Router(); 

// router.get('/dashboard', adminController.index_get);
router.get('/signup', adminController.adminSignup_get );
router.post('/signup', adminController.adminSignup_post);
router.get('/login', adminController.adminLogin_get);
router.post('/login',  adminController.adminLogin_post);
router.get('/dashboard', adminAuth,  checkAdmin, adminController.adminDashboard_get);
router.get('/listPaitents', adminAuth, checkAdmin, adminController.adminListPaitents);
router.get('/profile', adminAuth, checkAdmin, adminController.adminProfile_get);
router.get('/logout', adminAuth, checkAdmin,adminController.adminLogout_get); 

module.exports = router;
