const fs = require('fs');

const filterCallback = filepath => /^((?!\.spec\.).)*\.js$/.test(filepath);
const mapCallback = filepath => filepath.replace(/(.*(\/|\\)modules(\/|\\))/, '');

const walk = function (dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filepath = `${dir}/${file}`;
        const stat = fs.statSync(filepath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filepath));
        }
        else {
            results.push(filepath);
        }
    });
    return results;
};
const exportedFiles = testFolder => walk(testFolder).filter(filterCallback).map(mapCallback);
module.exports = exportedFiles;
