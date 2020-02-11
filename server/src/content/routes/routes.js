const express = require('express');
let router = express.Router();

router.get('/content', (req, res) => {
    res.send('you have requeste a person')
})

module.exports = router