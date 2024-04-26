
require('dotenv').config()
let checkingData = (req, res) => {
    if(process.env.LOGIN === req.body.login &&  process.env.PAROL === req.body.password) {
        process.env.PAROLADMIN = true;
        res.json('200');
    } else {
        res.json('404');
    }
    
}

module.exports = {checkingData};