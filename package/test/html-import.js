const htmlLoader = require('html-loader');

module.exports = {
    process (filename) {
        return htmlLoader(`html-loader!${filename}`);
    }
};

