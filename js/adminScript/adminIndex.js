'use strict'
    
    // * Поварачиваем стрелку
let timeArow = document.querySelectorAll('.time__arow');
export let  turnArrow = (i) => {
    timeArow[i].classList.toggle('time__arow_active');
}

// * Скрывае или показываем category__listDishes
let categoryListDishes  = document.querySelectorAll('.category__listDishes');
export let togleCategoryListDishes  = (i) => {
    if(categoryListDishes[i].style.maxHeight) {
        categoryListDishes[i].style.maxHeight = null;
    } else {
        categoryListDishes[i].style.maxHeight = categoryListDishes[i].scrollHeight + 'px'; 
    }
}


// * Скрывае или показываем listDishes__stop 'Недоступно'
let listDishesStop = document.querySelectorAll('.listDishes__stop');
export let togleListDishesStop = (i) => {
    listDishesStop[i].classList.toggle('listDishes__stop_active');
}

// * Записываем сколько позиций в стоп листе
let stoplistNum = document.querySelector('.stoplist__num');
export let recordPositionsStopList = () => {
    let numUnavailableDishes = document.querySelectorAll('[checked]');
    stoplistNum.innerHTML = `Позиций в стоп листе: ${numUnavailableDishes.length}`
}
recordPositionsStopList();

//* Устанавливаем или убераем атрибут checked
export let togleChecked = (e) => {
    (e.hasAttribute('checked')) ? e.removeAttribute('checked') : e.setAttribute('checked', true);
}

// * Количесьво блюд в стопе в кокретной категории запись при клике на инпуте
let dishesCategory = document.querySelectorAll('.dishes__category');
export let stoplistDishesNum = (e) => {
    let index = e.getAttribute('data-index');
    let numChecked = dishesCategory[index].querySelectorAll('[checked]').length;
    let categoriQuantStop = document.querySelectorAll('.categori__quantStop');
    numChecked ? categoriQuantStop[index].innerHTML = numChecked : categoriQuantStop[index].innerHTML = '';
}

// * Количесьво блюд в стопе в кокретной категории запись при первой загрузке
let stoplistDishesNumLoading = () => {
    dishesCategory.forEach((e, i) => {
        let elemChecked = e.querySelectorAll('[checked]').length;
        let categoriQuantStop = document.querySelectorAll('.categori__quantStop');
        elemChecked ? categoriQuantStop[i].innerHTML = elemChecked : categoriQuantStop[i].innerHTML = '';
    })
}
stoplistDishesNumLoading();