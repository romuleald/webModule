import loadFixture from '../../test/fixture-loader';
import webModule from '../module-init';

describe('Module Example', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        loadFixture('module-example2.html');
        // eslint-disable-next-line no-console
        console.info = jest.fn(() => {});
    });

    it('module example throw console on ready with 3 args', () => {
        // Arrange
        const DOMmodule = document.querySelector('.js-module');

        // Act
        webModule.init();

        // Assert
        // eslint-disable-next-line no-console
        expect(console.info).toHaveBeenCalledWith('le module test a été init via l\'élément', DOMmodule, {foo: 'bar'});
    });
});
