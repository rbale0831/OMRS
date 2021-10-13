const express = require('express');
const infoPageController = require('../controllers/infoPageController');

const router = express.Router();

router.get('/', infoPageController.index_get);
router.get('/signup', infoPageController.userSignup_get);
router.post('/signup', infoPageController.userSignup_post);
router.get('/login', infoPageController.userLogin_get);
router.post('/login', infoPageController.userLogin_post);

module.exports = router; 
