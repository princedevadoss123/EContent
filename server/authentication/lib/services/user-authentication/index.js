let Authentication = require('../authentication/index');

function UserAuthentication(request, payload) {
    Authentication.call(this, 'User-Account', payload);
}

UserAuthentication.prototype = Object.create(Authentication.prototype);

module.exports = UserAuthentication;
