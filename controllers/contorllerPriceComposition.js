const writer = require('../helpers/csvWriter.js')
const csv = require('csv-parser')
const fs = require('fs')

let rewritingPriceComposition = (req, res) => {
    const results = [];
    fs.createReadStream('./base/csv-catalog/fileNewBaza.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        let status = await writePriceComposition(results, req.body)
        res.json(status)
    }) 
    .on('error', (error) => res.send({status: 400}))
}

const writePriceComposition = (dadaBaze, newObgDish) => {
        let obgDish = dadaBaze.find(item => item['NAME/CODE'] === newObgDish.name)
        for (key in newObgDish.data) {
            obgDish[key] = newObgDish.data[key]
          }
    return writer(dadaBaze)
}

module.exports = {rewritingPriceComposition};