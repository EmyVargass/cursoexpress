const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./UserService');

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    // This should be in a config file
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret);
    return { user, token };
  }
}

module.exports = AuthService;
