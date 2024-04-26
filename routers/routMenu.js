const express = require('express');
const router = express.Router();
const {getMenu} = require('../controllers/contorllersMenu')

router.get('/menu', getMenu);


module.exports = router;