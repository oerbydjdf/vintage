export let createPasRequest = (urlReq) => {
    let string = document.URL.split('/');
    string.splice(-1, 1, urlReq);
    let url = string.join('/');
    return url;

}