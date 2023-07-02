const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/bar', (req, res) => {
    res.render(createPath('bar'), {urlStyle: '/style.css'});
    });

module.exports = router;