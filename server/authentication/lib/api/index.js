var express = require('express');
var RegisterRouter = express.Router();
var register = require('./register');
RegisterRouter.use('/api', register);
module.exports = RegisterRouter;