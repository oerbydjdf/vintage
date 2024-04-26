const express = require('express');
const router = express.Router();
const { rewritingPriceComposition } = require('../controllers/contorllerPriceComposition')

router.post('/newPriceComposition', rewritingPriceComposition);

module.exports = router;