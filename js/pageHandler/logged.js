import { Activity } from "../Activity.js";
import { AuditReceived, AuditRecevedNotEnd } from "../auditReceved.js";
import { createSkillDatas } from "../createSkillDatas.js";
import { createXPsvg } from "../createSVG/createXPsvg.js";
import { f } from "../f.js";
import { fetchDatas2 } from "../getdatas/fetchDatas.js";
import { getAllProjectSorted } from "../getdatas/getAllProjectSorted.js";
import { getCurrentExercice, getLastExerciceStarted } from "../getdatas/getCurrentExercice.js";
import { getLvl } from "../getdatas/getLvl.js";
import { getNextLevelRounded } from "../getdatas/getNextLevelRounded.js";
import { getXp } from "../getdatas/getXp.js";
import { SetNewCSS } from "../Utility/setnewcss.js";
import { createSkillSVG } from "../createSVG/createSkillSVG.js";
import { GetPeopleQuantityAtLvl } from "../getdatas/GetPeopleQuantityAtLvl.js";
import { createClassementSVG } from "../createSVG/createClassementSVG.js";
import { getCurrentEvent } from "../getdatas/getCurrentEvent.js";
import { auditComments, day, month, query, rank } from "../Utility/constant.js";
import { CreatEventListener } from "../creatEventListener.js";

export const Logged = async(JWT) => {
    SetNewCSS(['css/logged.css'])
    document.title = 'intra'

    const data = await fetchDatas2('https://zone01normandie.org/api/graphql-engine/v1/graphql', `Bearer ${JWT}`, query)
    
    console.log(data)
    const currentDate = new Date()
    const currentEvents = getCurrentEvent(data.data.event, currentDate)
    const auditReceved = AuditReceived(data.data.audit, data.data.user[0].login)
    const auditRecevedNotEnd = AuditRecevedNotEnd(auditReceved)
    const XPamount = getXp(data.data.user[0].xps)
    const lvl = getLvl(data.data.transaction)
    const currentExercise = getCurrentExercice(data.data.result)
    const activity = Activity(currentExercise, data)
    const nextLevel = f(lvl+1) - XPamount > 0 ? f(lvl+1) - XPamount : 0
    const nextLevelRounded = getNextLevelRounded(nextLevel, 1)
    const fourLastProject = getAllProjectSorted(data.data.transaction).slice(0, 4)
    

    const auditRatio = data.data.user[0].auditRatio
    const auditRatioDone = data.data.user[0].totalUp
    const auditRatioReceived = data.data.user[0].totalDown


    const lastExercice = currentExercise ? currentExercise : getLastExerciceStarted(data.data.result)
    const currentRank = rank[Math.floor(lvl/10) < 6 ? Math.floor(lvl/10) : 6]
    const nextRank = 10 - (lvl % 10)

    document.body.innerHTML = `
        <div class="trame"></div>
        <div class="navBar">
            <div class="logo"></div>
            <div class="link0">INTRA</div>
            <div class="link1"> > </div>
            <div class="link2">${data.data.user[0].campus.toUpperCase()}</div>
            <div class="link3"> > </div>
            <div class="link4">PROFILE</div>

            <div class="giteaSVG" id="giteaSVG"></div>
            <div class="gitea" id="gitea">GITEA</div>

            <div class="profile"></div>
            <div class="userName">${data.data.user[0].login}</div>
            <div class="logout" id="logout"></div>
        </div>
        
        <div class="body">
            <div class="hello">Welcome, ${data.data.user[0].attrs.firstName} ${data.data.user[0].attrs.lastName}!</div>
            <div class="allData" id="allData">
                <div class="reverse">
                    <div></div>
                </div>
            </div>

            <div class="container_current_rank">
                <div class="currentRankSpan">Current rank</div>
                <div class="currentRank">${currentRank}</div>
                <div class="line"></div>
                <br>
                <div class="nextRank">Next rank in ${nextRank === 1 ? `${nextRank} level` : `${nextRank} levels`}</div>
                <br>
                <div class="circle">
                    <div class="levelSpan">Level</div>
                    <div class="level">${lvl}</div>
                </div>
                <div class="nextLevel">Next level in ${nextLevelRounded}</div>
            </div>

            <div class="WhatUp">
                <div class="what">What's Up</div>
                <div class="resume">
                    <span class="arrow">→</span>
                    <span class="resumeExercice">resume <u>${lastExercice.object.name}</u></span>
                </div>
            </div>

            <div class="activity">
                <p class="currentlySpan">You're currently</p>
                ${activity}
            </div>

            <div class="divRatio">
                <div class="ratioSpan">Audits ratio</div>

                <div class="barRatioDone"></div>
                <div class="amountRatioDone">${getNextLevelRounded(auditRatioDone, 1)} Done ↑</div>

                <div class="barRatioReceived" style="background: ${auditComments[auditRatio.toFixed(1)][1]}"></div>
                <div class="amountRatioReceived">${getNextLevelRounded(auditRatioReceived, 1)} Received ↓</div>

                <div class="ratio" style="color: ${auditComments[auditRatio.toFixed(1)][1]}">${auditRatio.toFixed(1)} <span class="ratioComment">${auditComments[auditRatio.toFixed(1)][0]}</span></div>
            </div>

            <div class="xp">
                <div class="xpAmount"><span style="color: #CAADFF">${getNextLevelRounded(XPamount, 2).split(' ')[0]}</span> ${getNextLevelRounded(XPamount, 2).split(' ')[1]}</div>
                <div class="lastActivitySpan">Last activity</div>
                <div class="line"></div>
                <div class="fourExercices"></div>
            </div>

            <div class="currentAudit">
                <div class="currentAuditTitle">Audits</div>
                <div class="currentAuditTodo"></div>
            </div>

            <div class="XPprogression">
                <div class="title">XP progression</div>
                <div class="totalXP">Total <br> ${getNextLevelRounded(XPamount, 2)}</div>
                <div class="svg" id="XPsvg"></div>
            </div>

            <div class="bestSkills">
                <div class="title">Best skills</div>
                <div class="description">Here are your skills with the highest completion rate among all categories.</div>
                <div class="svg" id="SkillSVG"></div>
            </div>

            <div class="usersByXP">
                <div class="userByXPtitle">Distribution of users by XP</div>
                <div class="svg" id="UsersByXP"></div>
                <div class="description" id="svgDescription"></div>
                <div class="level">Level</div>
            </div>

            <div class="calendar">
                <div class="display">
                    <div class="date">${currentDate.getDate()}</div>

                    <div class="align">
                        <div class="day">${day[currentDate.getDay()]}</div>
                        <div class="month">${month[currentDate.getMonth()]}</div>
                    </div>
                </div>

                <div class="event">

                </div>
            </div>
        </div>
    `

    const circle = document.getElementsByClassName("circle")[0]
    circle.style.height = circle.getBoundingClientRect().width + "px"

    const barRatioDone = document.getElementsByClassName('barRatioDone')[0]
    const barRatioReceived = document.getElementsByClassName('barRatioReceived')[0]

    if (auditRatioDone < auditRatioReceived) {
        barRatioDone.style.width = '50%'
        barRatioReceived.style.width = `${auditRatioReceived*100/auditRatioDone / 2}%`
    } else {
        barRatioReceived.style.width = '50%'
        barRatioDone.style.width = `${auditRatioDone*100/auditRatioReceived / 2}%`
    }

    const exercicesName = document.getElementsByClassName('fourExercices')[0]
    console.log(fourLastProject)
    for (let i = 0; i < fourLastProject.length; i++) {
        const div = document.createElement('div')
        div.className = `exercices${i+1}`

        div.innerHTML = `${fourLastProject[i].object.type} — ${fourLastProject[i].path.split("/")[3]}  ${getNextLevelRounded(fourLastProject[i].amount, 1)}`

        exercicesName.appendChild(div)
    }

    const currentAuditTodo = document.getElementsByClassName('currentAuditTodo')[0]
    if (auditRecevedNotEnd.length === 0) {
        currentAuditTodo.innerHTML = `
            <div class="noAudit">No audit to do, you're good!</div>
        `
    } else {
        const div = document.createElement('div')
        div.className = 'Audit'

        div.innerHTML = `
            <div class="text"><span class="exerciceName">${auditRecevedNotEnd[0].group.object.name}</span> — ${auditRecevedNotEnd[0].group.captainLogin}</div>

            <div class="auditCode">${auditRecevedNotEnd[0].private.code.toUpperCase()}</div>
        `

        currentAuditTodo.appendChild(div)
    }

    createXPsvg(getAllProjectSorted(data.data.transaction), XPamount)
    createSkillSVG(createSkillDatas(data.data.transaction))
    createClassementSVG(GetPeopleQuantityAtLvl(data.data.event_user), lvl)

    const calendarEventInformation = document.getElementsByClassName('event')[0]
    if (currentEvents.length === 0) {
        calendarEventInformation.innerHTML = `
            <div class="NoEvent">No events today, you're free!</div>
        `
    } else {
        const startAt = new Date(Date.parse(currentEvents[0].startAt))
        const endAt = new Date(Date.parse(currentEvents[0].endAt))

        calendarEventInformation.innerHTML = `
        <div class="eventContainer">
            <div class="nameEvent"><b><i>${currentEvents[0].object.name}</b></i></div>
            <div class="startedDate">
                Start date:
                ${month[startAt.getMonth()]} 
                ${startAt.getDate()}, 
                ${startAt.getFullYear()} 
                at 
                ${startAt.getHours().toString().length === 1 ? "0"+startAt.getHours() : startAt.getHours()}
                :
                ${startAt.getMinutes().toString().length === 1 ? "0"+startAt.getMinutes() : startAt.getMinutes()}
            </div>

            <div class="endDate">
            End date: 
                ${month[endAt.getMonth()]} 
                ${endAt.getDate()}, 
                ${endAt.getFullYear()} 
                at 
                ${endAt.getHours().toString().length === 1 ? "0"+endAt.getHours() : endAt.getHours()}
                :
                ${endAt.getMinutes().toString().length === 1 ? "0"+endAt.getMinutes() : endAt.getMinutes()}
            </div>
        </div>
        `
    }

    CreatEventListener(data)
}
