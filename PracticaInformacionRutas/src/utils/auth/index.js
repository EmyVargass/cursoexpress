const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

function setupPassport(userService) {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    passport.use(new Strategy(opts, async (payload, done) => {
      try {
        const user = await userService.findOne(payload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }));
}

module.exports = setupPassport;
