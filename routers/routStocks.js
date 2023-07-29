const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Акции в кафе Винтаж. Проводим различные акции. Акции на день рождения и банкеты.
    При заказе на вынос скидка 15%.
    На бизнес ланч скидки не распространяются.`,
    keywords: `акции, скидки, день рождения, банкеты, доставка.`
}

router.get('/stocks', (req, res) => {
    res.render(createPath('stocks'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;