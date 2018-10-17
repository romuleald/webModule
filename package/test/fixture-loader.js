/**
 * import HTML file in the document body
 * @param filename
 */
module.exports = filename => {
    const html = require(`./fixtures/html/${filename}`);
    if(typeof html !== 'string') {
        throw new Error('html expected in fixture');
    }
    else{
        document.body.innerHTML = html;
    }
};
