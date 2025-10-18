const EventEmitter = require('events');

// Creamos una instancia de EventEmitter
const myEmitter = new EventEmitter();

// Definimos un evento personalizado llamado 'saludo'
myEmitter.on('saludo', (nombre) => {
  console.log(`¡Hola, ${nombre}!`);
});

// Emitimos el evento 'saludo' y pasamos un argumento
myEmitter.emit('saludo', 'Alonso');