const express = require('express');
const home = require('../controllers/home');
const router = express.Router();
const home_ctl = require('../controllers/home');

var nav_array = {'Home': '/' , 'Blog': 'blog' , 'tools': 'tools' , 'Why Choose Us!': 'why' , 'Contact Us': 'contact'};

router.get('/', home_ctl.home);
router.get('/illustration', home_ctl.Illustration);
router.get('/tools',home_ctl.tools);
router.use('/user', require('./user'));
router.use('/contact', require('./contact'));


module.exports = router;