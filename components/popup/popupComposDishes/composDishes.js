'use strict'

import { hidingTcontentsBasket } from "../../basketScript.js";
import { disableChoiceDeliveryTime } from "../popupDeliveryTime/delyveryTime.js";
import { hidingPopupWindow } from "../popupModal/modal.js";

// *Вешаем обработчики событий на всплывающее окно c опциями
export let handlerClickPopupOptions = () => {
    let popupClose = document.querySelectorAll('.popup__close');
    let popupComposDishes = document.querySelector('.popup__composDishes');
    popupClose.forEach(e => {
        e.onclick = () => {
            hidingPopupWindow();
            hidingTcontentsBasket();
            hidingPopupComposDishes();
            disableChoiceDeliveryTime();
        }
    })
    if(popupComposDishes === null) return
    popupComposDishes.onclick = (e) => e.stopPropagation();    
}
handlerClickPopupOptions();

// *Скрываем всплывающее окно 'popup__composDishes'
export let hidingPopupComposDishes = () => {
    let popupComposDishes = document.querySelector('.popup__composDishes');
    popupComposDishes.querySelector('.btn__num').innerHTML = 1;
    popupComposDishes.className = 'popup__composDishes';
}

// * Вставляем фото в popup__img
export let insertingPhoto = (dish) => {
    let foto = dish.querySelector('.dish__foto').getAttribute('src');
    document.querySelector('.popup__img').setAttribute('src', foto);

}
