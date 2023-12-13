const express = require('express');
const router = express.Router();
const { getStoplist } = require('../controllers/controllersStoplist')
router.get('/stoplist', getStoplist);

module.exports = router;