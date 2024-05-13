// routes/historial
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, (req, res) => {
    res.render('historial');
});

module.exports = router;