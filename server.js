const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/routes');

// Configuraci�n del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});


// codificacion del servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuraci�n de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});