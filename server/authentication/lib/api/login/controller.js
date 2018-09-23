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
        let cookieContent = {
            email: request.body.emailId,
            role: accountHolder.role
        }
        response.cookie('userSession', request.body.emailId, { maxAge: 900000, httpOnly: true });
        response.cookie('userRole', accountHolder.role, { maxAge: 900000, httpOnly: true });
        response.send(accountHolder);
    })
    .catch(function(error) {
        response.send(error);
    });

}