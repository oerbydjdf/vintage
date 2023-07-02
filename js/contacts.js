'use strict'

function init(ymaps) {
  var map = new ymaps.Map("map", {
      center: [56.81265,60.602873],
      zoom: 17
  });
  let placemark = new ymaps.Placemark([56.81265,60.602873], {}, {
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: '/logoImg/logo-round.png',
    // Размеры метки.
    iconImageSize: [50, 50],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-10, 5]
  })

  map.geoObjects.add(placemark)
}

ymaps.ready(init);