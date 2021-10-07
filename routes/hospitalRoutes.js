const express = require('express');
const hospitalController = require('../controllers/hospitalController');



const router = express.Router();

router.get('/dashboard', hospitalController.index_get);
router.get('/signup', hospitalController.hospitalSignup_get);
router.post('/signup', hospitalController.hospitalSignup_post);
router.get('/login', hospitalController.hospitalLogin_get);
router.post('/login', hospitalController.hospitalLogin_post);

module.exports = router;
