const express = require('express');
const router = express.Router();

//user
const user = require('./controller/user/user_routes');
router.use('/', user);

//application
const application = require('./controller/application/application_routes');
router.use('/', application);

module.exports = router;
