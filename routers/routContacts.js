const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/contacts', (req, res) => {
    res.render(createPath('contacts'), {urlVideo: '/promoRolik/30_ВИНТАЖ_0323.mp4', urlStyle: '/style.css'});
    });

module.exports = router;