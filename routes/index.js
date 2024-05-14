// routes/index.js
const express = require('express');
const router = express.Router();
const cifradoController = require('../controllers/cifradoController');

// Rutas públicas
router.get('/', (req, res) => {
  // Obtener el título y el usuario
  const title = req.user != null ? `Bienvenido ${req.user.nombre}` : 'Bienvenido EnigmaText';
  const user = req.user != null ? `${req.user.nombre}` : '';
  
  // Llamar a la función del controlador y pasar el título y el usuario como parámetros
  cifradoController.mostrarFormularioEnIndex(req, res, title, user);
});


module.exports = router;