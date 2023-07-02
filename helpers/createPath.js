const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../pages_ejs', `${page}.ejs`);

module.exports = createPath;