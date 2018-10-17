const moduleTest = (elem, data) => {
    const ready = () => {
        // eslint-disable-next-line no-console
        console.info('le module a été init via l\'élément', elem, data);
        elem.querySelector('span').addEventListener('click', () => {document.body.removeChild(elem)});
    };
    const unmount = () => {
        // eslint-disable-next-line no-console
        console.warn('le module a été supprimé, son élément était', elem);
    };
    return {
        ready,
        unmount
    };
};

export default moduleTest;
