import { 
    recordPositionsStopList,
    togleListDishesStop,
    togleCategoryListDishes,
    togleChecked,
    turnArrow,
    stoplistDishesNum,
} from "./adminIndex.js";
import {
    entryStopList,
    newStopList,
    comparingStopLists,
    removeDisabledBtn,
    addDisabledBtn,
    clearNewStopList,
 } from "./changingStopList.js";
 import {sendingData} from '../api/api.js'
import { hidingPopupWindowAdmin, insertingData, receiveTheseDishes, recordingDishId, savingChangeData, selectedDish, showingPopupAdmin, writingDataEditedDish,} from "./adminIndexMenu.js";


// * Вешаем обработчик на time__arow
let handlerTimeArow = () => {
    document.querySelectorAll('.category__management')
    .forEach((e, i) => {
        e.onclick = (event) => {
            turnArrow(i);
            togleCategoryListDishes(i);
        }
        })
}
handlerTimeArow();

// * Вешаем обработчики на инпуты
let handlerInput = () => {
    document.querySelectorAll('.inputStop')
    .forEach((e, i) => {
        e.onclick = () => {
            togleChecked(e);
            togleListDishesStop(i);
            recordPositionsStopList();
            stoplistDishesNum(e);
        }
    })
}
handlerInput();

// * Вешаем доп обработчик на инпут для удаления дизейбла с кнопки сохранить
let handlerInputAddEvent = () => {
    document.querySelectorAll('input')
    .forEach((e, i) => e.addEventListener('click', removeDisabledBtn))
}
handlerInputAddEvent();



// * Вешаем обработчик на кнопку сохранить
let handlerButSave = () => {
    document.querySelector('.but__save')
    .onclick = async () => {
        entryStopList(newStopList);
        let data = comparingStopLists();
        let res = await sendingData(data, '/newstoplist', 'POST');
        if(res.status == 200) {
            addDisabledBtn()
            handlerInputAddEvent();
            clearNewStopList();
            alert('Стоп лист обновлен')
        } else {
            alert('Что-то не так, попробуйте сохранить еще раз!!!')
        }
    }
}
handlerButSave();

// * Вешаем обработчик на меню и делаем переключение
let handlerMenu = () => {
    document.querySelectorAll('.menu__item')
    .forEach((e, i) => {
        e.onclick = () => {
            let menuStopList = Array.from(document.querySelectorAll('.menu__stopList'))
            let obgStolist = menuStopList.find(item => item.className === 'menu__stopList stoplist');
            if(menuStopList[i].classList.contains("menu__stopList_none")) {
                obgStolist.classList.add("menu__stopList_none")
                menuStopList[i].classList.remove("menu__stopList_none")
            }
        }
    })
}
handlerMenu();

// * Вешаем обработчик на меню с блюдами для редакции
document.querySelectorAll('.listDishes__managementMenu')
.forEach(e => {
    e.onclick = () => {
        showingPopupAdmin()
        recordingDishId(e)
        let data = receiveTheseDishes(e)
        insertingData(data)
        document.querySelector('.popup__composDishes').classList.add('popup__composDishes_active')
    }
})


// * Вешаем обработчик на popup__close 
document.querySelector('.popup__close').onclick = () => {
    hidingPopupWindowAdmin();
    document.querySelector('.popup__composDishes').classList.remove('popup__composDishes_active')
}

// * Вешаем обработчик на кнопку сохранить в popup__composDishes
document.querySelector('.btn__button').onclick = async () => {
    hidingPopupWindowAdmin();
    document.querySelector('.popup__composDishes').classList.remove('popup__composDishes_active')

    let newdataDishes = savingChangeData();
    let res = await sendingData(newdataDishes, '/newPriceComposition', 'POST');
    if(res.status == 200) {
        writingDataEditedDish(selectedDish, newdataDishes)
        alert('Меню обновлено')
    } else {
        alert('Что-то не так, попробуйте сохранить еще раз!!!')
    }
}