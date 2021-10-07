const express = require('express');
const adminController = require('../controllers/adminController');


const router = express.Router();

router.get('/dashboard', adminController.index_get);
router.get('/signup', adminController.adminSignup_get );
router.post('/signup', adminController.adminSignup_post);
router.get('/login', adminController.adminLogin_get);
router.post('/login', adminController.adminLogin_post);

module.exports = router;
