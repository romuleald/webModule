import webModule from '../../../../package/src/module-init';

describe('Module Example', () => {
    // you need to use the base prefix to load correctly the fixtures
    beforeEach(() => {
        jest.clearAllMocks();
        // eslint-disable-next-line no-console
        console.info = jest.fn(() => {});
    });

    it('module example throw console on ready with 3 args', () => {
        // Arrange
        document.body.innerHTML = '<div class="js-module" data-module="module-example" data-module-module-example--foo="hello again, world">module-example <span>click</span></div>';
        const DOMmodule = document.querySelector('.js-module');

        // Act
        webModule.init();

        // Assert
        expect(console.info).toHaveBeenCalledWith('le module a été init via l\'élément', DOMmodule, {foo: 'hello again, world'});// eslint-disable-line no-console
    });
});
