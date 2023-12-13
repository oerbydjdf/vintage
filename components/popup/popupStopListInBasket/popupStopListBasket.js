'use strict'

import { loaderTogl } from "../../loaders/loaders.js";
import { wrapperForFunctions } from "../../orderDataCollectionScript.js";
import { disBtn } from "../popupDelyveryData/makingOrderScript.js";
import { clickFormPayment, receiveOrderAmount } from "../popupFormPayment/formPayment.js";
import { hidingPopupWindow } from "../popupModal/modal.js";

// * Вешаем обработчики событий stop__btn
let handlerStopBtn = () => {
    let stopBtn = document.querySelectorAll('.stop__btn');
    stopBtn[0].onclick = () => {
        hidingpopupStopListBasket();
        wrapperForFunctions();
        receiveOrderAmount();
        clickFormPayment();
        disBtn(document.querySelector('.amountToBePaid__totalAmount'))
        setTimeout(() => {
            loaderTogl(false);
            disBtn(document.querySelector('.amountToBePaid__totalAmount'))}, 7000)
    } 
    stopBtn[1].onclick = () => {
        hidingpopupStopListBasket();
        goToMenu();
        loaderTogl(false)
    } 
}
handlerStopBtn(); 

// * Скрываем popupStopListBasket
let hidingpopupStopListBasket = () => {
    document.querySelector('.popup__stopList_active').classList.remove('popup__stopList_active');
    hidingPopupWindow();
}

// * Переход в меню
let goToMenu = () => {
    document.querySelector('.deliveryData__back').click();
}