// routes/creditos
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Obtener el número de conversiones restantes de la sesión
    const conversionesRestantes = req.session.conversionesRestantes || 3; // Si no se ha definido, se asume que hay 3 conversiones restantes

    res.render('creditos', { conversionesRestantes: conversionesRestantes });
});

module.exports = router;
