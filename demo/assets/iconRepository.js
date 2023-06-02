import { getThemeIconColor } from "../helpers/themeHelper";

export function dataSvg(icon) {
    return 'url(data:image/svg+xml,' + encodeURIComponent(icon) + ')';
}

export function openIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>';
}

export function saveIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>';
}

export function cutIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z" /></svg>';
}

export function xlIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M6 7H8L9 9.5L10 7H12L10 12L12 17H10L9 14.5L8 17H6L8 12L6 7M13 7H15V15H19V17H13V7Z" /></svg>'
}

export function lgIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M9 7V17H15V15H11V7H9Z" /></svg>';
}

export function mdIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M9 7C7.9 7 7 7.9 7 9V17H9V9H11V16H13V9H15V17H17V9C17 7.9 16.11 7 15 7H9Z" /></svg>'
}

export function smIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M11 7C9.9 7 9 7.9 9 9V11C9 12.11 9.9 13 11 13H13V15H9V17H13C14.11 17 15 16.11 15 15V13C15 11.9 14.11 11 13 11H11V9H15V7H11Z" /></svg>';
}

export function tileIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10" /></svg>';
}

export function backIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M19,13H6.75L12,18.25L11.34,19L4.84,12.5L11.34,6L12,6.75L6.75,12H19V13Z" /></svg>';
}

export function fwdIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M4,12H16.25L11,6.75L11.66,6L18.16,12.5L11.66,19L11,18.25L16.25,13H4V12Z" /></svg>';
}

export function homeIcon(dark) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#' + getThemeIconColor(dark) + '" d="M16,8.41L11.5,3.91L4.41,11H6V12L6,19H9V13H14V19H17V11H18.59L17,9.41V6H16V8.41M2,12L11.5,2.5L15,6V5H18V9L21,12H18V20H13V14H10V20H5V12H2Z" /></svg>';
}