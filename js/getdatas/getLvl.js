import { isGoodPath } from "../isGoodPath.js"

export const getLvl = (datas) => {
    let lvl = 0

    datas.forEach(data => {
        if (data.type === "level" && data.amount > lvl && isGoodPath(data.path)) {
            lvl = data.amount
        }
    })

    return lvl
}