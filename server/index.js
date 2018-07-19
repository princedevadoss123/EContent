const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server-module/server');
const app = express();
const bearerToken = require('express-bearer-token');
let Log = require('log');
let logger = new Log();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Bearer token storage
app.use(bearerToken());

//Status monitor
app.use(require('express-status-monitor')());

// Angular DIST output folder
app.use(express.static('./dist'));

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
    response.send('docs');
});

// Send all other requests to the Angular app
app.get('*', (request, response) => {
    response.sendFile('index.html', {root: './dist'});
});

new Server(3001, app).createServer();