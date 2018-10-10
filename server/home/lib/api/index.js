let express = require('express');
let HomeRouter = new express.Router();
let auth = require('./checkauth');
HomeRouter.use('/home', auth);
module.exports = HomeRouter;