import { isGoodPath } from "../isGoodPath.js";

export const getLastExerciceStarted = (datas) => {
    let res = undefined

    datas.forEach(data => {
        if (!res || res.createdAt < data.createdAt) {
            res = data
        }
    });

    return res
}

export const getCurrentExercice = (datas) => {
    let res = undefined

    datas.forEach(data => {
        if ((!res || res.createdAt < data.createdAt) && !data.isLast && isGoodPath(data.path)) {
            res = data
        }
    });

    return res
}