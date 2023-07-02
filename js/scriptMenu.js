'use strict';
import { removingSpaces } from './helpersScript/removingSpaces.js';
import { func } from './scriptaddBtn.js';
import { showingPopup } from '/popup/popupModal/modal.js';

// * Вешаем обработчик на блюда
let handlerDish = () => {
    let menuDish = Array.from(document.querySelectorAll('.menu__dish'));
    menuDish.forEach(e => {
        e.onclick = (event) => {
            showingPopup();
            showPopupComposDishes();
            insertingOptions(e);
            let btn = e.querySelector('.dish__button')
            func(btn);
        }
    })
}
handlerDish();

// *Показываем всплывающее окно 'popup__composDishes' при клеке по блюду
let showPopupComposDishes = () => {
    let popupComposDishes = document.querySelector('.popup__composDishes');
    popupComposDishes.classList.add('popup__composDishes_active');

}


// *Преобразуем строку доп. опций для блюд в массив
let convertingStringToArray = (selector) => {
    let dishOptions = selector.querySelector('.dish__options');
    let arrDishOptions = dishOptions.innerHTML.split('|');
    // *Функция "removingSpaces" очищает от пробелов и переноса строки
    return removingSpaces(arrDishOptions);
}

// *Вставляем опции и информацию о товаре в сплывающее окно
export let fotoUrlPopup;
let insertingOptions = (selector) => {
    let popupSubtitle = document.querySelector('.popup__subtitle');
    let dishNamePopup = document.querySelector('.dish__name-popup');
    let dishName = selector.querySelector('.dish__name');
    let dishComposition = selector.querySelector('.dish__compositionDish');
    let popupCompositionDish = document.querySelector('.popup__compositionDish');
    let arrOptions = convertingStringToArray(selector);
    let dishRatePrice = selector.querySelector('.dish__ratePrice');
    let popupRate = document.querySelector('.popup__rate');
    fotoUrlPopup = selector.querySelector('.dish__foto').getAttribute('src');
    // console.log(fotoUrlPopup)
    
    if (arrOptions[0] === '') popupSubtitle.innerHTML = '';
    if (arrOptions[0] !== '') popupSubtitle.innerHTML = 'Рекомендуем добавить :)';
    
    dishNamePopup.innerHTML = dishName.innerHTML;
    popupCompositionDish.innerHTML = dishComposition.innerHTML;
    popupRate.innerHTML = dishRatePrice.innerHTML;
    creatingCheckBoxes(arrOptions);
}


//*Создаем чекбоксы для выбора опций
let creatingCheckBoxes = (arr) => {
    let popupOptions = document.querySelector('.popup__options');
    popupOptions.innerHTML = '';
    arr.forEach(e => {

        let arrNamePrace = e.split(',');
        if (arrNamePrace[1] === undefined) return;
        let div = document.createElement('div');
        div.className = 'optionsBox'
        div.innerHTML = `<div> <input class='my-checkbox' type="checkbox" name="a" value=${arrNamePrace[1]}></div>
                            <div class='optionText'>
                                <div  class='optionName'>
                                    <span  class='name'> ${arrNamePrace[0]}</span>
                                    <div class='priceAndGlif'>
                                        <span  class='price'>${arrNamePrace[1]}</span>
                                        <div class="popup__icon icon-rubles"></div>                            
                                    </div>
                                </div>
                            </div>`
        popupOptions.append(div);
    })
}

//* Плавный скрол при клике по навигации
let scrollToElement = () => {
    let menu = document.querySelector('.menu__list');
    menu.addEventListener('click', function (event) {
        let distanceElementTop = 20;
        if(document.documentElement.clientWidth <= 430) distanceElementTop = 120;
        let target = event.target;
        if (target.className != 'menu__link') return;
        event.preventDefault();
        let id = target.getAttribute('href').slice(1);
        let elem = document.getElementById(id);
        let height = elem.offsetTop - window.pageYOffset - distanceElementTop;
        window.scrollBy({
            top: height,
            behavior: 'smooth',
        });
        
    });
}
scrollToElement();

// *Меняем стиль кнопок навигации при клике
let changingButtonStyles = () => {
    let menuItem = document.querySelectorAll('.menu__item');
    menuItem.forEach(e => {
        e.onclick = () => {
            let itemActive = document.querySelector('.menu__item_active');
            if(itemActive === null) {
                e.classList.add('menu__item_active');
            } else {
                itemActive.className = 'menu__item';
                e.classList.add('menu__item_active');
            }            
        }
    })
}
changingButtonStyles();


//* Ленивая загрузка Фото
// * Обработчик скрола
let scrollHandler = () => {
    let windowHeight = document.documentElement.clientHeight * 1.5;
    let dishFoto = Array.from(document.getElementsByClassName('dish__foto'));
    let timerId;
    window.addEventListener('scroll', function() {
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            replacingDataAttribute(windowHeight, dishFoto);
        }, 1000);        
    })
}
scrollHandler();

// *Заменяем data-src на src
let replacingDataAttribute = (height, dishFoto) => {
    dishFoto.filter(e => {
        return e.getAttribute('data-src') && e.getBoundingClientRect().y <= height * 1.5 && e.getBoundingClientRect().y >= -(height * 0.5)
    })
    .forEach(e => {
        let url = e.getAttribute('data-src');
        e.removeAttribute('data-src')
        e.setAttribute('src', url);
    })

    
}
replacingDataAttribute(document.documentElement.clientHeight, Array.from(document.getElementsByClassName('dish__foto')))