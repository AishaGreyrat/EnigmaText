// routes/historial
const express = require('express');
const router = express.Router();
const textoController = require('../controllers/cifradoController');


router.get('/', textoController.mostrarHistorial);


module.exports = router;