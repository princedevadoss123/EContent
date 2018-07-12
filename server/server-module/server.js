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
    spdy
        .createServer(options, this.app)
        .listen(this.port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + this.port + '.')
        }
    });
}


