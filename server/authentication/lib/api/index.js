let express = require('express');
let RegisterRouter = new express.Router();
let register = require('./register');
let verify = require('./verify');
let login = require('./login');
RegisterRouter.use('/api', register);
RegisterRouter.use('/api/verify', verify);
RegisterRouter.use('/api/credentials', login);
module.exports = RegisterRouter;