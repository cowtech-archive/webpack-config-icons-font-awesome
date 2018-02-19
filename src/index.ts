import {Icons} from '@cowtech/webpack-config-lite';
import camelcase from 'camelcase';

// Field: viewBoxWidth, viewBoxHeight, unused, unicodeCode, SVG path
export type IconDefinition = [number, number, Array<any>, string, string];

export interface Icon{
  prefix: string;
  iconName: string;
  icon: IconDefinition;
}

export interface Tags{
  [key: string]: string;
}

export function generateSVG(icon: Icon, tag: string): string{
  const def = icon.icon;

  return `<svg id="${tag}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${def[0]} ${def[1]}"><path fill="currentColor" d="${def[4]}"></path></svg>`;
}

export function loader(toLoad: Array<string>): Icons{
  const icons = {
    tags: {},
    definitions: ''
  };

  icons.tags = toLoad.reduce<Tags>((accu, entry, index) => {
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
