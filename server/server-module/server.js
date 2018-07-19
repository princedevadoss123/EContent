const spdy = require('spdy');
const FileHandler = require('../service/file-operations');
let Log = require('log');
let logger = new Log();


//Set Port
function Server(port, app) {
    this.port = process.env.PORT || port;
    this.app = app;
    this.app.set('port', this.port);
}

module.exports = Server;

//Creating Http Servers
Server.prototype.createServer = function() {
    const fileHandler = new FileHandler();
    let options = _addCertificates(fileHandler);
    options.spdy = {};
    options.spdy.protocols = _addProtocols();
    options.spdy.plain = false;
    options.spdy.connection = {
        windowSize: 1024 * 1024,
        autoSpdy31: false
    }
    this.server = spdy.createServer(options, this.app);
    this.listenServer();
}

Server.prototype.listenServer = function() {
    this.server.listen(this.port, (error) => {
        if (error) {
            logger.error(error);
            return process.exit(1)
        } else {
            logger.info('Listening on port %s', this.port);
        }
    });
}

Server.prototype.stopServer = function() {
    if(this.server.getMaxListeners() > 0) {
        this.server.removeAllListeners();
    }
}

function _addCertificates(fileHandler) {
    return {
        key: fileHandler.readFile('server/server-module/https-keys/server.key'),
        cert:  fileHandler.readFile('server/server-module/https-keys/server.crt')
    }
}

function _addProtocols() {
    return ['h2', 'spdy/3.1'];
}
