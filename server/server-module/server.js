const spdy = require('spdy');

//Set Port
function Server(port, app) {
    this.port = process.env.PORT || port;
    this.app = app;
    this.app.set('port', this.port);
}

module.exports = Server;

//Creating Http Servers
Server.prototype.createServer = function(options) {
    this.server = spdy.createServer(options, this.app);
    this.listenServer();
}

Server.prototype.listenServer = function() {
    this.server.listen(this.port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + this.port + '.')
        }
    });
}

Server.prototype.stopServer = function() {
    if(this.server.getMaxListeners() > 0) {
        this.server.removeAllListeners();
    }
}
