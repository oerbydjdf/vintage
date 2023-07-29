const express = require('express');
const router = express.Router();
const { postOrder } = require('../controllers/controllersPostOrder')
router.post('/order', postOrder);

module.exports = router;