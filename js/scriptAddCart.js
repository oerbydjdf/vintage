'use strict';
import { fotoUrlPopup } from "./scriptMenu.js";
import { showHideCart, countingAmount, fillingBasket, insertAmountIntoBasket, recalculatingOrderAmount, insertingDiscount } from "./basketScript.js";
// import { clearBasket } from "../";
import { weightFinishedDish } from "./scriptaddBtn.js";
import { clearBasket } from "/popup/popupClear/clear.js";


export let basket = [];

function ObgDish(name, options, quantity, amount, foto, weight) {
    this.name = name;
    this.options = options;
    this.quantity = quantity;
    this.amount = amount;
    this.foto = foto;
    this.weight = weight;
}
// *Создаем новый обьект блюда для добавления в корзину при клике на кнопку "Добавить" на карточке товара
let creatingDishObj = (target) => {
    if(target.className == 'btn__num' || target.className == 'btn__quantity btn__quantity_active') return;
    let menuDish = target.closest('.menu__dish');
    if(menuDish === null) return;
    let dishNname = menuDish.querySelector('.dish__name').innerHTML;    
    let dishRatePrice = menuDish.querySelector('.dish__ratePrice').innerHTML;
    let dishFoto = menuDish.querySelector('.dish__foto').getAttribute('src');
    let dishWeight = menuDish.querySelector('.dish__weight').innerHTML;

    let name = (dishNname||"").replace(/\s*\n\s*/g,"");
    let options = [];
    let quantity = (target.className === 'btn__minus')? -1: 1;
    let amount = dishRatePrice;
    // let obgDish = new ObgDish(name, options, quantity, +amount, dishFoto)
    let obgDish = new ObgDish(name, options, quantity, +amount, dishFoto, dishWeight)
    addingToCart(obgDish, target);
    // console.log(obgDish.foto)
    // console.log(dishFoto)
    

}
export {creatingDishObj}

// * Создаем новый обьект блюда для добавления в корзину при клике на кнопку "Добавить" popup

let arrNameOptions = [];
export let creatingDishObjPopup = () => {
    let popupActive = document.querySelector('.popup_active');
    // let dishNamePopup = popupActive.querySelector('.dish__name-popup').innerHTML.replace(/\s*\n\s*/g,"");
    let dishNamePopup = document.querySelector('.dish__name-popup').innerHTML.replace(/\s*\n\s*/g,"");
    // let btnNum = popupActive.querySelector('.btn__num').innerHTML;
    let btnNum = document.querySelector('.popup__btnNum').innerHTML;
    let popupRate = document.querySelector('.popup__rate').innerHTML;
    let obgDish = new ObgDish(dishNamePopup, arrNameOptions, +btnNum, +popupRate, fotoUrlPopup, weightFinishedDish);
    addingToCart(obgDish)
    arrNameOptions = [];
}
//  {creatingDishObjPopup}

// * Получаем названия выбранных опций
export let getSelectedOptions = (e) => {
    let optionName = document.querySelectorAll('.name');
    let optionPrice = document.querySelectorAll('.price');
    
    arrNameOptions = [];
    e.forEach((elem, i) => {
         if(elem.checked) {
            //  arrNameOptions.push(optionName[i].innerHTML);
             arrNameOptions.push({optionName: optionName[i].innerHTML, optionPrice: +optionPrice[i].innerHTML});
            //  console.log({optionName: optionName[i].innerHTML, optionPrice: +optionPrice[i].innerHTML});
         }
        });
}
//  {getSelectedOptions}

// *Отправляем обьект блюда в массив если его нет или изменяем его опции при его наличии
let addingToCart = (obj, target = 'popup') => {
    let objIndex = checkingAvailability(obj, target);

    if(objIndex === -1) {
        basket.push(obj);
        // console.log(basket)

    }  else if(target == 'popup') {
        basket[objIndex].quantity += +obj.quantity;
        basket[objIndex].amount = +obj.amount + +basket[objIndex].amount;
        // console.log(basket)


    } else {
        let quantityNow = +basket[objIndex].quantity;
        let quantityAfter = +basket[objIndex].quantity + +obj.quantity;
        basket[objIndex].quantity += +obj.quantity;
        basket[objIndex].amount = (+basket[objIndex].amount / quantityNow) * +quantityAfter;
        removingDishArr(basket[objIndex].quantity, objIndex)
        // console.log(basket)
    }

    showHideCart(basket);
    insertAmountIntoBasket(countingAmount(basket));
    // countingAmount(basket);
    fillingBasket(basket);
    
}

// *Проверяе наличие блюда в корзине
let checkingAvailability = (obj, target) => {
    if(target == 'popup'){
        return basket.findLastIndex (item => item.name == obj.name && compareOptions(item, obj));
    } else {
        return basket.findLastIndex (item => item.name == obj.name);
    }
}

// *Сравниваем опции у добавляемого блюда(обьекта)
let compareOptions = (item, obj) => {    
    if (item.options.join(',') === obj.options.join(',')) return true;
    return false;     
}

// *Удаляем блюдо из массива если количество ноль
let removingDishArr = (quantity, i) => {
    if(quantity != 0) return;
    basket.splice(i, 1);
    // console.log(basket)
}

// * Очищаем корзину
export let clearArrBasket = () => basket = [];

// *Считаем скидку при нажатии кнопки "На вынос"
export let considerDiscount = (elem) => {
    if(elem.classList.contains('deliveryBasket__takeaway')) {
        insertAmountIntoBasket(countingAmount(basket));
        return;
    }    
    return insertAmountIntoBasket(countingAmount(basket));    
}

// * Изменяем количество конкретного товара в 'basket' кнопками + или - находящимися внутри корзины
export let changingQuantityGoodsBasket = (index, num) => {
    basket[index].quantity = basket[index].quantity + num;
    // changingQuantityProductButtCart(basket[index].quantity, index);
    changingQuantityGoodsMenu(basket, index, num)
    // console.log(basket[index])
    recalculatingOrderAmount(basket, num, index)
    removingDishArr(basket[index].quantity, index)
    insertAmountIntoBasket(countingAmount(basket));
    // fillingBasket(basket);
    if(basket.length == 0) clearBasket();
}

// *Изменяем количество товара на кнопках в карточке товара в меню при измененик количества в корзине
let changingQuantityGoodsMenu = (arrBasket, index, num) => {
    let btnActive = document.querySelectorAll('.btn__quantity_active');
    btnActive.forEach(e => {        
        let nameDish = e.closest('.menu__dish').querySelector('.dish__name').innerHTML.replace(/\s*\n\s*/g,"");
        if(nameDish == arrBasket[index].name) {
            let quantity = +e.querySelector('.btn__num').innerHTML; 
            e.querySelector('.btn__num').innerHTML = quantity + num;
            if(e.querySelector('.btn__num').innerHTML == 0) {
                e.className = 'btn__quantity_none';
                e.closest('.dish__button').querySelector('.dish__btn_none').className = 'dish__btn';
            }
        }
    })
}

