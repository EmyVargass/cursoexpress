const express = require('express');

function createAuthRouter(authService) {
    const router = express.Router();

    router.post('/login',
      async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const user = await authService.getUser(email, password);
          const tokenData = authService.signToken(user);
          res.json(tokenData);
        } catch (error) {
          // For authentication errors, it's better to send a 401 Unauthorized status
          res.status(401).json({ error: error.message });
        }
      }
    );

    return router;
}

module.exports = createAuthRouter;
