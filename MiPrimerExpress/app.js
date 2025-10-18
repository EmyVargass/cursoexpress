const express = require('express');
const app = express();
const PORT = 3000;

// =========================================================
// 🧩 FUNCIONES (Lógica de Negocio)
// =========================================================

// PRIMERA FUNCION: Devuelve un arreglo de 5 estados de la republica
function obtenerEstados() {
    return ['Jalisco', 'Nuevo León', 'Ciudad de México', 'Yucatán', 'Puebla'];
}

// SEGUNDA FUNCION: Devuelve un arreglo de los primeros 10 números pares (for)
function obtenerPrimerosDiezPares() {
    const pares = [];
    for (let i = 1; i <= 10; i++) {
        pares.push(i * 2);
    }
    return pares;
}

// TERCERA FUNCION: Que devuelva un booleano de si dos números son iguales (pasarlos por parametro)
function sonIguales(num1, num2) {
    return num1 === num2;
}


// =========================================================
// 🧠 MIDDLEWARE GLOBALES
// =========================================================

// 1. REQUISITO: GENERAR MIDDLEWARE PARA TODAS LAS RUTAS QUE IMPRIMA “SE HA REALIZADO UNA SOLICITUD”
app.use((req, res, next) => {
    console.log('SE HA REALIZADO UNA SOLICITUD');
    next();
});

// 2. Middleware para manipular la solicitud (Log de User-Agent, YA ESTABA)
app.use((req, res, next) => {
    console.log('Solicitud recibida por:', req.headers['user-agent']);
    next();
});

// 3. Middleware para manipular la respuesta (Cambiado a JSON por consistencia)
app.use((req, res, next) => {
    // La mayoría de tus respuestas ahora serán JSON (incluyendo errores y rutas de funciones)
    res.setHeader('Content-Type', 'application/json'); 
    next();
});


// =========================================================
// 🛣️ RUTAS Y ENDPOINTS
// =========================================================

// Ruta original
app.get('/', (req, res) => {
    // Usamos res.json() para ser coherentes con el 'Content-Type: application/json'
    res.json({ mensaje: '¡Hola, soy una respuesta que fui procesada!' });
});

// Ruta con manejo de error local (try-catch, YA ESTABA)
app.get('/error', (req, res, next) => {
    try {
        throw new Error('Este es un error de ejemplo');
    } catch (err) {
        // La respuesta local debe ser JSON
        res.status(500).json({ error: 'Ocurrió un error en el servidor (manejado en la ruta)' });
    }
});

// REQUISITO: GENERAR RUTA CON ERROR 503 ("SERVIDOR EN MANTENIMIENTO")
app.get('/mantenimiento', (req, res, next) => {
    const error503 = new Error('SERVIDOR EN MANTENIMIENTO');
    error503.status = 503;
    next(error503); // Pasa el error al manejador de errores global
});

// Ruta de prueba para la PRIMERA FUNCION
app.get('/estados', (req, res) => {
    res.json({ funcion: 'obtenerEstados', data: obtenerEstados() });
});

// Ruta de prueba para la SEGUNDA FUNCION
app.get('/pares', (req, res) => {
    res.json({ funcion: 'obtenerPrimerosDiezPares', data: obtenerPrimerosDiezPares() });
});

// Ruta de prueba para la TERCERA FUNCION
app.get('/igualdad', (req, res) => {
    const resultado = sonIguales(parseInt(req.query.a), parseInt(req.query.b));
    res.json({ 
        funcion: 'sonIguales', 
        a: req.query.a,
        b: req.query.b,
        resultado: resultado 
    });
});


// =========================================================
// 🛑 MANEJO DE ERRORES (Al final)
// =========================================================

// Middleware para manejar rutas no encontradas (404, YA ESTABA)
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Middleware de manejo de errores (4 parámetros, YA ESTABA)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.setHeader('Content-Type', 'application/json'); 
    res.status(status).json({ error: err.message });
});


// =========================================================
// 🚀 INICIO DEL SERVIDOR (YA ESTABA)
// =========================================================
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});