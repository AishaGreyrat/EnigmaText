const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

router.post('/', usuarioController.registrarUsuario);
module.exports = router;
