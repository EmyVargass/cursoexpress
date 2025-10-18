// models/index.js

const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
    // Inicializa el modelo User
    User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
