const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Проводим поминальные обеды, четыре варианта на выбор.
    Алкоголь можно принести свой. Заказывать заранее.
    Есть возможность доставки.`,
    keywords: `поминальный обед, поминальная трапеза, поминки, поминки в кафе`
}

router.get('/memorialDinner', (req, res) => {
    res.render(createPath('memorialDinner'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;