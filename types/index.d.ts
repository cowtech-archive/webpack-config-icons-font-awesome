import { Icons } from '@cowtech/webpack-config-lite';
export declare type IconDefinition = [number, number, Array<any>, string, string];
export interface Icon {
    prefix: string;
    iconName: string;
    icon: IconDefinition;
}
export interface Tags {
    [key: string]: string;
}
export declare function generateSVG(icon: Icon, tag: string): string;
export declare function loader(toLoad: Array<string>): Icons;
