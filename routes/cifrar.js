const express = require('express');
const router = express.Router();
const textoControlador = require('../controllers/cifradoController');

// Ruta para cifrar texto
router.post('/', textoControlador.cifrarTexto);

  
module.exports = router;