let AuthorAuthService = require('../../services/author-authentication/index');
let UserAuthService = require('../../services/user-authentication/index');

function registerController() { }

module.exports = registerController;

let authorService, userService;
registerController.prototype.register = function (request, response) {
    if(request.body.authorId) {
        authorService = new AuthorAuthService().register(request);
    }
    else {
        let payload = { 
            userName: request.body.userName,
            emailId: request.body.emailId,
            phoneNumber: request.body.phoneNumber,
            verified: false
        };
        userService = new UserAuthService(request, payload);
        userService.register(request).then(function(result) {
            response.send(result);
        })
        .catch(function(error) {
            response.send(error);
        });
    }
}