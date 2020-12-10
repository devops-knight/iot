const express = require('express');
const router = express.Router();
const user_pctl = require('../controllers/user_op');

router.get('/signup', user_pctl.user_signup);

router.post('/create-user', user_pctl.create_user);

router.post('/create-session',user_pctl.create_session);

router.get('/profile',user_pctl.profile);

module.exports = router;