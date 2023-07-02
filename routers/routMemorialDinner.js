const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

router.get('/memorialDinner', (req, res) => {
    res.render(createPath('memorialDinner'), {urlStyle: '/style.css'});
    });

module.exports = router;