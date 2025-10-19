const express = require('express');

const createUserRouter = require('./UserRoutes');
const createAuthRouter = require('./auth.routes');

function routerApi(app, userService, authService) {
  const router = express.Router();
  app.use('/api/v1', router);

  const userRouter = createUserRouter(userService);
  const authRouter = createAuthRouter(authService);

  router.use('/usuarios', userRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
