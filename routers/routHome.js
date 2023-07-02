const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/', (req, res) => {
    res.render(createPath('index'), {urlStyle: '/style.css'});
    });

module.exports = router;