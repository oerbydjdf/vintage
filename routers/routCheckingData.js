const express = require('express');
const router = express.Router();
const {checkingData} = require('../controllers/contorllerCheckingData')

router.post('/adminLogin', checkingData);
module.exports = router;