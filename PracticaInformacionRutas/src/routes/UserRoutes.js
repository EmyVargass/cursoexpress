// routes/UserRoutes.js

const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { jwtAuth, checkRoles } = require('../middlewares/auth.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../validators/user.validator');

function createUserRouter(userService) {
    const router = express.Router();

    // C: CREATE (POST /usuarios) - Public
    router.post('/', 
        validatorHandler(createUserSchema, 'body'),
        async (req, res, next) => {
        try {
            const newUser = await userService.create(req.body); 
            res.status(201).json({ message: "Usuario creado", data: newUser });
        } catch (error) {
            next(error);
        }
    });

    // R: READ ALL (GET /usuarios) - Admin only
    router.get('/', 
        jwtAuth,
        checkRoles('admin'),
        async (req, res, next) => {
        try {
            const users = await userService.findAll();
            res.json({ total: users.length, data: users });
        } catch (error) {
            next(error);
        }
    });

    // R: READ ONE (GET /usuarios/:id) - Public
    router.get('/:id', 
        validatorHandler(getUserSchema, 'params'),
        async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.findOne(id); 
            
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    });

    // U: UPDATE (PUT /usuarios/:id) - Authenticated users
    router.put('/:id', 
        jwtAuth, // Require authentication
        validatorHandler(getUserSchema, 'params'),
        validatorHandler(updateUserSchema, 'body'),
        async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await userService.update(id, req.body);
            
            if (!updatedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: "Usuario actualizado", data: updatedUser });
        } catch (error) {
            next(error);
        }
    });

    // D: DELETE (DELETE /usuarios/:id) - Admin only
    router.delete('/:id', 
        jwtAuth,
        checkRoles('admin'),
        validatorHandler(getUserSchema, 'params'),
        async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await userService.delete(id); 
            
            if (!deletedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario eliminado', data: deletedUser });
        } catch (error) {
            next(error);
        }
    });

    return router;
}

module.exports = createUserRouter;
