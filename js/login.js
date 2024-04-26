'use strict'

import { sendingData } from "./api/api.js";
import { createPasRequest } from "./helpersScript/createPasRequest.js";

document.querySelector('.btnLogin').onclick = async () => {
    let data = await sendingData(dataInputs(), "/adminLogin", "POST");
    errorMessege(data);
    redirect(data);
}

// * Получаем данные из инпутов
let dataInputs = () => {
    let input = document.getElementsByTagName('input');
    let data = {
        login: input[0].value,
        password: input[1].value,
    }
    return data;
};

// * Отправляем данные
// let sendingData = async (data) => {
//     let response = await fetch("/adminLogin", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(data),

//     });
//     let result = await response.json();    
//     return result;
// }

// * Выводим собщенеи об ошибке
let errorMessege = (data) => {
    let divError = document.querySelector('.error');
    (data === '404') ? divError.innerHTML = 'Неправильный логин или пароль' : divError.innerHTML = '';
    
};

// *Перенаправление на страницу админ
let redirect = (data) => {
    if(data === "200") {
        window.location.href = createPasRequest('admin/adminIndex')        
    } 
}

