const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let info = {
    one: {
        title: 'Проводим банкеты.',
        discription: 'При количестве гостей свыше 6 человек, желательно сделать предзаказ.'
    },
    two: {
        title: '10% скидка имениннику.*',
        discription: `При расчете наличными или переводом на карту. <br>
        Для предоставлении скидки необходимо показать паспорт. <br>
        Скидка действует 7 дней до и после дня рождения.`
    },
    three: {
        title: '',
        discription: `Свой алкоголь строго запрещен!! <br>
        Пробкового сбора тоже нет!`
    },
}
router.get('/banket', (req, res) => {
    res.render(createPath('banket'), {urlStyle: '/style.css', info});
    });

module.exports = router;