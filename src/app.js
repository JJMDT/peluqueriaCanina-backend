const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const userRoutes = require('./routes/user')

// Inicializamos la app de Express
const app = express();

// === Middlewares globales ===

// configuracion cors
app.use(cors());

// Permite recibir y procesar JSON en el body (POST, PUT, etc.)
app.use(express.json());

// Si no vas a recibir formularios, podés eliminar esta línea
app.use(express.urlencoded({ extended: true }));

// === Rutas ===
app.use('/api', routes);
app.use('/users', userRoutes)

// === Middleware de manejo de errores personalizado (opcional) ===
// Podés agregarlo después cuando tengas errores centralizados
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Exportamos la app para usarla en server.js
module.exports = app;
