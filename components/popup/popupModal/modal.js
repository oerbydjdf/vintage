'use strict'

// import { disableChoiceDeliveryTime } from "../../makingOrderScript.js";
import { hidingTcontentsBasket } from "../../basketScript.js";
import { hidingPopupComposDishes } from "../popupComposDishes/composDishes.js";
import { disableChoiceDeliveryTime } from "../popupDeliveryTime/delyveryTime.js";

// *Показываем всплывающее окно 'popup' при клеке по блюду
export let showingPopup = () => {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_active');
    document.body.style.overflow = "hidden";
}

// *Скрываем всплывающее окно 'popup'
export let hidingPopupWindow = () => {
    let popup = document.querySelector('.popup_active');
    popup.className = 'popup';
    document.body.style.overflow = "";
}

// *Вешаем обработчики событий на всплывающее окно
let handlerClickPopup = () => {
    let popup = document.querySelector('.popup');
    popup.onclick = (e) => {
        let popupClearActive = document.querySelector('.popup__clear_active');
        let popupStopListActive = document.querySelector('.popup__stopList_active');
        if(popupClearActive !== null || popupStopListActive !== null) return;
        hidingPopupWindow();
        hidingTcontentsBasket();
        hidingPopupComposDishes();
        disableChoiceDeliveryTime();
    }
}
handlerClickPopup();
