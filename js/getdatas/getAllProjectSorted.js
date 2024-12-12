import { isGoodPath } from "../isGoodPath.js";

export const getAllProjectSorted = (datas) => {
    const allEndProject = []

    datas.forEach(data => {
        if (isGoodPath(data.path) && data.type === "xp") {
            allEndProject.push(data)
        }
    });

    allEndProject.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    return allEndProject
}