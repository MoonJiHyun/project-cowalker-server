const express = require('express');
const router = express.Router();

//user
const user = require('./user/user_routes');
router.use('/', user);

module.exports = router;
