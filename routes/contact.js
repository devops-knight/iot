const express = require('express');
const router = express.Router();
const user_pctl = require('../controllers/contact');

router.get('/', user_pctl.contact);
router.post('/contact-request',user_pctl.contact_request);
router.get('/Thankyou', user_pctl.Thankyou);
router.get('/contact-request',user_pctl.contact_detail);

module.exports = router;


