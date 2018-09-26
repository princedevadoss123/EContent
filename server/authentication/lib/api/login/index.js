var express = require('express');
var router = new express.Router();
var LoginController = require('./controller');
var loginController = new LoginController();
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
const app = express();
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
   
    // handle CSRF token errors here
    res.status(403);
    res.send('Invalid CSRF Token');
  });

router.post('/login', loginController.login);

module.exports = router;