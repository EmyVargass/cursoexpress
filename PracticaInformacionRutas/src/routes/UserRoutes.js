// routes/UserRoutes.js

const express = require('express');
const router = express.Router(); 
const UserService = require('../services/UserService'); 
const service = new UserService();

// C: CREATE (POST /usuarios)
router.post('/', async (req, res) => {
    try {
        const newUser = await service.create(req.body); 
        res.status(201).json({ message: "Usuario creado", data: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
});

// R: READ ALL (GET /usuarios)
router.get('/', async (req, res) => {
    try {
        const users = await service.findAll();
        res.json({ total: users.length, data: users });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
});

// R: READ ONE (GET /usuarios/:id)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await service.findOne(id); 
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario', details: error.message });
    }
});

// U: UPDATE (PUT /usuarios/:id)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await service.update(id, req.body);
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: "Usuario actualizado", data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
});

// D: DELETE (DELETE /usuarios/:id)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await service.delete(id); 
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado', data: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
});

module.exports = router;
