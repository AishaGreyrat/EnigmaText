// routes/routes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Importa las rutas específicas

const index = require('./index');
const logout = require('./logout');
const login = require('./login');
const register = require('./register');
const registrarUsuario = require('./registrar-usuario');
const historial = require('./historial');
const creditos = require('./creditos');
// const nombre = require('./nombre del js');


// Configura las rutas

router.use('/', index);
router.use('/logout', logout);
router.use('/login', login);
router.use('/register', register);
router.use('/registrar-usuario', registrarUsuario);
router.use('/historial', authMiddleware.authenticate , historial);
router.use('/creditos', creditos);


module.exports = router;