export const createXPsvg = (datas, maxXP) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.1')
    svg.setAttribute('viewbox', '0 0 90 90')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('xmlns', "http://www.w3.org/2000/svg")

    let xp = 0

    for (let i = datas.length-1; i >= 0; i--) {
        const previousPosY = 100 - (xp*100/maxXP) + "%"
        xp += datas[i].amount
        
        if (i < datas.length - 1) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', (Date.parse(datas[i+1].createdAt) - Date.parse(datas[datas.length-1].createdAt))*100 / (Date.now() - Date.parse(datas[datas.length-1].createdAt)) + "%")
            line.setAttribute('y1', previousPosY)
            line.setAttribute('x2', (Date.parse(datas[i].createdAt) - Date.parse(datas[datas.length-1].createdAt))*100 / (Date.now() - Date.parse(datas[datas.length-1].createdAt)) + "%")
            line.setAttribute('y2', 100 - (xp*100/maxXP) + "%")
            line.setAttribute('stroke', "#CAADFF")

            svg.appendChild(line)
        }

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', (Date.parse(datas[i].createdAt) - Date.parse(datas[datas.length-1].createdAt))*100 / (Date.now() - Date.parse(datas[datas.length-1].createdAt)) + "%")
        circle.setAttribute('cy', 100 - (xp*100/maxXP) + "%")
        circle.setAttribute('r', 1)
        circle.setAttribute('fill', "#CAADFF")

        svg.appendChild(circle)
    };

    const endLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    endLine.setAttribute('x1', (Date.parse(datas[0].createdAt) - Date.parse(datas[datas.length-1].createdAt))*100 / (Date.now() - Date.parse(datas[datas.length-1].createdAt)) + "%")
    endLine.setAttribute('y1', 100 - (xp*100/maxXP) + "%")
    endLine.setAttribute('x2', "100%")
    endLine.setAttribute('y2', 100 - (xp*100/maxXP) + "%")
    endLine.setAttribute('stroke', "#CAADFF")

    svg.appendChild(endLine)
    document.getElementById('XPsvg').appendChild(svg)
}