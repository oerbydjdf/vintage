const csv = require('csv-parser')
const fs = require('fs')
// const createPath = require('../helpers/createPath')

const getStoplist = (req, res) => {
    const results = [];
    const stoplist = [];
    
    fs.createReadStream('./base/csv-catalog/fileNewBaza.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) =>  results.push(data))
    .on('end', () => {
        results.forEach(e => {
            if(e.STOPLIST == 'да') stoplist.push(e['NAME/CODE'].replace(/\s*\n\s*/g,"")) 
        })
    
        res.send(stoplist);
    });
}

module.exports = {getStoplist};