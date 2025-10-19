const express = require('express');
const AuthController = require('../controllers/auth.controller');

function createAuthRouter(authService) {
    const router = express.Router();
    const authController = new AuthController(authService);

    router.post('/login',
      authController.login.bind(authController)
    );

    return router;
}

module.exports = createAuthRouter;
