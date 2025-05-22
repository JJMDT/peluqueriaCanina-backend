const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

// Inicializamos la app de Express
const app = express();

// === Middlewares globales ===

// Habilita CORS (útil si el frontend está en otro dominio o puerto)
app.use(cors());

// Permite recibir y procesar JSON en el body (POST, PUT, etc.)
app.use(express.json());

// Permite procesar datos enviados desde formularios HTML (opcional)
// Si no vas a recibir formularios, podés eliminar esta línea
app.use(express.urlencoded({ extended: true }));

// === Rutas ===


// Prefijo para todas las rutas (ejemplo: /api/pets, /api/users, etc.)
app.use('/api', routes);

// === Middleware de manejo de errores personalizado (opcional) ===
// Podés agregarlo después cuando tengas errores centralizados
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Exportamos la app para usarla en server.js
module.exports = app;
