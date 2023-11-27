'use strict'

import { basket } from "/scriptAddCart.js";
import { dataClient } from "/orderDataCollectionScript.js";

export let clickFormPayment = () => {
    let formPaymetn = document.querySelector('.formPayment');
    let formPay = formPaymetn.querySelector('input[type=submit]');
    formPay.click();
}

// * Вставляем сумм, телефон, почту заказа и товары в форму оплаты тиньков
export let receiveOrderAmount = () => {
    let formPaymetn = document.querySelector('.formPayment');
    let amountBank = formPaymetn.querySelector('input[name=amount]');
    let nameBank = formPaymetn.querySelector('input[name=name]');
    let phoneBank = formPaymetn.querySelector('input[name=phone]');
    let emailBank = formPaymetn.querySelector('input[name=email]');
    let receiptBank = formPaymetn.querySelector('input[name=receipt]');
    let taxiFare = (dataClient.taxiFare == '0') ? '00': +dataClient.taxiFare * 100 // доставка
    
    amountBank.value = +dataClient.shippingCostTotal;
    nameBank.value = dataClient.nameUser;
    phoneBank.value = dataClient.phone;
    emailBank.value = dataClient.email;

     //* Формируем чек
    let productReceipt = basket.map(e => {
        return (
            {
                "Name": e.name,
                "Price": ((+e.price() - +e.priceDiscount()) * 100).toFixed(0),
                "Quantity": e.quantity + '.00',
                "Amount": ((e.amount - +e.amountDiscount()) * 100).toFixed(0),
                "PaymentMethod": "full_payment",
                "PaymentObject": "commodity",
                "Tax": "none"
            }
        )
    })

    let deliveryPriceReceipt = {
        "Name": "Доставка",
        "Price": taxiFare,
        "Quantity": 1.00,
        "Amount": taxiFare,
        "PaymentMethod": "full_payment",
        "PaymentObject": "commodity",
        "Tax": "none"
    }

    receiptBank.value = JSON.stringify({
        "Email": dataClient.email,
        "Phone": dataClient.phone,
        "EmailCompany": "2512372@mail.ru",
        "Taxation": "usn_income_outcome",
        "Items": [...productReceipt, deliveryPriceReceipt],
    });
}

