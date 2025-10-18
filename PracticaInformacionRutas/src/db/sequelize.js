// libs/sequelize.js

const { Sequelize } = require('sequelize');
const setupModels = require('../models');

// Usamos SQLite, que guarda la base de datos en un archivo local llamado 'db.sqlite'
const URI = 'sqlite:db.sqlite'; 

// Crear la instancia de Sequelize
const sequelize = new Sequelize(URI, {
    dialect: 'sqlite',
    logging: console.log, // Muestra las consultas SQL
});

// Setup models right away
setupModels(sequelize);

async function setupDatabase() {
  await sequelize.authenticate();
  await sequelize.sync();
}

module.exports = { sequelize, setupDatabase };
