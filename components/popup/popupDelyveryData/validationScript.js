'use strict'
// * Устанавливаем фокус на первый инпут "Улица и дом"



let normalizePhone = () => {
  let termsDeliveryPlaceDelivery = document.querySelector('.block__termsDelivery');
  let input = termsDeliveryPlaceDelivery.querySelector('input[name=phone');

  input.onclick = () => input.value = '+7';

  input.addEventListener('keyup', function(event) {
    if(event.key == 'Backspace' || event.key == 'Delete') return;
    if(input.value.length == 5) input.value += '-';
    if(input.value.length == 8) input.value += '-';
    if(input.value.length == 11) input.value += '-';
  });

  input.onblur = () => {
    let str = ''
    if(input.value.length == 12) {
      for(let i = 0; i < +input.value.length; i++) {
        str += input.value[i]
        if(str.length == 5) str += '-';
        if(str.length == 8) str += '-';
        if(str.length == 11) str += '-';
      }

      input.value = str;
    }
  }

}

normalizePhone();

export let settingFocus = () => {
    let termsDeliveryPlaceDelivery = document.querySelector('.termsDelivery__placeDelivery');
    let input = termsDeliveryPlaceDelivery.querySelectorAll('input');
    input[0].focus();
}

export let validation = () => {
    let dbtk = document.querySelector('.deliveryBasket__takeaway');  
    let termsDeliveryPlaceDelivery = document.querySelector('.block__termsDelivery');
    let input = Array.from(termsDeliveryPlaceDelivery.querySelectorAll('input'));
    let verificationResult = input.map(e => {
        switch(e.dataset.order) {
            case 'street':
              if(dbtk.classList.contains('deliveryBasket__btn_active')) return; //* Пропускаем проверку если заказ на вынос
              return error(e, validateStreetHouse(e));
              // break;
              case 'apartment':
                case 'intercom':
                  case 'entrance':
                    case 'floor':
              if(dbtk.classList.contains('deliveryBasket__btn_active')) return;
              return error(e, e.value.length != 0)
              // break;
              case 'nameUser':
                return  error(e, e.value.length > 1);
              // break;
            case 'email':
              return  error(e, validateEmail(e));
              // break;
            case 'phone':
              return error(e, validatePhone(e))
              // break;
              
            default:
              // alert('vse verno')
              break;
          }
    })
    return (verificationResult.includes(false));
}

let validateStreetHouse = (i) => {
    let reg = /[а-яА-ЯёЁa-zA-Z\s]+[0-9]+/
    return (reg.test(i.value));
}
let validateEmail = (i) => {
    let reg = /[@]/
    return (reg.test(i.value));
}
let validatePhone = (i) => {
    let reg = /^[+0-9\-\()]/
    if (i.value == '') return false;
    return (i.value.match(/[0-9]/g).length == 11 && reg.test(i.value)) ? true: false;
}

let error = (e, bool) => {  
  if(bool) {
    e.classList.remove('placeDelivery__inputError');
  } else {
    e.classList.add('placeDelivery__inputError');
    return false;
  }
}


// * Создаем ссылку в яндекс такси
let creatingLinkYandexTaxi = () => {
  let termsDeliveryPlaceDelivery = document.querySelector('.block__termsDelivery');
  let input = termsDeliveryPlaceDelivery.querySelector('input[name=street').value;
      function init(ymaps) {
        var myGeocoder = ymaps.geocode(`Екатеринбург, ${input}`);
        myGeocoder.then(function (res) {
            var firstGeoObject = res.geoObjects.get(0),
               coords = firstGeoObject.geometry.getCoordinates();
                // debugger

            // dataClient.street = `<a href="https://3.redirect.appmetrica.yandex.com/route?start-lat=56.812374&start-lon=60.603052&end-lat=${coords[0]}&end-lon=${coords[1]}&level=express&appmetrica_tracking_id=1178268795219780156&lang=ru">${street}</a>`

        });
    }
    ymaps.ready(init);
}
let termsDeliveryPlaceDelivery = document.querySelector('.block__termsDelivery');
let input = termsDeliveryPlaceDelivery.querySelector('input[name=street');
input.onblur = () => {creatingLinkYandexTaxi()}

