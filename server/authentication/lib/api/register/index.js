var express = require('express');
var router = express.Router();
var AccountController = require('./controller');
var accountObject = new AccountController();
router.post('/register', accountObject.register);

module.exports = router;