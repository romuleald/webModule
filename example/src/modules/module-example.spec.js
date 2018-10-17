import webModule from '../../../package/src/module-init';

describe('Module Example 2', () => {
    // you need to use the base prefix to load correctly the fixtures
    beforeEach(() => {
        jest.clearAllMocks();
        // eslint-disable-next-line no-console
        console.info = jest.fn(() => {});
        // eslint-disable-next-line no-console
        console.warn = jest.fn(() => {});
    });

    it('throw console on ready with 3 args', () => {
        // Arrange
        document.body.innerHTML = '<div class="js-module" data-module="module-example2" data-module-module-example2--foo="hello again, world">module-example2</div>';
        const DOMmodule = document.querySelector('.js-module');

        // Act
        webModule.init();

        // Assert
        // eslint-disable-next-line no-console
        expect(console.info).toHaveBeenCalledWith('le module test a été init via l\'élément', DOMmodule, {foo: 'hello again, world'});
    });

    it('throw console on u unmount ith 2 args', done => {
        // Arrange
        document.body.innerHTML = '<div class="js-module" data-module="module-example" data-module-module-example--foo="hello again, world">module-example <span>click</span></div>';
        const DOMmodule = document.querySelector('.js-module');

        // Act
        webModule.init();
        DOMmodule.querySelector('span').click();

        // Assert
        setTimeout(() => {
            // eslint-disable-next-line no-console
            expect(console.warn).toHaveBeenCalledWith('le module a été supprimé, son élément était', DOMmodule);
            done();
        }, 15);
    }, 30);
});
