const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Вкусный и сытный бизнес ланч. Подаем быстро. Три блюда, два горячих и напитки на выбор. Каждый день новый бизнес ланч, меняем каждую неделю.`,
    keywords: `бизнес ланч, обед, комплекс, комплексный обед, кафе бизнес ланч, бизнес ланч меню`
}

router.get('/businessLunch', (req, res) => {
    res.render(createPath('businessLunch'), {urlStyle: '/style.css', metateg});
    });

module.exports = router;