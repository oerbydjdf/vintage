'use strict';
let changingPositionCross = () => {
    let menu = document.querySelector('.header__menu');
    let menuLine = Array.from(document.querySelectorAll('.menu__line'));
    menu.onclick = () => {
        menuLine[0].classList.toggle('menu__line_1');
        menuLine[1].classList.toggle('menu__line_2');
        menuLine[2].classList.toggle('menu__line_3');
        menuLine[0].classList.toggle('menu__line_1-Active');
        menuLine[1].classList.toggle('menu__line_2-Active');
        menuLine[2].classList.toggle('menu__line_3-Active');

        switchingNavigation();
    }
}
changingPositionCross();

let switchingNavigation = () => {
    let menuList = document.querySelector('.header__menuList');
    menuList.classList.toggle('header__menuList_active');
}