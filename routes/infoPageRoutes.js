const express = require('express');
const { 
    index_get,
    userSignup_get,
    userSignup_post,
    userLogin_get,
    userLogin_post
} = require('../controllers/infoPageController');

const router = express.Router();

router.get('/', index_get);
router.get('/signup', userSignup_get);
router.post('/signup', userSignup_post);
router.get('/login', userLogin_get);
router.post('/login', userLogin_post);

module.exports = router; 
