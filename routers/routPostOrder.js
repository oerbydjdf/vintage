const express = require('express');
const router = express.Router();
// const createPath = require('../helpers/createPath');
const { postOrder } = require('../controllers/controllersPostOrder')

// router.post('/order', (req, res) => {
    // res.render(createPath('bar'));
    // console.log(JSON.parse(req.body))
    // console.log(req.params)
    // res.send(JSON.parse(req.body))
    // });
router.post('/order', postOrder);

module.exports = router;