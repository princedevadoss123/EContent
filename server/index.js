const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server-module/server');
const app = express();
const bearerToken = require('express-bearer-token');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Bearer token storage
app.use(bearerToken());

// Angular DIST output folder
app.use(express.static('./dist'));

// Send all other requests to the Angular app
app.get('*', (request, response) => {
    response.sendFile('index.html', {root: './dist'});
});

new Server(3001, app).createServer();