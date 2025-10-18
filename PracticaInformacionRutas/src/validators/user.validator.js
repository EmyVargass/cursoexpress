const Joi = require('joi');

// Definimos los campos y sus validaciones
const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const email = Joi.string().email();

// Esquema para la creación de un usuario (nombre y email son requeridos)
const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
});

// Esquema para la actualización de un usuario (todos los campos son opcionales)
const updateUserSchema = Joi.object({
  nombre: nombre,
  email: email,
});

// Esquema para obtener un usuario por ID (el ID es requerido)
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
