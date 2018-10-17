/**
 *
 * @type {{init, callModule, removeModule}}
 */
const webmodule = (function () {
    const target = document.body;
    const config = {childList: true, subtree: true};
    let SELECTOR_CLASSNAME = '';
    let SELECTOR_CLASS = '';
    const MODULE_CLASSNAME = 'data-module';
    let esModules = [];
    let modulesMounted = [];

    /**
     * @param item {HTMLElement|Node}
     * @param callback {Function}
     */
    const parseNodes = (item, callback) => {
        // a module can be put on an item
        if (item.classList && item.classList.contains(SELECTOR_CLASSNAME)) {
            callback(item);
        }

        // but also on the its children (ex: document.body)
        // istanbul ignore else
        if (item.querySelectorAll) {
            const nodes = item.querySelectorAll(SELECTOR_CLASS);
            nodes.forEach(node => {
                callback(node);
            });
        }
    };

    /**
     * @param moduleReference {Function}
     * @param moduleName {String}
     * @param DOMModule {HTMLElement}
     */
    const createModule = (moduleReference, moduleName, DOMModule) => {
        const data = {};
        for (let i = 0; DOMModule.attributes[i]; i++) {
            const attribute = DOMModule.attributes[i];
            const name = attribute.nodeName;
            if (new RegExp(`^${MODULE_CLASSNAME}-${moduleName}--`, 'i').test(name)) {
                const dataName = name.split(`${MODULE_CLASSNAME}-${moduleName.toLowerCase()}--`)[1];
                data[dataName] = attribute.nodeValue;
            }
        }
        const module = moduleReference(DOMModule, data);
        module.init = module.init || module.ready;
        return Object.create(module);
    };

    /**
     * @param functionName {String}
     * @param module {Function}
     */
    const callModule = (functionName, module) => {
        const fnFunction = module[functionName];
        fnFunction && fnFunction();
    };

    const getModuleName = DOMModule => {
        const moduleAttribute = DOMModule.getAttribute(MODULE_CLASSNAME);

        if (!moduleAttribute) {
            throw `WEB MODULE : Missing module ${DOMModule.toString()}`;
        }
        else {
            return moduleAttribute;
        }
    };

    /**
     * @param type {String}
     * @param DOMModule {HTMLElement}
     * @param callback {Function}
     */
    const loopModules = (type, DOMModule, callback) => {
        const moduleNameSplit = getModuleName(DOMModule).split(' ');
        moduleNameSplit.forEach(_moduleName => {
            try {
                callback(_moduleName);
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error('WEB MODULE: Callback not found', _moduleName, type, e);
            }
        });
    };

    /**
     * @param DOMModule {HTMLElement}
     */
    const addModule = DOMModule => {
        const exist = modulesMounted.filter(module => DOMModule.isSameNode(module.elem));

        // istanbul ignore else
        if (!exist.length) {
            loopModules('addModule', DOMModule, moduleName => {
                const importModule = esModules[moduleName].default;
                const module = createModule(importModule, moduleName, DOMModule);
                webmodule.callModule('ready', module);
                modulesMounted.push({module, elem: DOMModule});
            });
        }
    };

    /**
     * @param DOMModule {HTMLElement}
     */
    const removeModule = DOMModule => {
        loopModules('removeModule', DOMModule, () => {
            modulesMounted = modulesMounted.filter(module => {
                const exist = DOMModule.isSameNode(module.elem);
                exist && webmodule.callModule('unmount', module.module);
                return !exist;
            });
        });
    };

    /**
     * MutationObserver
     */
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // Added Nodes
            mutation.addedNodes.forEach(item => {
                parseNodes(item, addModule);
            });
            // Removed Nodes
            mutation.removedNodes.forEach(item => {
                parseNodes(item, removeModule);
            });
        });
    });

    const loadAllModules = () => {
        const modules = [];
        require.context = require.context || require('../test/require.context');

        const req = require.context(`${MODULEPATH}`, true, /^((?!\.(spec|step|test)\.).)*\.js$/);
        req.keys().forEach(path => {
            const moduleToParse = MODULELIST.filter(item => path.match(new RegExp(item)))[0];
            if (moduleToParse) {
                const name = moduleToParse.replace(/(.*\/)/, '').replace('.js', '');
                console.warn(name);
                try {
                    if (!modules[name]) {
                        modules[name] = req(path);
                    }
                    else {
                        throw `Same module name ${path}`;
                    }
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
        });
        return modules;
    };

    /**
     * Init
     */
    const init = (selector = 'js-module') => {
        // Listen Dom Changes
        esModules = loadAllModules();
        SELECTOR_CLASSNAME = selector;
        SELECTOR_CLASS = `.${SELECTOR_CLASSNAME}`;
        observer.observe(target, config);
        // Already In Dom
        parseNodes(document.body, addModule);
    };

    return {init, callModule, removeModule};
})();

export default webmodule;
