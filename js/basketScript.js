'use strict'

import { changingQuantityGoodsBasket, considerDiscount } from "./scriptAddCart.js";
import { showingPopup } from "/popup/popupModal/modal.js";
import { shovPoupClear } from "/popup/popupClear/clear.js";

// *Показываем / скрываем корзину экспортирована в'scriptAddCart'
export let showHideCart = (arrCart) => {
    let basket = document.querySelector('.basket');
    if (arrCart.length > 0 && basket.classList == 'basket basket_active') return;
    (arrCart.length > 0) ? basket.classList.add('basket_active') : basket.classList.remove('basket_active');
}

// * Считаем общую сумму товара в корзине экспортирована в'scriptAddCart'
export let countingAmount = (arrCart) => {
    let deliveryBasketTakeaway = document.querySelector('.deliveryBasket__takeaway'); 
    let totalAmount = arrCart.reduce((sum, item) => sum + +item.amount, 0);
    arrCart.forEach(e => e.takeawayDiscount = 0)
    //* Делает скидку когда кнопка "На вынос" нажата и клиент добавляет новый товар
    if(deliveryBasketTakeaway.classList.contains('deliveryBasket__btn_active')) {
        arrCart.forEach(e => e.takeawayDiscount = 10)
        let discount = arrCart.reduce((sum, item) => sum + +item.amountDiscount(), 0);
        insertingDiscount(discount);
        return (totalAmount - discount).toFixed(2);        
    }
    return totalAmount;
}

// *Вставляет сумму заказа в корзину
let taxiFare = document.querySelector('.taxi__fare');
let taxiFarePrice = taxiFare.innerHTML;
export let insertAmountIntoBasket = (amount) => {
    let basketProductAmount = document.querySelector('.basket__productAmount');
    let shippingCostTotal = document.querySelector('.shippingCost__total');
    let deliveryBasketDelivery = document.querySelector('.deliveryBasket__delivery')
    let taxiFare = document.querySelector('.taxi__fare').innerHTML;
    if(deliveryBasketDelivery.classList.contains('deliveryBasket__btn_active')) {

        basketProductAmount.innerHTML = amount + +taxiFarePrice;
        shippingCostTotal.innerHTML = amount + +taxiFarePrice;
        return;
    }
    basketProductAmount.innerHTML = amount;
    shippingCostTotal.innerHTML = amount;

}


// *Вешаем обработчик события на корзину
let handlerBasket = () => {
    let basket = document.querySelector('.basket');
    basket.onclick = (event) => {
        showingTcontentsBasket();
        handlerQuantityGoodsBasket();
    }
}
handlerBasket();

//* Показываем содержимое корзины
let showingTcontentsBasket = () => {
    let basketComposition = document.querySelector('.basketComposition');
    showingPopup();
    basketComposition.classList.add('basketComposition__active');
}

//* Скрываем содержимое корзины экспортирована в'scriptMenu'
export let hidingTcontentsBasket = () => {
    let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
    if(popupDeliveryDataActive !== null) return;
    let basketComposition = document.querySelector('.basketComposition')
    if (basketComposition.classList.contains("basketComposition__active")) {
        basketComposition.className = 'basketComposition basketComposition__position'
    }
}

// *Заполняем содержимое корзины экспортирована в'scriptAddCart'
export let fillingBasket = (arrBasket) => {
    let basketProducts = document.querySelector('.basketProducts');
    basketProducts.innerHTML = '';
    arrBasket.forEach(e => {
        let div = document.createElement('div');
        div.className = 'basketProducts__container';
        div.innerHTML = `
            <div class="basketProducts__product">
                <div class="basketProducts__foto">                    
                    <img src='${e.foto}' alt="">
                </div>
                <div class="basketProducts__productDescription">
                    <div class="basketProducts__productName">${e.name}</div>
                    <div class="basketProducts__descriptionComposition descriptionComposition">
                        <div class="descriptionComposition__optionsProduct optionsProduct">
                            ${createHtmlOptions(e)}
                        </div>
                        <div class="basketProducts__costAndWeight">
                            <div class="basketProducts__cost productPriceCommonUnit">
                                <div class="basketProducts__totalProductPrice">${e.amount}</div>
                                <div class="product__icon icon-rubles"></div>
                            </div>
                            <div class="basketProducts__weight">${e.weight}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basketProducts__quantity">
                <div class="basketProducts__quantitySelection">
                    <div class="operator basketProducts__minus">-</div>
                    <div class="basketProducts__quantityNum">${e.quantity}</div>
                    <div class="operator basketProducts__plus">+</div>
                </div>
            </div>
        `
        basketProducts.append(div);
    })
    
}

// * Создаем html с опциями
let createHtmlOptions = (elem) => {
    let options = elem.options;
    let div = '';
    options.forEach(e => {
        div += `<div class="optionsProduct__nameOptions">${e.optionName}</div>`
    })
    return div;
}

// * Вешаем обработчик на кнопку очистить в корзине
export let handlerClearBasket = () => {
    let headerBasketBtnClear = document.querySelector('.headerBasket__btnClear');
    headerBasketBtnClear.onclick = () => {
        shovPoupClear();
    }
}
handlerClearBasket();


// *Вешаем обработчик на кнопки "Доставка" и "На вынос"
export let handlerBtndelivery = () => {
    let deliveryBasketBtn = document.querySelectorAll('.deliveryBasket__btn');
    deliveryBasketBtn.forEach(e => {
        e.onclick = () => {
            changingColor(e);
            considerDiscount(e);
            changeCostDelivery();
            showingDiscount(e);
        }
    })
}
handlerBtndelivery();

// *Меняем цвет на кнопках "Доставка" и "На вынос"
let changingColor = (elem) => {
    let btnActive = document.querySelector('.deliveryBasket__btn_active');
    btnActive.classList.remove('deliveryBasket__btn_active');
    elem.classList.add('deliveryBasket__btn_active');
}

// *Изменяем стоимость доставки и обнуляем скидку
let changeCostDelivery = () => {
    let btnActive = document.querySelector('.deliveryBasket__btn_active');
    let taxiFare = document.querySelector('.taxi__fare');
    btnActive.innerHTML == 'На вынос' ? taxiFare.innerHTML = 0: taxiFare.innerHTML = taxiFarePrice;
    if(btnActive.innerHTML == 'На вынос') {
        taxiFare.innerHTML = 0;
    } else {
        taxiFare.innerHTML = taxiFarePrice;
    }
}
// * Показываем блок со скидкой при нажатии кнопки на вынос
let showingDiscount = (elem) => {
    let shippingCostBlockDiscount = document.querySelector('.shippingCost__blockDiscount');
    if(elem.classList.contains('deliveryBasket__takeaway')) {
        shippingCostBlockDiscount.classList.add('shippingCost__blockDiscount_active')
    } else {
        shippingCostBlockDiscount.classList.remove('shippingCost__blockDiscount_active')
    }
}

// *Вставляем сумму скидки
export let insertingDiscount = (discount) => {
    let discountNum = document.querySelector('.discount__num');
    discountNum.innerHTML = discount.toFixed(2);
}


// * Вешаем обработчик на кнопки с количеством товара в корзине
export let handlerQuantityGoodsBasket = () => {
    let basketQuantitySelectBtn = Array.from(document.getElementsByClassName('basketProducts__quantitySelection'));

    basketQuantitySelectBtn.forEach((e, i) => {
        e.onclick = (event) => {
            switch(event.target.className) {
                case 'operator basketProducts__minus':
                    changingQuantityGoodsBasket(i, -1);
                    amountParticularDishBasket(e, -1);
                    hidingProductBasket(changesNumberButtons(e, '.basketProducts__quantityNum', -1),i)
                  break;
                case 'operator basketProducts__plus':
                    changingQuantityGoodsBasket(i, 1);
                    amountParticularDishBasket(e, 1);
                    hidingProductBasket(changesNumberButtons(e, '.basketProducts__quantityNum', 1),i)
                  break;
            }           
        }
    })
}

// * Изменяет количество в кнопках
export let changesNumberButtons = (elem, name , one) => {
    let element = elem.querySelector(name);
    let num = element.innerHTML
    return element.innerHTML = +num + +one;
    
}

// * Считаем сумму конкретного блюда в корзине
let amountParticularDishBasket = (elem, one) => {
    let num = elem.querySelector('.basketProducts__quantityNum').innerHTML;    
    let basketProductsContainer = elem.closest('.basketProducts__container');
    let basketProductsTotalProductPrice = basketProductsContainer.querySelector('.basketProducts__totalProductPrice');
    let price = basketProductsContainer.querySelector('.basketProducts__totalProductPrice').innerHTML
    basketProductsTotalProductPrice.innerHTML = +price / num * (+num + one);
}


// * Скрываем товар из корзины если количество ноль
export let hidingProductBasket = (num ,index) => {
    if(num == 0) {
        let basketProductsContainer = Array.from(document.getElementsByClassName('basketProducts__container'));
        basketProductsContainer[index].remove();
        handlerQuantityGoodsBasket();
    }
}

// * Пересчитываем сумму за товар после изменения количества товара в корзине
export let recalculatingOrderAmount = (arrBasket, num, index) => {
    arrBasket[index].amount = (+arrBasket[index].amount / (+arrBasket[index].quantity - num)) * +arrBasket[index].quantity;

}

