'use strict'

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
    weSendOrderData(customerAndOrderData)
    
}

// * Собирает данные клиента для доставки
let collectsCustomerData = (dataClient) => {
    let data = document.querySelectorAll('[data-order]');
    data.forEach(e => {
        if(e.tagName ==  'INPUT') {
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
    let string = document.URL.split('/');
    string.splice(-1, 1, 'order');    
    let url = string.join('/');
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),

      });
      let result = await response.json();
      console.log(result)
      return;
}

// * Генерируем номер заказа
let generatingOrderNumber = () => {
    let arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let orderNumber = '';
    for(let i = 0; i < 10; i++) {
        if(orderNumber.length == 6) orderNumber += '-';
        orderNumber += Math.floor(Math.random() * (10 - 0))
    }
    return orderNumber;
}