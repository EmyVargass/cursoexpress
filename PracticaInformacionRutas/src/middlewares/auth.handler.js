const passport = require('passport');

function checkApiKey(req, res, next) {
  // This is a placeholder for a real API key validation
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  }
}

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = { jwtAuth, checkRoles, checkApiKey };
