const dotenv = require('dotenv'); 
dotenv.config();

// Importar la app de Express ya configurada
const app = require('./src/app');

// Definir puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, (req,res) => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
