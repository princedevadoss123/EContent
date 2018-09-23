const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server-module/server');
const app = express();
var cookieParser = require('cookie-parser');
const bearerToken = require('express-bearer-token');
let Log = require('log');
let logger = new Log();
var ClientRS = require('./client-module/client');
var dbWrapper = require('./mongo-db/index');
var authenticationProcess = require('./authentication/lib/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Handling cookies
app.use(cookieParser());

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

new Server(3001, app).createServer();