const Joi = require('joi');

// Definimos los campos y sus validaciones
const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid('admin', 'customer');

// Esquema para la creación de un usuario (nombre y email son requeridos)
const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  password: password.required(),
  role: role, // Role is optional on creation, will use default
});

// Esquema para la actualización de un usuario (todos los campos son opcionales)
const updateUserSchema = Joi.object({
  nombre: nombre,
  email: email,
  role: role,
});

// Esquema para obtener un usuario por ID (el ID es requerido)
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
