const app = require('./src/app'); // Importar la app de Express ya configurada
const dotenv = require('dotenv');
const { sequelizeConfig } = require('./src/config/db');
const bunyan = require('bunyan')

dotenv.config();

const bunyanLog = bunyan.createLogger({ name: 'app' })


// Definir puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;

//funcion para la connecion de la la base de datos
const connectdB = async () => {
  await sequelizeConfig.authenticate();
  bunyanLog.info('coneccion de Data Base mySQL aws OK');
}

// funcion para Sincroniza los modelos con la base de datos
const syncModels = async () => {
  await sequelizeConfig.sync();
  bunyanLog.info('Models Data Base OK');
}

// Iniciar el servidor
const startExpress = async () => {
  app.listen(PORT, () => {
    bunyanLog.info(`Servidor corriendo en http://localhost:${PORT}`);
  });
}


const startServer = async () => {
  try {
    await connectdB()
    await syncModels()
    await startExpress()
  } catch (error) {
    console.log('Error al iniciar', error)
  }
}

startServer();
