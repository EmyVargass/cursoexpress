require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const UserService = require('./services/UserService');
const AuthService = require('./services/auth.service');
const routerApi = require('./routes');

// --- Dependency Injection and Composition ---
const userService = new UserService(sequelize.models);
const authService = new AuthService(userService);
setupPassport(userService); // Set up passport strategies

// --- Route Mounting ---
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routerApi(app, userService, authService);

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Express funcionando!' });
});

// --- Error Handling Middleware ---
const boomErrorHandler = require('./middlewares/boom.handler');
const ormErrorHandler = require('./middlewares/orm.handler');
const errorHandler = require('./middlewares/error.handler');

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


// --- Server Startup ---
if (require.main === module) {
  setupDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('Servidor escuchando en el puerto ' + PORT);
        console.log(`Documentación Swagger en: http://localhost:${PORT}/api-docs`);
    });
  });
}

module.exports = app;
