let AuthorAuthService = require('../../services/author-authentication/index');
let UserAuthService = require('../../services/user-authentication/index');

function registerController() { }

module.exports = registerController;

let authorService, userService;
registerController.prototype.register = function (request, response) {
    let payload = { 
        userName: request.body.userName,
        emailId: request.body.emailId,
        phoneNumber: request.body.phoneNumber,
        verified: false
    };
    if(request.body.authorId) {
        payload['authorId'] = request.body.authorId;
        authorService = new AuthorAuthService(payload)
        authorService.register(request).then(function(result) {
            response.send(result);
        })
        .catch(function(error) {
            response.send(error);
        });
    }
    else {
        userService = new UserAuthService(payload);
        userService.register(request).then(function(result) {
            response.send(result);
        })
        .catch(function(error) {
            response.send(error);
        });
    }
}