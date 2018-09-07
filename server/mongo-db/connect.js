let Log = require('log');
let logger = new Log();
function Connection(mongoose) {
    this.mongoose = mongoose;
}

module.exports = Connection;

Connection.prototype.init = function(resolve, reject) {
     console.log('Inside connection');
    _connect(this.mongoose, resolve, reject);
    this.mongoose.connection.on('error', error => {
        throw error;
    });
    this.mongoose.connection.on('disconnected', () => {
        logger.error('MongoDB Disconnected');
        setTimeout(_connect, 5000);
    });
}

function _connect(mongoose, resolve, reject) {
    const options = {
        useNewUrlParser: true,
        keepAlive: true, 
        connectTimeoutMS: 30000,
        reconnectTries: Number.MAX_VALUE
    };


    
    mongoose.connect('mongodb://localhost:27017/econtentdb', options, function(error) {
        if(error) {
            logger.error('Error in Connecting to MongoDB');
            throw error;
        }
        else {
            logger.info('Successfully connected to MongoDB');
            var obj ={message:"success"};
            resolve(obj);
        }
    });
}
