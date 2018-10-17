import loadFixture from '../../test/fixture-loader';
import webModule from '../module-init';

describe('Module Example', () => {
    // you need to use the base prefix to load correctly the fixtures
    beforeEach(() => {
        jest.clearAllMocks();
        loadFixture('module-example.html');
        console.info = jest.fn(() => {// eslint-disable-line no-console
        });
    });

    it('module example throw console on ready with 3 args', () => {
        // Arrange
        const DOMmodule = document.querySelector('.js-module');

        // Act
        webModule.init();

        // Assert
        expect(console.info).toHaveBeenCalledWith('le module test a été init via l\'élément', DOMmodule, {foo: 'bar'});// eslint-disable-line no-console
    });
});
