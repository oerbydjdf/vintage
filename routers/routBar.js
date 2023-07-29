const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Достойный выбор напитков как алкогольных так и без алкогольных.
    Готовим вкусные коктейли.`,
    keywords: `кафе, меню бара, бар, винная карта, алкогольная карта, коктейли, бары екатеринбурга.`
}

router.get('/bar', (req, res) => {
    res.render(createPath('bar'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;