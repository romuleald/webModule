const path = require('path');
const webpack = require('webpack');

const modulePath = path.resolve(__dirname, 'src/modules');
const moduleList = require('../package/tools/module-list')(modulePath);
const webModulesPath = new webpack.DefinePlugin({
    MODULEPATH: JSON.stringify(modulePath)
});
const webModulesList = new webpack.DefinePlugin({
    MODULELIST: JSON.stringify(moduleList)
});

module.exports = {
    entry: './src/index.js',
    node: {
        fs: 'empty'
    },
    plugins: [
        webModulesPath,
        webModulesList
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
