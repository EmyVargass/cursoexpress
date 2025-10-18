const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserService = require('../../services/UserService');

const service = new UserService();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new Strategy(opts, async (payload, done) => {
  try {
    const user = await service.findOne(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));
