'use strict'

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