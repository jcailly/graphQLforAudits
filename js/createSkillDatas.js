export const createSkillDatas = (data) => {
    const res = {}

    for (let i = 0; i < data.length; i++) {
        if (!data[i].type.includes('skill_')) {
            continue
        }

        const skillType = data[i].type.split('_')[1]
        if (res.hasOwnProperty(skillType)) {
            if (data[i].amount > res[skillType]) {
                res[skillType] = data[i].amount
            }
        } else {
            res[skillType] = data[i].amount
        }
    }

    return Object.fromEntries(
        Object.entries(res).sort((a, b) => b[1] - a[1])
    );
}