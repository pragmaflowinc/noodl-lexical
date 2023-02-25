const ColorTypesCache = {
    purple: 'component',
    green: 'data',
    blue: 'visual',
    default: 'default',
    grey: 'default'
};

/**
 * Parse either Color key or Color value to a color.
 * 
 * @param value 
 * @returns 
 */
export function parseColor(value) {
    const types = Object.values(ColorTypesCache);
    if (types.includes(value)) {
        return value;
    }

    const colors = Object.keys(ColorTypesCache);
    if (colors.includes(value)) {
        return ColorTypesCache[value]
    }

    return ColorTypesCache['default'];
}