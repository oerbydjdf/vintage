'use strict'

export let clickFormPayment = () => {
    let formPaymetn = document.querySelector('.formPayment');
    let formPay = formPaymetn.querySelector('input[type=submit]');
    formPay.click();
}

// * Вставляем сумм заказа в форму оплаты тиньков
export let receiveOrderAmount = () => {
    let formPaymetn = document.querySelector('.formPayment');
    let nameOrder = formPaymetn.querySelector('input[name=amount]');
    let shippingCostTotal = document.querySelector('.shippingCost__total').innerHTML;
    nameOrder.value = +shippingCostTotal;    
}

