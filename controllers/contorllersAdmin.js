const csv = require('csv-parser')
const fs = require('fs')
const createPath = require('../helpers/createPath')
require('dotenv').config()

const getAdmin = (req, res) => {
    let results = [];
    if(process.env.PAROLADMIN === 'true') {
        fs.createReadStream('./base/csv-catalog/fileNewBaza.csv')
        .pipe(csv({ separator: ',' }))
        .on('data', (data) =>  results.push(data))
        .on('end', () => {
            res.render(createPath('admin/adminIndex'), {results, urlStyle: '/style.css'});            
            process.env.PAROLADMIN = 'false'
            return;
        });
        
    } else {
        res.redirect('/login');
        return
    }
    
}

module.exports = {getAdmin};