'use strict'

import { uploadingPdfToPage } from "./helpersScript/pdfPpload.js";

//* Вставляем пдф

uploadingPdfToPage('.containerPdf__BezAlc', '/BarBezAlcNizkoeKachestvo.pdf');

// *Показываем блок с алкоголем
let showingblockWithAlcohol = () => {
  let buttomYes = document.querySelector('.buttom__yes');
  let warning18 = document.querySelector('.warning18');
  buttomYes.onclick = () => {
    uploadingPdfToPage('.containerPdf__Alc', '/BARAlco.pdf');
    warning18.classList.add('warning18_none');
  }
}
showingblockWithAlcohol();


