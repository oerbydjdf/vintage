'use strict'

import { createPasRequest } from "./helpersScript/createPasRequest.js";
import { basket } from "./scriptAddCart.js";


let customerAndOrderData = {
    client: {},
    order: [],
    orderNumber: '',
}

export let dataClient = {
    street: "",
    apartment: "",
    intercom: "",
    entrance: "",
    floor: "",
    email: "",
    phone: "",
    phoneUrl: "",
    coment: "",
    deliveryTime: "",
    numberOfDevices: "Без приборов",
    typeOfDelivery: "",
    taxiFare: '',
    discount: '',
    shippingCostTotal: '',
    nameUser: '',

}


// * Обертка для функций собирающих данные
export let wrapperForFunctions = () => {
    customerAndOrderData.client = collectsCustomerData(dataClient);
    customerAndOrderData.order = basket;
    customerAndOrderData.orderNumber = generatingOrderNumber();
    weSendOrderData(customerAndOrderData);

}

// * Собирает данные клиента для доставки
let collectsCustomerData = (dataClient) => {
    let data = document.querySelectorAll('[data-order]');
    data.forEach(e => {
        if (e.tagName == 'INPUT') {
            dataClient[e.dataset.order] = e.value;
        } else {
            dataClient[e.dataset.order] = e.innerHTML;
        }
    })
    // *Создаем ссылку ватсап.
    let phoneNum = dataClient.phone.replace(/[^0-9.]/g, '');
    dataClient.phoneUrl = `<a href="https://wa.me/${phoneNum}?text=Здравствуйте%2C+заказ+принят.">${dataClient.phone}</a>`


    return dataClient;
}

// * Отправляем данные заказа
let weSendOrderData = async (data) => {
    let url = createPasRequest('order');
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),

    });
    let result = await response.json();
    return;
}

// * Генерируем номер заказа
let generatingOrderNumber = () => {
    let orderNumber = '';
    for (let i = 0; i < 10; i++) {
        if (orderNumber.length == 6) orderNumber += '-';
        orderNumber += Math.floor(Math.random() * (10 - 0))
    }
    return orderNumber;
}

// * Создаем ссылку в яндекс такси
// let creatingLinkYandexTaxi = () => {
//     let street = dataClient.street;
//     function init(ymaps) {
//         var myGeocoder = ymaps.geocode(`Екатеринбург, ${street}`);
//         myGeocoder.then(function (res) {
//             var firstGeoObject = res.geoObjects.get(0),
//                 coords = firstGeoObject.geometry.getCoordinates();

//             dataClient.street = `<a href="https://3.redirect.appmetrica.yandex.com/route?start-lat=56.812374&start-lon=60.603052&end-lat=${coords[0]}&end-lon=${coords[1]}&level=express&appmetrica_tracking_id=1178268795219780156&lang=ru">${street}</a>`
//             weSendOrderData(customerAndOrderData);
//         });
//     }
//     ymaps.ready(init);

//     56.812374, 60.603052
// }

