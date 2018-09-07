var express = require('express');
var router = express.Router();
var AccountController = require('./controller');
var accountObject = new AccountController();
router.post('', accountObject.register);

module.exports = router;