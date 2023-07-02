'use strict';
import { creatingDishObj } from "./scriptAddCart.js";
import { creatingDishObjPopup } from "./scriptAddCart.js";
import { getSelectedOptions } from "./scriptAddCart.js";



let addProductBtn = () => {
    let dishButton = document.querySelectorAll('.dish__button');
    dishButton.forEach(e => {
        e.onclick = (event) => {            
            if(checkingOptions(e)) {                
                event.stopPropagation();
                replacingButton(e);
                changingQuantityProduct(event);
                replacingButtonAdd(e);
                return;
            }
            // *Изменяем количестово товара в кнопке "+ 0 -" когда она находится на карточке товара
            if(event.target.className == 'btn__plus' || event.target.className == 'btn__minus') {
                event.stopPropagation();
                changingQuantityProduct(event);
                replacingButtonAdd(e);
                return;
            }
        }
    });        
}
addProductBtn();

export let weightFinishedDish = '';

// * Срабатывают при клике по самой карточке товара, экспортируется в "scriptMenu" 
let func = (e) => {
    changingQuantityProductPopup();
    transferQuantityBetweenBtn(e);
    hangingAmountProduct();
    weightFinishedDish = getsWeight(e);
}
export {func};

// *Проверяем есть ли доп. опции к товару
let checkingOptions = (e) => {
    let elem = e.parentElement;
    let dishOptions = elem.querySelector('.dish__options');
    let optionText = (dishOptions.innerHTML||"").replace(/\s*\n\s*/g,"");
    if(optionText === '') return true;
    return false;
}

// *Заменяем кнопку "Добавить" на кнопку добавления товаров "+ 0 -"
let replacingButton = (btn) => {
    btn.children[0].classList.add('dish__btn_none');
    btn.children[1].className = 'btn__quantity btn__quantity_active';
    if( btn.children[1].children[1].innerHTML >= 1) return;
    btn.children[1].children[1].innerHTML = 1;
}

// *Изменяем количестово товара в кнопке "+ 0 -"
let changingQuantityProduct = (event) => {
    let target = event.target;
    let btnNum = target.parentElement.querySelector('.btn__num');
    if(target.className === 'btn__plus') {
        // let btnNum = target.parentElement.querySelector('.btn__num');
        let quantity = btnNum.innerHTML;
        btnNum.innerHTML = +quantity + 1;
        changingAmountGoods(target);
    }
    if(target.className === 'btn__minus') {
        // let btnNum = target.parentElement.querySelector('.btn__num');
        let quantity = btnNum.innerHTML;
        btnNum.innerHTML = +quantity - 1;
        changingAmountGoods(target);
    }
    
    creatingDishObj(target)
}

// *Заменяем кнопку "+ 0 -"  с количеством добавленных товаров на кнопку "Добавить"
let replacingButtonAdd = (elem) => {
    let btnNum = elem.querySelector('.btn__num');
    if(btnNum.innerHTML == 0) {
        let btnQuantityActive = elem.querySelector('.btn__quantity_active');
        let dishBtnNone = elem.querySelector('.dish__btn_none');
        btnQuantityActive.className = 'btn__quantity_none';
        dishBtnNone.className = 'dish__btn';
    }
}

// *Изменяем количестово товара в кнопке "+ 0 -" 'Popup'
let changingQuantityProductPopup = () => {
    let btnAdd = document.querySelector('.btn__add');
    let btnNum = btnAdd.querySelector('.btn__num');
    btnAdd.onclick = (event) => {
        changingQuantityProduct(event);
        // console.log(btnNum)
        if(btnNum.innerHTML < 1) btnNum.innerHTML = 1;
    }
}

// *Переносим количество товара из кнопки в popupe в кнопку на карточке товара и заменяем ее на "+ 0 -"
// *Вешаем обработчик события на кнопку "Добавить" в popup
let transferQuantityBetweenBtn = (elem) => {
    let btnButton = document.querySelector('.btn__button');
    btnButton.onclick = (event) => {
        creatingDishObjPopup();
        
        let btnAdd = document.querySelector('.btn__add');
        let btnNum = btnAdd.querySelector('.btn__num');
        let elemNum = elem.querySelector('.btn__num');
        
        
        document.querySelector('.popup_active').className = 'popup';
        document.querySelector('.popup__composDishes_active').className = 'popup__composDishes';
        document.body.style.overflow = "";
        if(elemNum.innerHTML == 0) {
            replacingButton(elem)
            elemNum.innerHTML = +elemNum.innerHTML + +btnNum.innerHTML - 1;
            btnNum.innerHTML = 0;
            return;
        }
        replacingButton(elem)
        elemNum.innerHTML = +elemNum.innerHTML + +btnNum.innerHTML;
        btnNum.innerHTML = 0;


    }
}

// *Измееняем сумму выбранного товара добавляя/убирая опции, вешаем обработчик события на чекбоксы
let hangingAmountProduct = () => {
    let myCheckbox = document.querySelectorAll('.my-checkbox');
    let popupBtn = document.querySelector('.popup__btn');
    let btnNum = popupBtn.querySelector('.btn__num');
    let popupRate = popupBtn.querySelector('.popup__rate');
    myCheckbox.forEach(e => {
        e.onclick = () => {
            if(e.checked) {
                popupRate.innerHTML = +e.value * +btnNum.innerHTML + +popupRate.innerHTML;
            } else {
                popupRate.innerHTML = +popupRate.innerHTML - (+e.value * +btnNum.innerHTML);
            }
            getSelectedOptions(myCheckbox);
        }
    })
}

// *Изменяем сумму товара при изменении количества товара
let changingAmountGoods = (targ) => {
    let popupBtn = document.querySelector('.popup__btn');
    let btnNum = popupBtn.querySelector('.btn__num');
    let popupRate = popupBtn.querySelector('.popup__rate');
    if(targ.className === 'btn__plus') {
        // popupRate.innerHTML = +popupRate.innerHTML * +btnNum.innerHTML
        popupRate.innerHTML = (+popupRate.innerHTML / (+btnNum.innerHTML - 1)) * +btnNum.innerHTML;
        // console.log('plus' + ' ' + btnNum.innerHTML)
    }
    if(targ.className === 'btn__minus') {
        // popupRate.innerHTML = +popupRate.innerHTML / (+btnNum.innerHTML + 1)
        if(btnNum.innerHTML == 0) return;
        popupRate.innerHTML = (+popupRate.innerHTML / (+btnNum.innerHTML + 1)) * +btnNum.innerHTML;
        // console.log('minus' + ' ' + btnNum.innerHTML)
    }

}

//* Получает вес товара
let getsWeight = (elem) => {
    return elem.closest('.menu__dish').querySelector('.dish__weight').innerHTML;
}


