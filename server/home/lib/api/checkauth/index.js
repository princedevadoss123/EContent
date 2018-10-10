var express = require('express');
var passport = require('passport');
var router = new express.Router();
var AuthController = require('./controller');
var authController = new AuthController();

router.get('/auth',  passport.authenticate('jwt', { session: false }), authController.auth);

module.exports = router;