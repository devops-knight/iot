const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_pctl = require('../controllers/user_op');


router.get('/signup', user_pctl.user_signup);

router.post('/create-user', user_pctl.create_user);

router.get('/signin',user_pctl.create_signin);

router.get('/profile',passport.checkAuthentication,user_pctl.profile);

router.post('/profile-update/:id',user_pctl.update_profile);

router.get('/dashboard',passport.checkAuthentication,user_pctl.dashboard);

router.post('/create-device',passport.checkAuthentication,user_pctl.create_device);

router.get('/delete-device/:id',passport.checkAuthentication,user_pctl.delete_device);

router.post('/create-relay/:id',passport.checkAuthentication,user_pctl.create_relay);

router.get('/delete-relay/:id',passport.checkAuthentication,user_pctl.delete_relay);

router.get('/update-relay/:id',user_pctl.update_relay);

router.get('/error/:id',user_pctl.error);
//use passport as a middleware to authenticate

router.post('/create-session', passport.authenticate(
    'local',
    {successRedirect: '/user/dashboard',failureRedirect: '/user/signup',
    failureFlash: true},
)
,user_pctl.create_session );

router.get('/end-session', user_pctl.end_session);

module.exports = router;