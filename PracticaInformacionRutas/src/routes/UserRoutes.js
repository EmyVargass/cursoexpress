// routes/UserRoutes.js

const express = require('express');
const UserController = require('../controllers/user.controller');
const validatorHandler = require('../middlewares/validator.handler');
const { jwtAuth, checkRoles } = require('../middlewares/auth.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../validators/user.validator');

function createUserRouter(userService) {
    const router = express.Router();
    const userController = new UserController(userService);

    router.post('/', 
        validatorHandler(createUserSchema, 'body'),
        userController.createUser.bind(userController)
    );

    router.get('/', 
        jwtAuth,
        checkRoles('admin'),
        userController.getUsers.bind(userController)
    );

    router.get('/:id', 
        validatorHandler(getUserSchema, 'params'),
        userController.getUser.bind(userController)
    );

    router.put('/:id', 
        jwtAuth, 
        validatorHandler(getUserSchema, 'params'),
        validatorHandler(updateUserSchema, 'body'),
        userController.updateUser.bind(userController)
    );

    router.delete('/:id', 
        jwtAuth,
        checkRoles('admin'),
        validatorHandler(getUserSchema, 'params'),
        userController.deleteUser.bind(userController)
    );

    return router;
}

module.exports = createUserRouter;
