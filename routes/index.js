const express = require('express');
const home = require('../controllers/home');
const router = express.Router();
const home_ctl = require('../controllers/home');

router.get('/', home_ctl.home);
router.use('/user', require('./user'));


module.exports = router;