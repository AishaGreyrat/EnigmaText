// routes/routes.js

const express = require('express');
const router = express.Router();

// Importa las rutas específicas

const index = require('./index');
const logout = require('./logout');


// Configura las rutas

router.use('/', index);
router.use('/logout', logout);

module.exports = router;