const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Оферта. Описание оферты. Правила продажи и оказания услуг.
    Правила  и стоимость доставки блюд домой.`,
    keywords: `оферта, доставка, еда на вынос, еда дом`
}

router.get('/offer', (req, res) => {
    res.render(createPath('offer'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;