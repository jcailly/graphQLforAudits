import { isGoodPath2 } from "../isGoodPath.js"

export const GetPeopleQuantityAtLvl = (datas) => {
    const res = {}

    for (let i = 1; i <= 128; i++) {
        res[i] = 0

        for (let y = 0; y < datas.length; y++) {
            if (datas[y].level === i) {
                if (isGoodPath2(datas[y].event.path)) {
                    res[i] = res[i]+1
                }
            }
        }
    }

    return res
}