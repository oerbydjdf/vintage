const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/stocks', (req, res) => {
    res.render(createPath('stocks'), {urlStyle: '/style.css'});
    });

module.exports = router;