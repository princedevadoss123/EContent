var passportJWT = require("passport-jwt");

module.exports = async function setJwtStrategy(cookieRequestExtractor) {
  var ExtractJwt = passportJWT.ExtractJwt;
  var JwtStrategy = passportJWT.Strategy;

  var jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromExtractors([cookieRequestExtractor]);
  jwtOptions.secretOrKey = process.env.JWT_SECRET;

  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    var user = jwt_payload.sub;
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

  return strategy;
}