var https = require('https');
var fs = require('fs');
let Log = require('log');
let logger = new Log();

function ClientRS(host, port, path)
{
    this.host = host;
    this.port = port;
    this.path = path;
 };

module.exports = ClientRS;

ClientRS.prototype.getValue = function(callback)
{
    var retVal='';
    var options = {
            host : this.host,
            port : this.port,
            path : this.path,
            method: 'GET',
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                Authorization: ' Bearer '+ process.env.CARD_BEARER_TOKEN
            }  
    };

    var req = https.request(options, function(res) {
            logger.info('Connecting to Payment Gateway....');
            res.on('data', function(chunk) {
                retVal += chunk;
            });
            res.on('end', function() {
                if (callback !== undefined)
                    callback(retVal);
            });
    });

    req.end();
};
