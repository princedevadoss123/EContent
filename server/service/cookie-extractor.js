module.exports = function cookieExtractor(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['userSession'];
    }
    return token;
}