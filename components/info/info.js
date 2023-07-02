'use strict'

// *Скрываем дополнительную информацию в шапке страницы
document.addEventListener('click', function (event) {
    let infoProposal = event.target.closest('.info__proposal');
    let infoTextActive = document.querySelector('.info__text_active');
    if(infoTextActive === null) return;
    if (infoProposal) return;
    if (infoTextActive.className === 'info__text info__text_active') infoTextActive.className = 'info__text';
});
// *Показываем дополнительную информацию в шапке страницы
let showingInformation = () => {
    let info = Array.from(document.querySelectorAll('.info__proposal'));
    info.forEach(e => {
        e.onclick = (event) => {
            let infoTextActive = Array.from(document.querySelectorAll('.info__text_active'));
            let info = e.querySelector('.info__text')
            info.classList.toggle("info__text_active")
            if (infoTextActive.length > 0) infoTextActive[0].className = 'info__text';
        }
    })
};
showingInformation();