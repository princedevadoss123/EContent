let express = require('express');
let RegisterRouter = new express.Router();
let register = require('./register');
let verify = require('./verify');
RegisterRouter.use('/api', register);
RegisterRouter.use('/api/verify', verify);
module.exports = RegisterRouter;