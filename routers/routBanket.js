const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Проводим банкеты и дни рождения. Средний счет на банкет 1400 рублей. Мы поможем вам составить меню которое понравится Вам и вашим гостям.
    Количество гостей до 35 человек.`,
    keywords: `банкеты, дни рождения, корпаративы, кафе банкет, банкет люди, банкет цена, заказать банкет`
}
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
    res.render(createPath('banket'), {urlStyle: '/style.css', info, metateg});
    });

module.exports = router;