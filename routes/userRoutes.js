const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router(); 

router.get('/dashboard', userController.userDashboard_get);
router.get('/profile', userController.userProfile_get);
router.get('/logout', userController.userLogout_get);

module.exports = router;