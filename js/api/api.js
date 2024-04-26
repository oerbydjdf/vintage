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