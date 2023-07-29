const express = require('express');
const router = express.Router();
const createPath = require('../helpers/createPath');

let metateg = {
    discription:`Контакты кафе Винтаж, адрес и наш телефон.
    г. Екатеринбург ул. Фрунзе 65.
    телефон 251-23-72
    Можно писать нам прямо с сайта, мы Вам ответим на вопросы.`,
    keywords: `кафе, контакты, банкет, бизнес ланч, поминки, кафе Винтаж`
}

router.get('/contacts', (req, res) => {
    res.render(createPath('contacts'), {urlVideo: '/promoRolik/30_ВИНТАЖ_0323.mp4', urlStyle: '/style.css', metateg});
    });

module.exports = router;