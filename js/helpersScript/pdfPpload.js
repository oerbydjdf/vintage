'use strict'
export let uploadingPdfToPage = (blockName, url) =>{

    let containerPdf = document.querySelector(blockName);
    let div = document.createElement('div');
    div.className = 'loading';
    div.innerHTML = 'Идет загрузка...';
    containerPdf.before(div);
  
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        for(let i = 0; i <= pdf._pdfInfo.numPages; i++) {
            pdf.getPage(i).then(function(page) {
              let canvas = document.createElement('canvas');
              let razmer = (page.getViewport({ scale: 1 }).width / containerPdf.clientWidth);
              let viewport = page.getViewport({ scale: 1 / razmer });
              let context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              containerPdf.append(canvas);
              page.render({ canvasContext: context, viewport: viewport });
              div.innerHTML = '';
            });
        }
    });
  
}