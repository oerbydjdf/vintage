'use strict'
export let loaderTogl = (logic) => {
    let loader = document.querySelector('.loader_no');    
    (logic) ? loader.classList.add('loader'): loader.classList.remove('loader');
}