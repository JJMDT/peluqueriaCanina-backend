const express = require('express');
const app = express();
const dotenv = require('dotenv'); 
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST= process.env.HOST || 'localhost';
const routes = require('./src/routes/routes.js');
app.use(express.json());

app.get('/',routes)

app.listen(PORT,HOST,() => {
    console.log(`servidor coriendo en http://${HOST}:${PORT}/`);
})
