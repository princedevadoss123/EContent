let AuthService = require('../../services/authentication');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
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
        var token = request.csrfToken();
        response.cookie('XSRF-TOKEN', token, { maxAge: 900000, httpOnly: false });
        logger.info(token);
        console.log(token);
        response.send(200);
    })
    .catch(function(error) {
        response.send(error);
    });

}