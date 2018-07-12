const fs = require('fs');

function FileHandler() {
    if (!(this instanceof FileHandler)) {
        return new FileHandler();
    }
}

module.exports = FileHandler;

FileHandler.prototype.readFile = function(filePath) {
    return fs.readFileSync(filePath);
}