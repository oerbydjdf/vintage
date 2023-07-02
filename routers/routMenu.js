const express = require('express');
const router = express.Router();
// const createPath = require('../helpers/createPath');
const {getMenu} = require('../controllers/contorllersMenu')

router.get('/menu', getMenu);


module.exports = router;