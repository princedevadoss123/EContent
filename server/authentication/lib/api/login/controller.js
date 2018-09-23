let AuthService = require('../../services/authentication');
function LoginController() {
}

module.exports = LoginController;

LoginController.prototype.login = _login;

function _login(request, response) {
    let payload = {
        email: request.body.emailId,
        password: request.body.password
    };
    let authService = new AuthService(undefined, payload);
    authService.loginService()
    .then(function(accountHolder) {
        response.cookie('userSession', accountHolder, { maxAge: 900000, httpOnly: true });
        response.send(200);
    })
    .catch(function(error) {
        response.send(error);
    });

}