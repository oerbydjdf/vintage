const writer = require('../helpers/csvWriter.js')
const csv = require('csv-parser')
const fs = require('fs')


let rewritingStopList = (req, res) => {
    const results = [];
    fs.createReadStream('./base/csv-catalog/fileNewBaza.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        let status = await writeDownInStopList(results, req.body)
        res.json(status)
    }) 
    .on('error', (error) => res.send({status: 400}))
}

const writeDownInStopList = (dadaBaze, arrStopList) => {
    arrStopList.forEach(e => {
        let obgDish = dadaBaze.find(item => item['NAME/CODE'] === e.name)
        obgDish.STOPLIST = e.availability;        
    });
    return writer(dadaBaze)
}

module.exports = {rewritingStopList};