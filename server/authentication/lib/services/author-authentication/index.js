let Authentication = require('../authentication/index');

function AuthorAuthentication(payload) {
    Authentication.call(this, 'Author-Account', payload);
}

AuthorAuthentication.prototype = Object.create(Authentication.prototype);
module.exports = AuthorAuthentication;
