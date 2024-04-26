// routes/routes.js

const express = require('express');
const router = express.Router();

// Importa las rutas específicas

const index = require('./index');

// Configura las rutas
router.use('/', index);

module.exports = router;