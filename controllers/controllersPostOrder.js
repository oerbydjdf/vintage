// const createPath = require('../helpers/createPath');
const nodeMailer = require('nodemailer');


const postOrder = (req, res) => {
     
    let transporter = nodeMailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: '2512372@mail.ru',
            pass: 'cTjAbCHWW05ZvpiqpjWM'
        }
    });
    let mailOptions = {
        from: '"Кафе Винтаж" <2512372@mail.ru>', // sender address
        // to: `${req.body.client.email}, vintage65@yandex.ru`, // list of receivers
        subject: 'Доставка кафе Винтаже', // Subject line
        text: '', // plain text body
        html: createsHtmlOrderData(req.body) // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            // res.render('index');
        });
    
        return res.json(req.body);
}

module.exports = {postOrder}

let createsHtmlOrderData = (data) => {

    return `
    <style>
        table {
            border: 2px solid gray;
            border-collapse: collapse;
            font-size: 20px;
            
        }
        th {
            border: 2px solid black;
            padding: 0 5px;
        }
        td {
            padding: 5px 5px;
            border: 2px solid gray;
            font-size: 18px;
        }
        caption {
            margin: 0 0 15px 0;
            font-weight: 700;
            font-size: 25px;
        }
    </style>

    <h1>${data.client.typeOfDelivery}</h1>    
    ${createsHtmlClientData(data)}    
    <h2 style="margin: 25px auto 15px auto;">Заказ</h2>
    <h3 style="margin: 25px auto 15px auto;">Номер заказа: ${data.orderNumber}</h3>


    <table>
    <tr><th>название блюда</th><th>кол-во</th><th>Добавки</th><th>цена за ед-цу</th></tr>
    ${createsHtmlBasketData(data)}
    ${displayDeliveryOrDiscount(data)}    
    </table>

    <h3>Сумма заказа: ${data.client.shippingCostTotal} ₽</h3>
    `
}

let createsHtmlClientData = (data) => {
    return `
    <table>
    <tr><td>Имя</td><td>${data.client.nameUser}</td></tr>
    <tr><td>Улица и дом</td><td>${data.client.street}</td></tr>
    <tr><td>Квартира / Офис</td><td>${data.client.apartment}</td></tr>
    <tr><td>Домофон</td><td>${data.client.intercom}</td></tr>
    <tr><td>Подъезд</td><td>${data.client.entrance}</td></tr>
    <tr><td>Этаж</td><td>${data.client.floor}</td></tr>
    <tr><td>Почта</td><td>${data.client.email}</td></tr>
    <tr><td>Телефон</td><td>${data.client.phone}</td></tr>
    <tr><td>Время доставки</td><td>${data.client.deliveryTime}</td></tr>
    <tr><td>Колличество приборов</td><td>${data.client.numberOfDevices}</td></tr>
    <tr><td>Коментарий</td><td>${data.client.coment}</td></tr>
</table>
    `
}

let createsHtmlBasketData = (data) => {
    let div = '';
    data.order.forEach((e) => {
        div += `<tr>
            <td>${e.name}</td>
            <td>${e.quantity}</td>
            <td>${createsHtmlOptionsData(e)}</td>
            <td>${+e.amount / +e.quantity} ₽</td>
        </tr>`
    });
    return div
}

let createsHtmlOptionsData = (data, i) => {
    let div = '';
    data.options.forEach(e => div += `${e.optionName} / ${e.optionPrice} ₽<br>`)
    return div;
}

let displayDeliveryOrDiscount = (data) => {
    if(data.client.taxiFare != 0) {
        return `
        <tr><td>Доставка</td><td>1</td><td></td><td>${data.client.taxiFare} ₽</td></tr>
        `
    } else if(data.client.discount != 0) {
        return `
        <tr><td>Скидка</td><td>1</td><td></td><td>-${data.client.discount} ₽</td></tr>
        `        
    }
}
