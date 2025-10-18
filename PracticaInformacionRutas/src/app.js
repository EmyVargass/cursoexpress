require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURACIÓN DE SWAGGER ---
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('../swagger.yaml'); 
// ------------------------------------------

// --- INICIO: INTEGRACIÓN DB ---
const sequelize = require('./db/sequelize');
const setupModels = require('./models/index');

// Inicializa los modelos (Llama a models/index.js)
setupModels(sequelize); 

// Prueba la conexión y sincroniza las tablas
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Sincroniza las tablas
sequelize.sync()
    .then(() => console.log('Tablas sincronizadas con la base de datos.'));
// ----------------------------------------------------------------------

// Importar el router de usuarios
const userRoutes = require('./routes/UserRoutes'); 


// =========================================================
// 🧠 MIDDLEWARE GLOBALES
// =========================================================

app.use(helmet());
app.use(cors());
app.use(express.json()); // Para leer req.body


// =========================================================
// 🛣️ MONTAJE DE RUTAS Y SWAGGER
// =========================================================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/usuarios', userRoutes); 

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Servidor Express funcionando!' });
});


// =========================================================
// 🛑 MIDDLEWARE DE ERRORES
// =========================================================

// Middleware 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal', details: err.message });
});


// =========================================================
// 🚀 INICIO DEL SERVIDOR
// =========================================================
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT); 
    console.log(`Documentación Swagger en: http://localhost:${PORT}/api-docs`);
});
