const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');



router.get('/login', (req, res) => {
    res.render(createPath('login'));
    });

module.exports = router;