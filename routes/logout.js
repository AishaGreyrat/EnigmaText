const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
    res.render('logout', { title: req.user != null ? `Bienvenido ${req.user.nombre}` : 'EnigmaText', user: req.user != null ? `${req.user.nombre}` : ''});
  });
  
  module.exports = router;