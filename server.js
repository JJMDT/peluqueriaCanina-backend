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

// Importar la base de datos
const sequelize = require('./src/DataBase/database');
const User = require('./src/models/User');

sequelize.sync({alter: true})
.then(() => {
  console.log('Base de datos sincronizada');
})
.catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});