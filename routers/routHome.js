const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Боле 140 блюд в меню. Шашлыки, пицца, паста и другие блюда.
    Проводим банкеты, юбилеи и корпаративы.
    С 12 до 16 работает бизнес ланч.
    Можно заказать доставку домой.`,
    keywords: `Кафе, кафе Винтаж, банкеты, доставка, бизнес ланч, поминальный обед.`
}

router.get('/', (req, res) => {
    res.render(createPath('index'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;