// routes/creditos
const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {

    res.render('creditos');
});



module.exports = router;