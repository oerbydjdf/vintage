const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/businessLunch', (req, res) => {
    res.render(createPath('businessLunch'), {urlStyle: '/style.css'});
    });

module.exports = router;