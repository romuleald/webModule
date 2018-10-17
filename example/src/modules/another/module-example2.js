const moduleTest = (elem, data) => {
    const ready = () => {
        // eslint-disable-next-line no-console
        console.info('le module test a été init via l\'élément', elem, data);
    };

    return {
        ready
    };
};

export default moduleTest;
