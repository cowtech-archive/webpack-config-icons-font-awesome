'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var camelcase = _interopDefault(require('camelcase'));

function generateSVG(icon, tag) {
    const def = icon.icon;
    return `<svg id="${tag}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${def[0]} ${def[1]}"><path fill="currentColor" d="${def[4]}"></path></svg>`;
}
function loader(toLoad) {
    const icons = {
        tags: {},
        definitions: ''
    };
    icons.tags = toLoad.reduce((accu, entry, index) => {
        // Manipulate the icon name
        const [alias, rawName] = entry.includes('@') ? entry.split('@') : [entry.replace(/:.+/, ''), entry];
        const [name, section] = rawName.includes(':') ? rawName.split(':') : [rawName, 'solid'];
        const tag = `i${index}`;
        // Load the icon then add to the definitions
        const icon = require(`@fortawesome/fontawesome-free-${section}/${camelcase('fa', name)}`);
        icons.definitions += generateSVG(icon, tag);
        accu[alias] = tag;
        return accu;
    }, {});
    return icons;
}

exports.generateSVG = generateSVG;
exports.loader = loader;
