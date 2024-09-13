'use strict'
export let sendingData = async (data, url, method) => {
    let response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
        
    });
    let result = await response.json();  
    return result;
}

//* Функция повторного запроса при ошибке сервере

export let delayedLoop = async (func, data, url, method) => {
    let res3 = 0;
    for (let i = 0; i < 3; i++) {
        let res = await func(data, url, method)
        if (res == 'error') {
            await new Promise(resolve => setTimeout(resolve, 3000));      
        } else { 
            res3 = res
            i = 3
        }
        if (res == 'error' && i === 4) res3 = res      
    }
    return res3
  }