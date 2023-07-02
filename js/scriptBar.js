'use strict'
// *Передаем размер экрана
let transmittingScreenSize = () => {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );


    let obj = document.querySelectorAll('.drinks__pdf');
    obj.forEach(e => {
        e.setAttribute('width', width);
        e.setAttribute('height', scrollHeight);
    })
    }
    transmittingScreenSize();
    
    
//     window.addEventListener("resize", function() {
//         let scrollHeight = Math.max(
//             document.body.scrollHeight, document.documentElement.scrollHeight,
//             document.body.offsetHeight, document.documentElement.offsetHeight,
//             document.body.clientHeight, document.documentElement.clientHeight
//           );
//         let width = document.documentElement.clientWidth;
//         let obj = document.querySelector('object');
//         obj.setAttribute('width', width)
//         obj.setAttribute('width', scrollHeight)
//     // Здесь получаем размеры экрана (inner/outerWidth, inner/outerHeight)

// }, false);


