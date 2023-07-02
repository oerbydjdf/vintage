const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/offer', (req, res) => {
    res.render(createPath('offer'), {urlStyle: '/style.css'});
    });

module.exports = router;