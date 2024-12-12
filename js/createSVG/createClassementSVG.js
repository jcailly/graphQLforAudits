export const createClassementSVG = (datas, currentLvl) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('version', '1.1')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('xmlns', "http://www.w3.org/2000/svg")


    const maxQuantity = Math.max(...Object.values(datas))
    for (const [key, value] of Object.entries(datas)) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        
        if (parseInt(key) === currentLvl) {
            rect.setAttribute('fill', '#CAADFF')
        } else {
            rect.setAttribute('fill', 'grey')
        }
        
        rect.setAttribute('x', `${parseInt(key) + 1}%`)
        rect.setAttribute('y', `${100 - value*100/maxQuantity}%`)
        rect.setAttribute('width', `1%`)
        rect.setAttribute('height', `100%`)
        
        svg.appendChild(rect)

        rect.addEventListener('mouseover', () => {
            document.getElementById('svgDescription').innerHTML = `Level ${key}: ${value} students`
        })

        rect.addEventListener('mouseleave', () => {
            document.getElementById('svgDescription').innerHTML = ''
        })
    }
    
    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect1.setAttribute('fill', 'white')
    rect1.setAttribute('x', '0%')
    rect1.setAttribute('y', '0%')
    rect1.setAttribute('width', `0.4%`)
    rect1.setAttribute('height', `100%`)

    svg.appendChild(rect1)

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect2.setAttribute('fill', 'white')
    rect2.setAttribute('x', '0%')
    rect2.setAttribute('y', '99.6%')
    rect2.setAttribute('width', `100%`)
    rect2.setAttribute('height', `0.4%`)

    svg.appendChild(rect2)

    document.getElementById('UsersByXP').appendChild(svg)
}