const csv = require('csv-parser')
const fs = require('fs')
const createPath = require('../helpers/createPath')

let info = {
    one: {
        title: '15% скидка на вынос',
        discription: `Самостоятельно забираете заказ из кафе <br>`
    },
    two: {
        title: 'Работает доставка',
        discription: `Время работы доставки: <br>
        Пн - Чт: с 11:00 до 22:00<br>
        Пт: с 11:00 до 23:00<br>
        Сб: с 12:00 до 23:00<br>
        Вс: с 12:00 до 22:00<br>`
    },
    three: {
        title: '',
        discription: `Условия доставки. <br>
        Доставка осуществляется по г. Екатеринбургу. <br>
        Доставляем в течении 90 минут (плюс, минус 15-20 минут, в зависимости от обстановке на дороге).
        <br>
        Стоимость доставки = 350р. <br>
        Оплата только онлайн. <br>
        <a href="/offer">Ознакомтесь с офертой</a>`
    },
}

let metateg = {
    discription:`Большое разнообразие блюд. Вы можете заказать мясо на углях, пиццу или пасту. 
    Средни счет 800 р. На банкет 2800 р.
    Работает доставка.
    Так же для Вас есть бизнес ланч.`,
    keywords: `меню кафе, кафе, шашлыки, пицца, паста, банкеты, кафе, доставка`
}
const getMenu = (req, res) => {
    const results = [];
    
    fs.createReadStream('./base/csv-catalog/fileNewBaza.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) =>  results.push(data))
    .on('end', () => {
        // console.log(results)
        res.render(createPath('menu'), {results, urlStyle: '/style.css', info, metateg});
        return;
    });
}

module.exports = {getMenu};