const express = require('express');
const router = express.Router();

const {getAdmin} = require('../controllers/contorllersAdmin')

router.get('/admin/adminIndex', getAdmin);

module.exports = router;