import { isGoodPath } from "../isGoodPath.js";

export const getXp = (datas) => {
    let XPamount = 0
    
    datas.forEach(data => {
        if (isGoodPath(data.path)) {
            XPamount += data.amount
        }
    });

    return XPamount
}