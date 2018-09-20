var express = require('express');
var router = express.Router();
var VerifyController = require('./controller');
var verifier = new VerifyController();
router.get('/email', verifier.emailVerify);

module.exports = router;