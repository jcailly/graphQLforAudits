export const AuditReceived = (datas, username) => {
    return datas.filter(data => data.auditor.login === username)
}

export const AuditRecevedNotEnd = (datas) => {
    return datas.filter(data => data.group.status === "audit")
}