
let stopList = [];
export let newStopList = [];

// * Записываем стоплист 
export let entryStopList = (arr) => {
    let stoplistDishes = document.querySelectorAll('[checked]');
    
    stoplistDishes.forEach(e => {
        let dishesStop = {name: '', availability: '',};
        dishesStop.name = e.value;
        dishesStop.availability = 'да';
        arr.push(dishesStop);
    })
}
entryStopList(stopList);

// * Сравниваем новый и старый стоп лист
export let comparingStopLists = () => {
    stopList.forEach(e => {
        let index = newStopList.findIndex(item => item.name == e.name);
        if(index < 0) {
            e.availability = 'нет'
            newStopList.push(e);
        }
    })
    return newStopList;
}

// * Удаляем дизейбл с кнопки сохранить при первом клике на инпут
export let removeDisabledBtn = () => {
    let butSave = document.querySelector('.but__save')
    butSave.removeAttribute('disabled')
    removeClick()
}

// * Устанавливаем обратно дизейбл
export let addDisabledBtn = () => {
    let butSave = document.querySelector('.but__save')
    butSave.setAttribute('disabled', true)
}

// * Удаляем обработчик события
let removeClick = () => {
    document.querySelectorAll('.inputStop')
    .forEach((e) => e.removeEventListener('click', removeDisabledBtn))
}


// *Перезаписываем стоп листы после ответа от сервера
export let clearNewStopList = () => {
    stopList = [];
    newStopList = [];
    entryStopList(stopList);
}



