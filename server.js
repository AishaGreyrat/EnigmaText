const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarios = require('./models/usuarioModel');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(authMiddleware.cargarScripts);

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Middleware para procesar cookies
app.use(cookieParser());

//Configura DotEnv
dotenv.config();




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});


app.use(passport.initialize());
app.use(passport.session());

// Rutas para las paginas
app.use('/', router);

// Configuración del motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Puerto en el que escucha el servidor
const port = 3008;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});