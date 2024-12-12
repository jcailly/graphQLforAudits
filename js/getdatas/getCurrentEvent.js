export const getCurrentEvent = (datas, currentDate) => {
    const res = []

    datas.forEach(data => {
        if (Date.parse(data.startedAt) <= currentDate && Date.parse(data.endAt) >= currentDate) {
            res.push(data)
        }
    });

    return res
}