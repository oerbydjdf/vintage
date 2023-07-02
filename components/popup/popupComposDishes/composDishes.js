'use strict'

import { hidingTcontentsBasket } from "../../basketScript.js";
import { hidingPopupWindow } from "../popupModal/modal.js";

// *Вешаем обработчики событий на всплывающее окно c опциями
let handlerClickPopupOptions = () => {
    let popupClose = document.querySelector('.popup__close');
    let popupComposDishes = document.querySelector('.popup__composDishes');
    popupClose.onclick = (e) => {
        hidingPopupWindow();
        hidingTcontentsBasket();
        hidingPopupComposDishes();
    }
    popupComposDishes.onclick = (e) => e.stopPropagation();    
}
handlerClickPopupOptions();

// *Скрываем всплывающее окно 'popup__composDishes'
export let hidingPopupComposDishes = () => {
    let popupComposDishes = document.querySelector('.popup__composDishes');
    popupComposDishes.querySelector('.btn__num').innerHTML = 1;
    popupComposDishes.className = 'popup__composDishes';
}