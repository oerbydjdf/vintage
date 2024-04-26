
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writer = async (dadaBaze) => {
            const csvWriter = createCsvWriter({
                path: './base/csv-catalog/fileNewBaza.csv',
                header: [
                    {id: 'id', title: 'ID'},
                    {id: 'CATEGORY', title: 'CATEGORY'},
                    {id: 'STOPLIST', title: 'STOPLIST'},
                    {id: 'NAME/CODE', title: 'NAME/CODE'},
                    {id: 'DESCRIPTION', title: 'DESCRIPTION'},
                    {id: 'PRICE', title: 'PRICE'},
                    {id: 'ENABLE VAT', title: 'ENABLE VAT'},
                    {id: 'VAT VALUE', title: 'VAT VALUE'},
                    {id: 'WEIGHT', title: 'WEIGHT'},
                    {id: 'OPTIONS', title: 'OPTIONS'},
                    {id: 'ENABLE DISCOUNT', title: 'ENABLE DISCOUNT'},
                    {id: 'AVAILABILITY', title: 'AVAILABILITY'},
                    {id: 'PENDING', title: 'PENDING'},
                    {id: 'IMAGES', title: 'IMAGES'},
                ]
            });
            return csvWriter.writeRecords(dadaBaze)
            .then(() => {
                return {status: 200}
            })
            .catch((err) => {
                return {status: 400}
            });
}

// module.exports = writer;
module.exports = writer;