'use strict'

export let selectedDish = '';
// * Записываем id блюда в selectedDish при редакции
export let recordingDishId = (elem) => {
    selectedDish = elem.getAttribute('id')
}

// *Показываем всплывающее окно 'popup' при клеке по блюду
export let showingPopupAdmin = () => {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_active');
    document.body.style.overflow = "hidden";
}

// *Скрываем всплывающее окно 'popup'
export let hidingPopupWindowAdmin = () => {
    let popup = document.querySelector('.popup_active');
    popup.className = 'popup';
    document.body.style.overflow = "";
}

// //* Устаналиваем data отрибут на редактируемое блюдо 
// export let togleDataAttribute = (elem) => {
//     elem.setAttribute('data-edition', 'true')
// }



// * Получаем данные блюда цена и состав
export let receiveTheseDishes = (elem) => {
    let dataDish = {}
    let listDishesStructure = elem.querySelector('.listDishes__structure').innerHTML;
    let listDishesPrice = elem.querySelector('.listDishes__price').innerHTML;
    let listDishesDishesName = elem.querySelector('.listDishes__dishesName').innerHTML;
    let dishWeight = elem.querySelector('.dish__weight_none').innerHTML;
    dataDish.listDishesStructure = listDishesStructure;
    dataDish.listDishesPrice = listDishesPrice;
    dataDish.listDishesDishesName = listDishesDishesName;
    dataDish.dishWeight = dishWeight;
    return dataDish;
}

// * Вставляем данные в popup__composDishes
let popupComposDishes = document.querySelector('.popup__composDishes')
let popupTextareaStructure = popupComposDishes.querySelector('.popup__textarea')
let popupInputPrice = popupComposDishes.querySelector('[name="price"]')
let popupInputWidth = popupComposDishes.querySelector('[name="width"]')
let dishNamePopup = popupComposDishes.querySelector('.dish__name-popup')
export let insertingData = (data) => {
    let {listDishesStructure, listDishesPrice, listDishesDishesName, dishWeight} = data
    popupTextareaStructure.value = listDishesStructure;
    popupInputPrice.value = listDishesPrice;
    dishNamePopup.innerHTML = listDishesDishesName;
    popupInputWidth.value = dishWeight;
}

// * Сохраняем измененный данные в обьект для отправки
export let savingChangeData = () => {
    let obgDish = {
        name: '',
        data: {},
    };
    obgDish.name = dishNamePopup.innerHTML;
    obgDish.data = {PRICE: popupInputPrice.value, DESCRIPTION: popupTextareaStructure.value, WEIGHT: popupInputWidth.value};
    console.log(obgDish)
    return obgDish;
}

// * Записываем новые данные в редактируемое блюдо
export let writingDataEditedDish = (elem, newData) => {
    let dish = document.getElementById(elem)
    dish.querySelector('.listDishes__structure').innerHTML = newData.data.DESCRIPTION;
    dish.querySelector('.listDishes__price').innerHTML = newData.data.PRICE;
}