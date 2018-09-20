var express = require('express');
var router = new express.Router();
var AccountController = require('./controller');
var accountObject = new AccountController();

router.post('/register', accountObject.register);

module.exports = router;