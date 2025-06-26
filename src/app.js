const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const userRoutes = require('./routes/user')
const auth = require('./routes/auth');
const service = require('./routes/service')
const shift = require('./routes/shift')

// Inicializamos la app de Express
const app = express();

// === Middlewares globales ===

// configuracion cors
// app.use(cors());
const allowedOrigins = [
  'http://localhost:4200', // desarrollo local Angular
  'https://guau-que-corte.vercel.app', // deploy frontend en Vercel
  'https://main.d6v4rbr3cos5b.amplifyapp.com' // deploy frontend en AWS Amplify
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origen (ej: Postman, curl)
    if (!origin){
        return callback(null, true);
    } 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen ${origin} no permitido por CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Cambiar a true si usás cookies o sesiones
}));

// Permite recibir y procesar JSON en el body (POST, PUT, etc.)
app.use(express.json());

// Si no vas a recibir formularios, podés eliminar esta línea
app.use(express.urlencoded({ extended: true }));

// === Rutas ===
app.use('/api', routes);
app.use('/users', userRoutes)
app.use('/auth', auth)
app.use('/service', service)
app.use('/shift', shift)
// === Middleware de manejo de errores personalizado (opcional) ===
// Podés agregarlo después cuando tengas errores centralizados
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Exportamos la app para usarla en server.js
module.exports = app;
