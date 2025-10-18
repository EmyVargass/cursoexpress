require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// --- Core App Setup ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- DB and Model Setup ---
const { sequelize, setupDatabase } = require('./db/sequelize');
const setupModels = require('./models');
setupModels(sequelize);

const setupPassport = require('./utils/auth');

// --- Middleware Setup ---
app.use(helmet());
app.use(cors());
app.use(express.json());
const passport = require('passport');
app.use(passport.initialize());

// --- Dependency Injection and Composition ---
const userService = new UserService(sequelize.models);
const authService = new AuthService(userService);
setupPassport(userService); // Set up passport strategies
const userRouter = createUserRouter(userService);
const authRouter = createAuthRouter(authService);

// --- Route Mounting ---
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/usuarios', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Express funcionando!' });
});

// --- Error Handling Middleware ---
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal', details: err.message });
});

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
