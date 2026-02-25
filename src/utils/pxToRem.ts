/**
* Convert Pixels to Rems
* @param px - The pixel value to convert.
* @return The converted rem value.
*/


export function pxToRem(pixelsx: number): string {
    return `${pixelsx / 16}rem`;
}