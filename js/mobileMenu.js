'use strict'

import { changingButtonStyles } from "./scriptMenu.js";


// * Обработчик скрола на мобильниках
let scrollHandlerMobail = () => {    
    if(document.documentElement.clientWidth > 430) return;
    let menuItems = document.querySelectorAll('.menu__item');
    changingButtonStyles(menuItems[0]) // Делаем активным первый элемент меню    
    
    let windowHeight = document.documentElement.clientHeight / 2;
    let menuCategory = Array.from(document.querySelectorAll('.menu_category'));    
    let func = () => {
        getCategoriesInCenter(menuCategory, windowHeight); 
    }
    document.onpointerdown = () => window.addEventListener('scroll', func);
    document.onpointerup = () => window.removeEventListener('scroll', func);
}
scrollHandlerMobail();

// * Получаем категории меню которые находятся в центре экрана
let cat = -1;
let getCategoriesInCenter = (elem, height) => {
    elem.forEach((e, i) => {
        if(e.getBoundingClientRect().top <= 0) {        
            return
        } else if (e.getBoundingClientRect().top <= height) {
            if(cat === i) return;
            cat = i;
            changingCoordinatesElem(i)
        }
    })
}

// * Изменяем координаты елементов меню
let changingCoordinatesElem = (item) => {
    let menuStyci = document.querySelector('.menu__styci')
    let screenWidth = document.documentElement.clientWidth / 2;
    let menuItems = document.querySelectorAll('.menu__item');
    let centerElem = menuItems[item].getBoundingClientRect().left + menuItems[item].clientWidth / 2;    
    changingButtonStyles(menuItems[item])
    menuStyci.scrollLeft += centerElem - screenWidth;
}
