const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

//signup
const signin = require('./signin');
router.use('/signin', signin);

module.exports = router;
