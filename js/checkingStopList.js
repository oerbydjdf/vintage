'use strict'

import { showingPopup } from "/popup/popupModal/modal.js";
import { createPasRequest } from "./helpersScript/createPasRequest.js";
import { basket, overwritingTrash } from "./scriptAddCart.js";
import { countingAmount, fillingBasket, insertAmountIntoBasket } from "./basketScript.js";


// * Проверяем наличе блюд в стопе
export let checkingStopList = async () => {
    let stopDish = await getStopList();
    changingBtnGoodsMenu(stopDish); // Меняем кнопки в карточке товара с количеством на "Добавить"
    return comparingContents(stopDish)
}

// * Запускаем логику действий при совпадении блюд стоп листа и корзины
export let launchingProgram = (stopDish) => {
    shovPopupStopListInBasket(stopDish)
    removeDishesBasketStopList(stopDish);
    insertAmountIntoBasket(countingAmount(basket)); // Пересчитываем общую сумму
    fillingBasket(basket); // Перерисовываем корзину
    

} 

// * Получаем блюда находящиеся в стоп листе
let getStopList = async () => {
    let response = await fetch('/stoplist',
         {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    }
    );
    let stopDish = await response.json();
    return stopDish;
}

// *Проверяем стоп лист на совпадение блюд с блюдами в корзине
let comparingContents = (arrStopDish) => {
    let newBasket = [];
    basket.forEach(e => {
        if(arrStopDish.includes(e.name)) newBasket.push(e.name);        
    });
    return newBasket
}

// * Оповещаем клиента о наличии в карзине не доступных для заказа блюд
let shovPopupStopListInBasket = () => {
    let popupStopList = document.querySelector('.popup__stopList');
    showingPopup();
    popupStopList.classList.add('popup__stopList_active');
}

// * Удоляем из корзины блюда находящиеся в стоп листе
let removeDishesBasketStopList = (arrStopDish) => {
    let newBasket = [];
    basket.forEach((e, i) => {
        if(!arrStopDish.includes(e.name)) newBasket.push(e);
        
    });
    overwritingTrash(newBasket)
}

// * Меняем кнопки в карточке товара с количеством на "Добавить"
let changingBtnGoodsMenu = (arrStop) => {
    let dishName = document.querySelectorAll('.dish__name');
    dishName.forEach(e => {
        if(arrStop.includes(e.innerHTML.replace(/\s*\n\s*/g,"")) ) {
            let menuDish = e.closest('.menu__dish');
            menuDish.classList.add('menu__dish_stop');
            let btnActive = menuDish.querySelector('.btn__quantity_active');
            if (btnActive !== null) {
                menuDish.querySelector('.btn__num').innerHTML = 0;
                btnActive.className = 'btn__quantity_none';          
                menuDish.querySelector('.dish__btn_none').className = 'dish__btn';
                menuDish.querySelector('.dish__btn').innerHTML = 'Будет позже';
                
            } else {
                menuDish.querySelector('.dish__btn').innerHTML = 'Будет позже';
            }
        }
    })
}


