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

// 1. Middleware esencial para leer el cuerpo JSON (req.body)
app.use(express.json());

// 2. REQUISITO: Middleware de REGISTRO (LOG) global
app.use((req, res, next) => {
    console.log('SE HA REALIZADO UNA SOLICITUD');
    next();
});

// 3. Middleware de la solicitud (Log de User-Agent)
app.use((req, res, next) => {
    console.log('Solicitud recibida por:', req.headers['user-agent']);
    next();
});

// 4. Middleware para manipular la respuesta (Establece Content-Type a JSON)
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json'); 
    next();
});


// =========================================================
// 🛣️ RUTAS Y ENDPOINTS (CRUD y Funciones)
// =========================================================

// =======================
// RUTA BASE Y ERRORES
// =======================

// Ruta original
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Hola, soy una respuesta que fui procesada!' });
});

// Ruta con manejo de error local (try-catch)
app.get('/error', (req, res, next) => {
    try {
        throw new Error('Este es un error de ejemplo');
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error en el servidor (manejado en la ruta)' });
    }
});

// REQUISITO: RUTA CON ERROR 503 ("SERVIDOR EN MANTENIMIENTO")
app.get('/mantenimiento', (req, res, next) => {
    const error503 = new Error('SERVIDOR EN MANTENIMIENTO');
    error503.status = 503;
    next(error503);
});


// =======================
// RUTAS CRUD DE USUARIOS
// =======================

// R: READ ALL (Leer todos los usuarios - ¡NUEVA RUTA!)
// Prueba con GET a http://localhost:3000/usuarios
app.get('/usuarios', (req, res) => {
    // Simulación de una lista de usuarios
    const listaUsuarios = [
        { id: 1, nombre: "John Doe", edad: 25 },
        { id: 2, nombre: "Jane Smith", edad: 30 },
        { id: 3, nombre: "Emily Brown", edad: 22 }
    ];
    
    res.status(200).json({ 
        metodo: "GET",
        operacion: "Leer Todos (R)",
        total: listaUsuarios.length,
        data: listaUsuarios
    });
});


// C: CREATE (Crear un usuario - usa req.body)
// Prueba con POST a http://localhost:3000/usuarios
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body; 
    res.status(201).json({
        metodo: "POST",
        operacion: "Crear (C)",
        mensaje: "Usuario creado exitosamente",
        datos_recibidos: nuevoUsuario
    });
});

// R: READ (Leer un usuario específico - usa req.params)
// Prueba con GET a http://localhost:3000/usuarios/99
app.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        metodo: "GET",
        operacion: "Leer (R)",
        id_capturado: userId,
        mensaje: `Consultando información del usuario con ID: ${userId}`
    });
});

// U: UPDATE (Actualizar un usuario - usa req.params y req.body)
// Prueba con PUT a http://localhost:3000/usuarios/99
app.put('/usuarios/:id', (req, res) => {
    const userId = req.params.id; 
    const datosActualizados = req.body; 
    res.status(200).json({
        metodo: "PUT",
        operacion: "Actualizar (U)",
        mensaje: `Usuario ${userId} actualizado correctamente`,
        datos_recibidos: datosActualizados 
    });
});

// D: DELETE (Borrar un usuario - usa req.params)
// Prueba con DELETE a http://localhost:3000/usuarios/99
app.delete('/usuarios/:id', (req, res) => {
    const userId = req.params.id; 
    res.status(200).json({ 
        metodo: "DELETE",
        operacion: "Borrar (D)",
        mensaje: `Usuario ${userId} eliminado correctamente`
    });
});


// =======================
// RUTAS DE FUNCIONES
// =======================

// Ruta de prueba para la PRIMERA FUNCION
app.get('/estados', (req, res) => {
    res.json({ funcion: 'obtenerEstados', data: obtenerEstados() });
});

// Ruta de prueba para la SEGUNDA FUNCION
app.get('/pares', (req, res) => {
    res.json({ funcion: 'obtenerPrimerosDiezPares', data: obtenerPrimerosDiezPares() });
});

// Ruta de prueba para la TERCERA FUNCION (usa req.query)
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

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Middleware de manejo de errores (4 parámetros)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.setHeader('Content-Type', 'application/json'); 
    res.status(status).json({ error: err.message });
});


// =========================================================
// 🚀 INICIO DEL SERVIDOR
// =========================================================
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});