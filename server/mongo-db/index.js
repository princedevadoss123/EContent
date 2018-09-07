var mongoose = require('mongoose');
var Connection = require('./connect');
var mongooseWrapper = {
    init: function(resolve, reject) {
        connection = new Connection(mongoose).init(resolve, reject);
    },
    shutdown: function() {
        mongoose.disconnect();
    },
    getConnection: function() {
        return mongoose.connection;
    }
}

module.exports = mongooseWrapper;
