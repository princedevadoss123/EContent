function AuthController() {
}

module.exports = AuthController;

AuthController.prototype.auth = _auth;

function _auth(request, response) {
    if(request.user) {
        response.send(200);
    }
    else {
        response.send(401);
    }
}