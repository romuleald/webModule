const path = require('path');
const modulePath = path.resolve(__dirname, 'src/modules');
const moduleList = require('../package/tools/module-list')(modulePath);

module.exports = {
    setupFiles: [
        '../package/test/MutationObserver.js'
    ],
    verbose: true,
    moduleDirectories: ['node_modules'],
    collectCoverage: true,
    coverageDirectory: './test/coverage',
    collectCoverageFrom: [
        '!src/index.js',
        'src/**/*.js'
    ],
    moduleFileExtensions: [
        'js',
        'html'
    ],
    testMatch: ['**/?(*.)(spec|step).js?(x)'],
    globals: {
        MODULEPATH: modulePath,
        MODULELIST: moduleList,
        debug: true
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.html$': '../package/test/html-import.js'
    },
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
