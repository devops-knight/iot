const express = require('express');
const router = express.Router();
const user_pctl = require('../controllers/user_profile');

router.get('/profile', user_pctl.user_profile);

module.exports = router;