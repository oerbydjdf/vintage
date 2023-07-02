'use strict'

import { hidingPopupWindow, showingPopup } from '../popupModal/modal.js';
import { wrapperForFunctions } from '../../orderDataCollectionScript.js';
import { shovPoupClear } from '../popupClear/clear.js';
import { handlerBtndelivery, handlerClearBasket, handlerQuantityGoodsBasket, changesNumberButtons, hidingTcontentsBasket } from '../../basketScript.js';
import { togleChoiceDeliveryTime, definingСurrentTimeCurrentDay, handlerDeliveryTimeChoose } from '../popupDeliveryTime/delyveryTime.js';
import { clickFormPayment, receiveOrderAmount } from '../popupFormPayment/formPayment.js';
import { settingFocus, validation } from './validationScript.js';

// *Вешаем обработчик события на кнопку в корзине
let handlerMakingOrder = () => {
    let amountToBePaid = document.querySelector('.amountToBePaid__totalAmount');
    amountToBePaid.onclick = () => {
        hidingPopupWindow();
        hidingTcontentsBasket();
        activateBlockFillData();
        hidingAddressForm();
        handlerAllFildata();
        handlerChooseTime();
        cloningContentsBasket();
        showingBlockBasket();
        handlerClear();
        handlerInsrumentation();
        settingFocus();
        document.body.style.overflow = "hidden";
    }
}
handlerMakingOrder();

// *Вешаем обработчик на все окно для заполнения данных
let handlerAllFildata = () => {
    let deliveryDataContent = document.querySelector('.popup__deliveryData ');
    deliveryDataContent.onclick = (event) => {
        hidingTimeWhenDeliver();
        turnArrow2();
    }
}

// * Активируем окно для заполнение данных
let activateBlockFillData = () => {
    let deliveryDataContent = document.querySelector('.popup__deliveryData');
    deliveryDataContent.classList.add('popup__deliveryData_active');
}

// *Вешаем обработчик на кнопку "назад" в окне заполнения данных и скрываем окно
let handlerBack = () => {
    let deliveryDataBack = document.querySelector('.deliveryData__back');
    deliveryDataBack.onclick = () => {
        let deliveryDataContent = document.querySelector('.popup__deliveryData ');
        deliveryDataContent.classList.remove('popup__deliveryData_active');
        movingBasketToMenu();
        deleteDataAtribute();    
        document.body.style.overflow = "";
    }
}
handlerBack();


// * Вешаем обработчик на блок со стрелкой для выбора времени доставки
let handlerTimeArow = () => {
    let termsDeliveryTime = document.querySelector('.termsDelivery__time');
    termsDeliveryTime.onclick = (event) => {
        event.stopPropagation();
        turnArrow();
        shovTimeWhenDeliver();
    }
}
handlerTimeArow();

// * Поварачиваем стрелку
let turnArrow = () => {
    let timeArow = document.querySelector('.time__arow');
    timeArow.classList.toggle('time__arow_active');
}
// * Поварачиваем стрелку при клике не по стрелке
let turnArrow2 = () => {
    let timeArow = document.querySelector('.time__arow');
    timeArow.classList.remove('time__arow_active');
}

// *Показываем/скрываем блок с выбором срока доставки
let shovTimeWhenDeliver = () => {
    let timeWhenDeliver = document.querySelector('.time__whenDeliver');
    timeWhenDeliver.classList.toggle('time__whenDeliver_active');
}
// *Скрываем блок с выбором "текущего времени" или "выбрать время" доставки при клике по кнопке назад
let hidingTimeWhenDeliver = () => {
    let timeWhenDeliver = document.querySelector('.time__whenDeliver');
    timeWhenDeliver.classList.remove('time__whenDeliver_active');
}

// * Скрываем форму для заполнения адреса при выборе опции "На вынос"
let hidingAddressForm = () => {
    let deliveryBasketBtnActive = document.querySelector('.deliveryBasket__btn_active');
    if(deliveryBasketBtnActive.innerHTML == 'На вынос') {
        let termsDeliveryPlaceDelivery = document.querySelector('.termsDelivery__placeDelivery');
        termsDeliveryPlaceDelivery.classList.add('termsDelivery__placeDelivery_disable');
    } else {
        let termsDeliveryPlaceDelivery = document.querySelector('.termsDelivery__placeDelivery');
        termsDeliveryPlaceDelivery.classList.remove('termsDelivery__placeDelivery_disable');
    }
}

// *Вешаем обработчик на блок с "Выбрать время" и "Текущее"
let handlerChooseTime = () => {
    let timeDateDeliver = document.querySelectorAll('.time__dateDeliver');
    timeDateDeliver.forEach((e, i) => {
        e.onclick = (event) => {
            if(i === 0) {
                deliveryTimeSelectionSwitch(e);
                settingCurrentTime();
            } else {
                showingPopup();
                togleChoiceDeliveryTime();
                definingСurrentTimeCurrentDay();
                handlerDeliveryTimeChoose();
                deliveryTimeSelectionSwitch(e);
            }
        }
    })
}

// *Переключатель выбора на блоке "time__whenDeliver"
let deliveryTimeSelectionSwitch = (elem) => {
    let timeWhenDeliver = document.querySelector('.time__whenDeliver');
    let timingIconSvgActive = timeWhenDeliver.querySelector('.timing__iconSvg_active');
    timingIconSvgActive.classList.remove('timing__iconSvg_active');
    elem.querySelector('.timing__iconSvg').classList.add('timing__iconSvg_active'); 
}

// *Устанавливаем текущее время доставки при выборе текущекго времени на блоке "time__whenDeliver"
let settingCurrentTime = () => {
    document.querySelector('.time__time').innerHTML = 'Текущее';
}


// * Вешаем события на блок с "instrumentation__wraper"
let handlerInsrumentation = () => {
    let orderInstrument = document.querySelector('.instrumentation__wraper');
    orderInstrument.onclick = () => {
        showChoiceNumberDevices();
        handlerinstrumentQuantityActive();
    }
}

// * Показываем "instrumentation__quantity_active" выбор количества приборов
 let showChoiceNumberDevices = () => {
    let instrumentationQuantity = document.querySelector('.instrumentation__quantity');
    instrumentationQuantity.classList.add('instrumentation__quantity_active');
    instrumentationQuantity.querySelector('.instrumentation__quantityNum').innerHTML = 1;
 }


// * Вешаем обработчик на блок ".instrumentation__quantity_active"
let handlerinstrumentQuantityActive = () => {
    let instrumentationQuantityActive = document.querySelector('.instrumentation__quantity_active');
    instrumentationQuantityActive.onclick = (event) => {
        switch(event.target.className) {
            case 'operator instrumentation__minus':
                let num = changesNumberButtons(instrumentationQuantityActive, '.instrumentation__quantityNum', -1)
                hidinginstrumentQuantityActive(num);
                break;
                case 'operator instrumentation__plus':
                changesNumberButtons(instrumentationQuantityActive, '.instrumentation__quantityNum', 1);
              break;
        } 
    }
}

// * Скрываем блок ".instrumentation__quantity_active"
let hidinginstrumentQuantityActive = (num) => {
    if(num == 0) {
        let instrumentationQuantityActive = document.querySelector('.instrumentation__quantity_active');
        instrumentationQuantityActive.classList.remove('instrumentation__quantity_active');
        document.querySelector('.instrumentation__quantityNum').innerHTML = 'Без приборов';
    }
} 


// *Кланируем содержимое корзины и вставляем ее 
let cloningContentsBasket = () => {
    let basketCompositionBasketProducts = document.querySelector('.basketComposition');
    let basketClone = basketCompositionBasketProducts.cloneNode(true);
    basketCompositionBasketProducts.innerHTML = '';
    let blockOrder = document.querySelector('.order__basket');
    blockOrder.insertAdjacentHTML('beforeend', basketClone.innerHTML);
    handlerQuantityGoodsBasket();
    handlerToPay();
    installDataAtribute();
    
}

// * Вешаем обработчик на кнопку очистить
let handlerClear = () => {
    let headerBasketBtnClear = document.querySelector('.headerBasket__btnClear');
    headerBasketBtnClear.onclick = () => {
        showingPopup();
        shovPoupClear();
    }
}

// * Устанавливаем data-atribute на активную форму доставки
let installDataAtribute = () => {
    let deliveryBasketBtnActive = document.querySelector('.deliveryBasket__btn_active');
    deliveryBasketBtnActive.setAttribute('data-order', 'typeOfDelivery')
}

// * Удаляем data-atribute на активную форму доставки
let deleteDataAtribute = () => {
    let deliveryBasketBtnActive = document.querySelector('.deliveryBasket__btn_active');
    deliveryBasketBtnActive.removeAttribute('data-order')
}


// *Переносим корзину назад в меню при клике по кнопке "назад"
let movingBasketToMenu = () => {
    let basketCompositionPosition = document.querySelector('.basketComposition__position');
    let orderBasket = document.querySelector('.order__basket');
    basketCompositionPosition.innerHTML = orderBasket.innerHTML;
    orderBasket.innerHTML = '';
    handlerQuantityGoodsBasket();
    handlerMakingOrder();
    handlerClearBasket();
    handlerBtndelivery();
}

// * Скрываем блок с корзиной после очистки
export let hidingBlockBasket = () => {
    let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
    if(popupDeliveryDataActive !== null) {
        let orderBasket = document.querySelector('.order__basket');
        orderBasket.hidden = true;
    }
}

// * Покзываем блок с корзиной
let showingBlockBasket = () => {
    let orderBasket = document.querySelector('.order__basket');
    if(orderBasket.hasAttribute('hidden')) orderBasket.hidden = false;
}

// * Вешаем обработчик на кнопку "amountToBePaid__totalAmount" оплаты
let handlerToPay = () => {
    let amountToBePaidTotalAmount = document.querySelector('.amountToBePaid__totalAmount');
    amountToBePaidTotalAmount.onclick = () => {
        // clickFormPayment();
        if(!validation()) {
            wrapperForFunctions();
            receiveOrderAmount();
            clickFormPayment();
        } else {
            document.querySelector('.popup__deliveryData_active').scrollTop = 0;
        }
    }
}
