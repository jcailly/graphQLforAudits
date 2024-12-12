export const toTitle = (str) => {
    return str.split('-').map(sub => sub[0].toUpperCase() + sub.substring(1).toLowerCase()).join('-');
}
