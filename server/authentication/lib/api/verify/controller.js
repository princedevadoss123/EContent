let AuthorAuthService = require('../../services/author-authentication/index');
let UserAuthService = require('../../services/user-authentication/index');

function VerifyController() {
}

module.exports = VerifyController;

VerifyController.prototype.emailVerify = _emailVerify;

function _emailVerify(request, response) {
    let payload = {
        emailId: request.query.id
    };
    let accountAuthorId = request.query.authorId;
    if(accountAuthorId) {

    }
    else {
        userService = new UserAuthService(payload);
        userService.emailVerify(request).then(function(result) {
            response.send(result);
        })
        .catch(function(error) {
            response.send(error);
        });
    }
}