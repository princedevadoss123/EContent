const express = require('express');
const bodyParser = require('body-parser');
const Server = require('./server-module/server');
const FileHandler = require('./service/file-operations');
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

const fileHandler = new FileHandler();
const server = new Server(3001, app);
const options = {
    key: fileHandler.readFile('server/server-module/https-keys/server.key'),
    cert:  fileHandler.readFile('server/server-module/https-keys/server.crt')
}

server.createServer(options);