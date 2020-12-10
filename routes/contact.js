const express = require('express');
const router = express.Router();
const user_pctl = require('../controllers/contact');

router.get('/', user_pctl.contact);
router.post('/contact-request',user_pctl.contact_request);

module.exports = router;


