export const isGoodPath = (data) => {
    const tmp = data.split('piscine')[1]
    if (tmp && (tmp.match(/\//g) || []).length > 0) {
        return false
    }

    const tmp2 = data.split('/')[data.split('/').length - 1]
    if (tmp2 === "checkpoint") {
        return false
    }

    return true
}

export const isGoodPath2 = (str) => {
    const arr = str.split('/')[str.split('/').length-1]

    if (arr === "div-01") {
        return true
    }

    return false
}