const express = require('express');
const app = express();
require('dotenv').config();

// const cors = require('cors')
const routHome = require('./routers/routHome');
const routBar = require('./routers/routBar');
const routMenu = require('./routers/routMenu');
const routPostOrder = require('./routers/routPostOrder');
const routBanket = require('./routers/routBanket');
const routBusinessLunch = require('./routers/routBusinessLunch');
const routStocks = require('./routers/routStocks');
const routMemorialDinner = require('./routers/routMemorialDinner');
const routOffer = require('./routers/routOffer');
const routContacts = require('./routers/routContacts');
const routStoplist = require('./routers/routStoplist');
const routLogin = require('./routers/routLogin');
const routCheckingData = require('./routers/routCheckingData');
const routAdmin = require('./routers/routAdmin');
const routNewstoplist = require('./routers/routNewstoplist');
const routPriceComposition = require('./routers/routPriceComposition');
const morgan = require('morgan');


// app.use(cors());
app.set('view engine', 'ejs');
app.listen(process.env.PORT, (error) => {
    error? console.log(error) : console.log(`listening port ${process.env.PORT}`)
});

// *==============================Чтение csv==================================================

// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];

// fs.createReadStream('base/csv-catalog/bazaTovarovVintage.csv')
//   .pipe(csv({ separator: ';' }))
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     arty(results);
//     console.log(results)
//   });

// const arty = (results) =>  {
//     results.forEach(e => {          
//         e.images = e.images.replace(/C:\\Users\\New\\Desktop\\Кафе Винтаж версия 9.09.019\\Меню Винтаж 2020\\Для Яндекс Еды/ig, '')
//         e.images = e.images.replace(/C:\\Users\\New\\Desktop\\Кафе Винтаж версия 2020\\Меню Винтаж 2020\\Для Яндекс Еды/ig, '')
//     })
//     csvWriter.writeRecords(results)       
//   };
    

//*===============================================================================================
// *===================================Запись нового csv=========================================

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: './base/csv-catalog/fileNewBaza.csv',
//     header: [
//         {id: 'id', title: 'ID'},
//         {id: 'category', title: 'CATEGORY'},
//         {id: 'name/code', title: 'NAME/CODE'},
//         {id: 'description', title: 'DESCRIPTION'},
//         {id: 'price', title: 'PRICE'},
//         {id: 'enable vat', title: 'ENABLE VAT'},
//         {id: 'vat value', title: 'VAT VALUE'},
//         {id: 'weight', title: 'WEIGHT'},
//         {id: 'options', title: 'OPTIONS'},
//         {id: 'enable discounts', title: 'ENABLE DISCOUNT'},
//         {id: 'availability type', title: 'AVAILABILITY'},
//         {id: 'pending', title: 'PENDING'},
//         {id: 'images', title: 'IMAGES'},
//     ]
// });
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: './base/csv-catalog/fileNewBaza.csv',
//     header: [
//         'id', 'category', 'name/code', 'description', 'price', 'enable vat', 'vat value', 'weight', 'options', 
//         'enable discounts', 'availability type', 'pending', 'images'
//     ]
// });
// *===============================================================================================


app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('fonts'));
app.use(express.static('js'));
app.use(express.static('components'));
app.use(express.static('base/fotoEdaVintage'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());


app.use(routHome);
app.use(routBar);
app.use(routMenu);
app.use(routPostOrder);
app.use(routBanket);
app.use(routBusinessLunch);
app.use(routStocks);
app.use(routMemorialDinner);
app.use(routOffer);
app.use(routContacts);
app.use(routStoplist);
app.use(routLogin);
app.use(routCheckingData);
app.use(routAdmin);
app.use(routNewstoplist);
app.use(routPriceComposition);