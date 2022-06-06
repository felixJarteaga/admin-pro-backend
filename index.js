require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios.router') );
app.use( '/api/hospitales', require('./routes/hospitales.router') );
app.use( '/api/medicos', require('./routes/medicos.router') );
app.use( '/api/todo', require('./routes/busquedas.router') );
app.use( '/api/login', require('./routes/auth.router') );
app.use( '/api/upload', require('./routes/uploads.router') );



app.listen(process.env.PORT,()=>{
  console.log('Servidor corriendo en puerto '+ process.env.PORT);
});




