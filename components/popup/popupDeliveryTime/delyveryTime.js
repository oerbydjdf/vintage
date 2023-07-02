'use script'

import { hidingPopupWindow } from "../popupModal/modal.js";

// *Вешаем обработчик на блок с выборром дня доставки "Сегодня" и "Завтра"
let handlerDayDelyvery = () => {
    let dayBtn = document.querySelectorAll('.day__btn');
    dayBtn.forEach(e => {
        e.onclick = () => {
            changingColorDay(e);
            definingСurrentTimeCurrentDay();
            handlerDeliveryTimeChoose();
        }
    })
}
handlerDayDelyvery();

// *Меняем цвет на кнопках "Сегодня" и "Завтра"
let changingColorDay = (elem) => {
    let btnActive = document.querySelector('.day_active');
    btnActive.classList.remove('day_active');
    elem.classList.add('day_active');
}

// *Определяем текущее время для доставки при выборе "Сегодня" или "завтра"
export let definingСurrentTimeCurrentDay = () => {
    let dayToday = document.querySelector('.day__today');
    if(dayToday.classList.contains('day_active')) {
        let date = new Date();
        let hours = date.getHours();
        if(60 - +date.getMinutes() >= 40) {
            date.setHours(+hours + 1);
            date.setMinutes(0);
            creatingTime(date);
        } else {
            date.setHours(+hours + 1);
            date.setMinutes(30);
            creatingTime(date);
        }        
    } else {
        let date = new Date();
        date.setHours(12, 0)
        creatingTime(date);
    }

    handlerBlockTime();
}

// * Создаем время для выбора доставки
let creatingTime = (date) => {
    let hours = date.getHours();
    let min = date.getMinutes();
    let deliveryTimeTiming = document.querySelector('.deliveryTime__timing');
    deliveryTimeTiming.innerHTML = '';

    while ((hours + ':' + min) !== '22:30') {
        if(min == 0) min = '00';
        deliveryTimeTiming.insertAdjacentHTML(
            'beforeend',
            `<div class="timing__time">
            <div class="timing__num">${hours}:${min}</div>
            <div class="timing__iconSvg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                    <path d="M7 12s2.5 5 3.5 5 6-10 6-10" stroke="#1F2021" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>`
        );
        min = date.getMinutes(date.setMinutes( date.getMinutes() + 30));
        hours = date.getHours();
    }
}

// *Показываем или скрываем окно с выбором времени доставки
export let togleChoiceDeliveryTime = () => {
    let popupDeliveryTime = document.querySelector('.popup__deliveryTime');
    popupDeliveryTime.classList.toggle('popup__deliveryTime_active');
    document.body.style.overflow = "hidden";
}
export let disableChoiceDeliveryTime = () => {
    let popupDeliveryTime = document.querySelector('.popup__deliveryTime');
    popupDeliveryTime.classList.remove('popup__deliveryTime_active');
    let popupDeliveryDataActive = document.querySelector('.popup__deliveryData_active');
    if(popupDeliveryDataActive !== null) document.body.style.overflow = "hidden";
    
}

// *Вешаем обработчики на блоки с временем
let handlerBlockTime = () => {
    let timingTime = document. querySelectorAll('.timing__time');
    timingTime.forEach(e => {
        e.onclick = () => {
            toggleTimeTick(e);
        }
    })
}

// *Показываем скрываем галочку при выборе времени доставки
let toggleTimeTick = (elem) => {    
    let popupDeliveryTime = document.querySelector('.popup__deliveryTime'); 
    let timingIconSvg = popupDeliveryTime.querySelector('.timing__iconSvg_active');
    if(timingIconSvg === null) {
        elem.querySelector('.timing__iconSvg').classList.add('timing__iconSvg_active');
        elem.classList.add('timing__time_active')
    } else {
        popupDeliveryTime.querySelector('.timing__time_active').classList.remove('timing__time_active');
        timingIconSvg.classList.remove('timing__iconSvg_active')        
        elem.querySelector('.timing__iconSvg').classList.add('timing__iconSvg_active');
        elem.classList.add('timing__time_active')
    }

}

// *Вешаем обработчки на кнопку "Выбрать" время доставки
export let handlerDeliveryTimeChoose = () => {
    let deliveryTimeChoose = document.querySelector('.deliveryTime__choose');
    deliveryTimeChoose.onclick = () => {
        getAndInsertTime();
        hidingPopupWindow();
        disableChoiceDeliveryTime();
    }
}

// *Получаем выбранное время доставки и вставляем в поле времени доставки (Текущее время)
let getAndInsertTime = () => {
    let timingTimeActive = document.querySelector('.timing__time_active');
    if(timingTimeActive === null) {
        let timeWhenDeliver = document.querySelector('.time__whenDeliver');
        timeWhenDeliver.querySelectorAll('.time__dateDeliver')[0].click();
        return;
    }
    let dayActive = document.querySelector('.day_active').innerHTML;
    let timingNum = timingTimeActive.querySelector('.timing__num').innerHTML;
    let timeTime = document.querySelector('.time__time');
    timeTime.innerHTML = dayActive + ' ' + timingNum;
}