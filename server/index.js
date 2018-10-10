const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
const Server = require('./server-module/server');
const app = express();
var cookieExtractor = require('./service/cookie-extractor');
var cookieParser = require('cookie-parser');
// var csrf = require('csurf');
const bearerToken = require('express-bearer-token');
let Log = require('log');
let logger = new Log();
var ClientRS = require('./client-module/client');
var dbWrapper = require('./mongo-db/index');
var authenticationProcess = require('./authentication/lib/api');
var homeProcess = require('./home/lib/api');
var passportJwtInitializer = require('./service/jwt-authenticator');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Jwt Initializer with passport
passportJwtInitializer(cookieExtractor)
    .then((strategy) => {
        passport.use(strategy);
        app.use(passport.initialize());
});

//Handling cookies
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
// app.use(function(req, res, next) {
//     console.log('Inside Token generation');
//     logger.info('Inside Token generation');
//     var token = req.csrfToken();
//     res.cookie('XSRF-TOKEN', token);
//     logger.info(token);
//     console.log(token);
//     next();
// });

// error handler
// app.use(function (err, req, res, next) {
//     if (err.code !== 'EBADCSRFTOKEN') return next(err)
   
//     // handle CSRF token errors here
//     res.status(403);
//     res.send('Invalid CSRF Token');
//   });

//Bearer token storage
app.use(bearerToken());

//Status monitor
app.use(require('express-status-monitor')());

// Angular DIST output folder
app.use(express.static('./dist'));

new Promise(function(resolve, reject){
    logger.info('Before DB wrapper');
    dbWrapper.init(resolve, reject);
    logger.info('After DB wrapper');
    
})
.then(function(data) {
      if(data){
        logger.info('Connection successful');
    }  
});


//Details of request
app.use(function(req, res, next) {
    logger.info('Type: %s', req.method);
    next();
}, function(req, res, next) {
    logger.info('Path: %s', req.path);
    next();
});

//Sample route
app.get('/hello', function(request,response){
    var os = require( 'os' );
    var networkInterfaces = os.networkInterfaces();
    let client = new ClientRS(networkInterfaces.en0[1].address, '3002', '/app/api/cardProcess');
    client.getValue(function(returnData) {
        response.send(returnData);
    });
});

app.use('/app', authenticationProcess);
app.use('/home', homeProcess);

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: './dist'});
});

new Server(3001, app).createServer();