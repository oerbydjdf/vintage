'use strict'

import { hidingBlockBasket } from "../popupDelyveryData/makingOrderScript.js";
import { clearArrBasket } from "../../scriptAddCart.js";
import { hidingPopupWindow } from "../popupModal/modal.js";

export let shovPoupClear = () => {
    let popupClear = document.querySelector('.popup__clear');
        popupClear.className = 'popup__clear_active';
}

let hiddingPopupClear = () => {
    let popupClearActive = document.querySelector('.popup__clear_active');
    if(popupClearActive === null) return;
    document.querySelector('.popup__clear_active').className = 'popup__clear';
}


// * Вешаем обработчик на кнопки в popupClear
let handlerBtnPopupClear = () => {
    let clearBtn = document.querySelectorAll('.clear__btn');

    // *Скрываем popupClear
    clearBtn[0].onclick = () => {
        hiddingPopupClear();
        let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
        if(popupDeliveryDataActive !== null) document.querySelector('.popup_active').className = 'popup';
    }
    
    clearBtn[1].onclick = () => {
        clearBasket();
        clearBtnQuantity();
        clearArrBasket();
        hidingPopupWindow();
        hidingBlockBasket();
        hiddingPopupClear();
        let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
        if(popupDeliveryDataActive !== null) document.body.style.overflow = "hidden";
    }
}
handlerBtnPopupClear();

// *Очишаем корзину
export let clearBasket = () => {
    document.querySelector('.basketProducts').innerHTML = '';
    document.querySelector('.basket_active').className = 'basket';
    
    let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
    if(popupDeliveryDataActive === null) {
        document.querySelector('.basketComposition__active').className = 'basketComposition';
    } 
    

}

// *Очищаем количество в кнопках на карточке товара и заменяем на кнопку 'добавить'
let clearBtnQuantity = () => {
    let btnQuantityActive = document.querySelectorAll('.btn__quantity_active');
    let dishBtnNone = document.querySelectorAll('.dish__btn_none');
    btnQuantityActive.forEach(e => {
        e.querySelector('.btn__num').innerHTML = 0;
        e.className = 'btn__quantity_none';
    })
    dishBtnNone.forEach(e => e.className = 'dish__btn')
}