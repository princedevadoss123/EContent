var express = require('express');
var router = new express.Router();
var LoginController = require('./controller');
var loginController = new LoginController();

router.post('/login', loginController.login);

module.exports = router;