const XPUnity = [
    'b',
    'kB',
    'Mb'
]

export const getNextLevelRounded = (nextLevel, rounded) => {
    let res = ''

    for (let i = 0; i < XPUnity.length; i++) {
        if (i < XPUnity.length-1) {
            if (nextLevel/(1000**i) > 1 && nextLevel/(1000**i) < 1000) {
                if (nextLevel/(1000**i) < 100) {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded)} ${XPUnity[i]}`
                } else {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded - 1)} ${XPUnity[i]}`
                }
            }
        } else {
            if (nextLevel/(1000**i) > 1) {
                if (nextLevel/(1000**i) < 100) {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded)} ${XPUnity[i]}`
                } else {
                    res = `${(nextLevel/(1000**i)).toFixed(rounded - 1)} ${XPUnity[i]}`
                }
            }
        }
    }

    return res
}