/**
 * init
 */

/* eslint-disable */

const moduleTest = (elem, data) => {

    const ready = () => {

        console.info(`le module test a été init via l'élément`, elem, data);

    };

    return {
        ready
    };

};

export default moduleTest;
