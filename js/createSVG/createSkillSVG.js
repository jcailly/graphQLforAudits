import { toTitle } from "../Utility/totitle.js";

const coordText = [
    [50, 12.5],
    [85.83, 29.32],
    [85.83, 70.68],
    [50, 87.5],
    [14.18, 70.68],
    [14.18, 29.32],
]

const maxLineCoord = [
    [50, 25],
    [71.65, 37.5],
    [71.65, 62.5],
    [50, 75],
    [28.35, 62.5],
    [28.35, 37.5],
]

export const createSkillSVG = (datas) => {
    const data = Object.keys(datas).map((key) => [key, datas[key]]);


    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.1')
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('xmlns', "http://www.w3.org/2000/svg")

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute('stroke', 'none')
    polygon.setAttribute('fill', '#CAADFF')

    var points = ""

    for (let i = 0; i < maxLineCoord.length && i < data.length; i++) {
        const x = 50 + (data[i][1] / 100) * (maxLineCoord[i][0] - 50)
        const y = 50 + (data[i][1] / 100) * (maxLineCoord[i][1] - 50)
        
        points += `${x},${y} `
    }

    polygon.setAttribute('points', points)
    svg.appendChild(polygon)

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `
        <circle fill="none" cx="50" cy="50" r="25" stroke="#fff" stroke-width="0.75"/>

        <line x1="50" y1="25" x2="50" y2="75" stroke="#fff" stroke-width="0.75"/>
        <circle fill="#fff" cx="50" cy="25" r="1"/>
        <circle fill="#fff" cx="50" cy="30" r="1"/>
        <circle fill="#fff" cx="50" cy="35" r="1"/>
        <circle fill="#fff" cx="50" cy="40" r="1"/>
        <circle fill="#fff" cx="50" cy="45" r="1"/>

        <circle fill="#fff" cx="50" cy="55" r="1"/>
        <circle fill="#fff" cx="50" cy="60" r="1"/>
        <circle fill="#fff" cx="50" cy="65" r="1"/>
        <circle fill="#fff" cx="50" cy="70" r="1"/>
        <circle fill="#fff" cx="50" cy="75" r="1"/>

        <line x1="28.35" y1="37.5" x2="71.65" y2="62.5" stroke="#fff" stroke-width="0.75"/>

        <circle fill="#fff" cx="28.35" cy="37.5" r="1"/>
        <circle fill="#fff" cx="32.68" cy="40" r="1"/>
        <circle fill="#fff" cx="37.01" cy="42.5" r="1"/>
        <circle fill="#fff" cx="41.34" cy="45" r="1"/>
        <circle fill="#fff" cx="45.67" cy="47.5" r="1"/>

        <circle fill="#fff" cx="54.33" cy="52.5" r="1"/>
        <circle fill="#fff" cx="58.66" cy="55" r="1"/>
        <circle fill="#fff" cx="62.99" cy="57.5" r="1"/>
        <circle fill="#fff" cx="67.32" cy="60" r="1"/>
        <circle fill="#fff" cx="71.65" cy="62.5" r="1"/>
        
        <line x1="28.35" y1="62.5" x2="71.65" y2="37.5" stroke="#fff" stroke-width="0.75"/>

        <circle fill="#fff" cx="28.35" cy="62.5" r="1"/>
        <circle fill="#fff" cx="32.68" cy="60" r="1"/>
        <circle fill="#fff" cx="37.01" cy="57.5" r="1"/>
        <circle fill="#fff" cx="41.34" cy="55" r="1"/>
        <circle fill="#fff" cx="45.67" cy="52.5" r="1"/>

        <circle fill="#fff" cx="54.33" cy="47.5" r="1"/>
        <circle fill="#fff" cx="58.66" cy="45" r="1"/>
        <circle fill="#fff" cx="62.99" cy="42.5" r="1"/>
        <circle fill="#fff" cx="67.32" cy="40" r="1"/>
        <circle fill="#fff" cx="71.65" cy="37.5" r="1"/>
    `

    svg.appendChild(g)

    for (let i = 0; i < coordText.length && i < data.length; i++) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = "5px Verdana";
        const width = context.measureText(data[i][0]).width;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('font-size', '5')
        text.setAttribute('fill', '#fff')
        text.setAttribute('x', coordText[i][0] - (width / 2))
        text.setAttribute('y', coordText[i][1])
        text.textContent = toTitle(data[i][0])

        svg.appendChild(text)
    }
    

    document.getElementById('SkillSVG').appendChild(svg)
}