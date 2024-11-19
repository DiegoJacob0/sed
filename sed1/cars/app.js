const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/coches');  // Rutas para coches
const userRoutes = require('./routes/users');  // Rutas para usuarios

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error de conexión", err));

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/users', userRoutes);  // Rutas de usuarios
app.use('/cars', carRoutes);    // Rutas de coches

// Servir archivos estáticos (como los HTML)
app.use(express.static(path.join(__dirname, 'views')));

// Puerto donde se ejecutará el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
