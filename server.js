const app = require('./src/app'); // Importar la app de Express ya configurada
const dotenv = require('dotenv');
const { sequelizeConfig } = require('./src/config/db');
const bunyan = require('bunyan')

//traigo todos los models
require('./src/models/index')

dotenv.config();

const bunyanLog = bunyan.createLogger({ name: 'app' })


// Definir puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

//funcion para verificar la conexión de la la base de datos
const connectdB = async () => {
  await sequelizeConfig.authenticate();
  bunyanLog.info('conexión de Data Base mySQL aws OK');
}

// funcion para para verificar la conexión los modelos con la base de datos y que tablas tenemos en la base de datos
const syncModels = async () => {
  await sequelizeConfig.sync();
  const allSchemas = (await sequelizeConfig.showAllSchemas()).map(el => el[`Tables_in_${process.env.DB_NAME}`])
  bunyanLog.info(`Todos los schemas en la  Data Base ${process.env.DB_NAME}: ${allSchemas.join(', ')}`)
  bunyanLog.info('Modelos(Tablas) Data Base OK');
}

// Iniciar el servidor
const startExpress = async () => {
  app.listen(PORT, () => {
    bunyanLog.info(`Servidor corriendo en http://${HOST}:${PORT}`);
  });
}


const startServer = async () => {
  let dbConnected = true;
  try {
    await connectdB();
    await syncModels();
  } catch (error) {
    dbConnected = false;
    bunyanLog.error('Error al conectar o sincronizar con la base de datos:', error.message);
  }
  await startExpress();
  if (!dbConnected) {
    bunyanLog.warn('El servidor Express está funcionando, pero hubo un problema con la base de datos.');
  }
}

startServer();