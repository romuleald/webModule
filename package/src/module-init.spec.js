import loadFixture from '../test/fixture-loader';
import {timerMutation, timerTest} from '../test/mutation-timeout';
import webmodule from './module-init';

describe('Module-init', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
        beforeEach(() => {
            jest.clearAllMocks();
            // eslint-disable-next-line no-console
            console.error = jest.fn((...args) => {
                // eslint-disable-next-line no-console
                console.log(args);
            });
        });
    });

    it('Ready function is called', () => {
        // Arrange
        loadFixture('module-init.html');
        const spy = jest.spyOn(webmodule, 'callModule');
        // Act
        webmodule.init();
        // Assert
        expect(spy).toHaveBeenCalledWith('ready', {});
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Wrong module name', () => {
        // Arrange
        // eslint-disable-next-line no-console
        // console.error = jest.fn();
        const DOMmodule = '<div class="js-module" data-module="nothinglikethat"></div>';
        // Act
        document.body.insertAdjacentHTML('beforeend', DOMmodule);
        webmodule.init();
        // Assert
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith('WEB MODULE: Callback not found', 'nothinglikethat', 'addModule', expect.any(Error));
    });

    it('Ready function is called by multiple modules', () => {
        // Arrange
        const spy = jest.spyOn(webmodule, 'callModule');
        const DOMmodule = '<div class="js-module" data-module="module-example module-example2"></div>';
        // Act
        document.body.insertAdjacentHTML('beforeend', DOMmodule);
        webmodule.init();
        // Assert
        expect(spy).toHaveBeenCalledWith('ready', {});
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('a module has no name', () => {
        // Arrange
        const DOMmodule = '<div class="js-module"></div>';
        // Act
        document.body.insertAdjacentHTML('beforeend', DOMmodule);
        // Assert
        expect(() => {
            webmodule.init();
        }).toThrow();
    });

    it('module is dupplicated and throw error', () => {
        // Arrange
        const duplicatedModule = 'module-example';
        MODULELIST.unshift(duplicatedModule);
        console.warn(MODULELIST);
        const DOMmodule = '<div class="js-module" data-module="module-example"></div>';

        // Act
        document.body.insertAdjacentHTML('beforeend', DOMmodule);
        webmodule.init();

        // Assert
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith(`Same module name ${duplicatedModule}`);
    });

    it('Unmount modules', done => {
        // Arrange
        const spy = jest.spyOn(webmodule, 'callModule');
        const DOMmodule = '<div class="js-module test" data-module="module-example module-example2"></div>';
        // Act
        document.body.insertAdjacentHTML('beforeend', DOMmodule);
        webmodule.init();
        document.body.innerHTML = '';

        // Assert
        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith('unmount', {});
            done();
        }, timerMutation);
    }, timerTest);

    it('add module on the fly', done => {
        // Arrange
        const spy = jest.spyOn(webmodule, 'callModule');
        const DOMmodule = '<div class="js-module test" data-module="module-example module-example2"></div>';
        // Act
        webmodule.init();
        document.body.insertAdjacentHTML('beforeend', DOMmodule);

        // Assert
        setTimeout(() => {
            expect(spy).toHaveBeenCalledWith('ready', {});
            done();
        }, timerMutation);
    }, timerTest);
});
