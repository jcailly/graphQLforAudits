export const fetchDatas = async (url, auth) => {
    const headerDatas = new Headers()
    headerDatas.append('Authorization', auth)
    
    return await fetch(url, {
        headers: headerDatas,
        method:'POST'
    }).then(async datas => {
        return datas.json()
    }).catch(err => {
        console.error(err)
    })
}

export const fetchDatas2 = async (url, JWT, query) => {
    const headerDatas = new Headers()
    headerDatas.append('Authorization', JWT)

    return await fetch(url, {
        headers: headerDatas,
        method: 'POST',
        body: JSON.stringify({ "query": query })
    }).then(datas => {
        return datas.json()
    }).catch(err => {
        console.error(err)
    })
}

