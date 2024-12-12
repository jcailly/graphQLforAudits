import { getLastExerciceStarted } from "./getdatas/getCurrentExercice.js";

const dateDiff = (date1, date2) => {
    var diff = {}
    var tmp = date1 - date2;

    tmp = Math.floor(tmp/1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp-diff.sec)/60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp-diff.min)/60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp-diff.hour)/24);
    diff.day = tmp;

    return diff;
}

const formatedTime = (data) => {
    let res = ''

    res = `${data.sec}s`

    res = `${data.min}m ` + res
    if (data.hour === 0 && data.day === 0) {
        return res
    }

    res = `${data.hour}h ` + res
    if (data.day === 0) {
        return res
    }

    res = `${data.day}d ` + res

    return res
}

export const Activity = (lastExercice, data3) => {
    if (lastExercice) {
        const timePassed = dateDiff(Date.now(), Date.parse(lastExercice.createdAt))
        const formatedTimePassed = formatedTime(timePassed)

        var res = `
            <div class="activeCircle"></div>

            <p class="active">ACTIVE</p>
            <p class="finished">You started <span class="exerciceName">${lastExercice.object.name}</span> ${formatedTimePassed} ago!</p>
        `
    } else {
        const data = getLastExerciceStarted(data3.data.result)
        const timePassed = dateDiff(Date.now(), Date.parse(data.createdAt))
        const formatedTimePassed = formatedTime(timePassed)

        var res = `
            <div class="inactiveCircle"></div>

            <p class="inactive">INACTIVE</p>
            <p class="finished">You finished <span class="exerciceName">${data.path.split('/')[data.path.split('/').length-1]}</span> ${formatedTimePassed} ago, let's move on to the next project!</p>
        `
    }

    return res
}