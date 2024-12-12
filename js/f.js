export const f = (x) => {
    const xpLevel28 = 839400;
    const xpLevel34 = 1466050;
    const level28 = 28;
    const level34 = 34;
    
    const logXpLevel28 = Math.log(xpLevel28);
    const logXpLevel34 = Math.log(xpLevel34);

    const a = (level34 - level28) / (logXpLevel34 - logXpLevel28);
    const b = level28 - a * logXpLevel28;

    const xp = Math.exp((x - b) / a);

    return Math.floor(xp);
}