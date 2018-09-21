let Authentication = require('../authentication/index');
var ClientRS = require('../../../../client-module/client');

function AuthorAuthentication(payload) {
    Authentication.call(this, 'Author-Account', payload);
}

module.exports = AuthorAuthentication;

AuthorAuthentication.prototype = Object.create(Authentication.prototype);
AuthorAuthentication.prototype.checkAuthorCredentials = _checkAuthorCredentials;

function _checkAuthorCredentials(emailId, authorId) {
    return new Promise((resolve, reject) => {
        let os = require( 'os' );
        let networkInterfaces = os.networkInterfaces();
        let client = new ClientRS(networkInterfaces.en0[1].address, '3504', '/author?id=' + authorId +'&email=' + emailId, process.env.AUTHOR_BEARER_TOKEN);
        client.getValue(function(returnData) {
            let isAuthor = JSON.parse(returnData);
            if(isAuthor.message === 'success') {
                resolve('success');
            }
            else {
                reject({message : 'Author ID is invalid'});
            }
        });
    });
}