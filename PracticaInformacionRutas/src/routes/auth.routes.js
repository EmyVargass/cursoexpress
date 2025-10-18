const express = require('express');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await service.getUser(email, password);
      const tokenData = service.signToken(user);
      res.json(tokenData);
    } catch (error) {
      // For authentication errors, it's better to send a 401 Unauthorized status
      res.status(401).json({ error: error.message });
    }
  }
);

module.exports = router;
