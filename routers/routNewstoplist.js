const express = require('express');
const router = express.Router();
const { rewritingStopList } = require('../controllers/contorllerNewstoplist')

router.post('/newstoplist', rewritingStopList);

module.exports = router;