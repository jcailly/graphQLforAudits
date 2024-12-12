document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const usernameOrEmail = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const credentialType = usernameOrEmail.includes("@")
            ? "email"
            : "username";
        const credentials = btoa(`${usernameOrEmail}:${password}`);
        fetch("https://zone01normandie.org/api/auth/signin", {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Invalid credentials");
                return response.json();
            })
            .then((data) => {
                document.getElementById("logoutButton").style.visibility =
                    "visible";
                document
                    .querySelector("body")
                    .removeChild(document.getElementById("loginForm"));
                loadId(data);
            })
            .catch((error) => {
                console.log(error);
                document.getElementById("error").innerText =
                    "Invalid credentials. Please try again.";
            });
    });
document.getElementById("logoutButton").addEventListener("click", function () {
    token = "";
    window.location.reload();
});
let xp = [];
let xpgo = [];
let xpjs = [];
let up = [];
let down = [];
const queryId = `query{
    user {
      id
    }
}`;
async function loadId(jwt) {
    let token = jwt;
    try {
        fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: queryId,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("YA 1 PB");
                return response.json();
            })
            .then((data) => {
                loadData(data.data.user[0].id, token);
            });
    } catch (error) {
        console.log("Error:", error);
    }
}
async function loadData(userId, token) {
    let queryData = `query{
        user {
          login
          auditRatio
          createdAt
          firstName
          lastName
          totalUp
          totalDown
        }
        transaction(where: {userId: {_eq: ${userId}}}) {
          amount
          createdAt
          type
          object {
            name
            type
            attrs
          }
        }
      }`;
    try {
        fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: queryData,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("YA 1 PB");
                return response.json();
            })
            .then((data) => {
                user = data.data.user[0];
                transactions = data.data.transaction;
                displayUserInfo(user);
                sortGraph(transactions);
            });
    } catch (error) {
        console.log("Error:", error);
    }
}
async function displayUserInfo(user) {
    const userinfos = document.getElementById("userinfos");
    const userstats = document.getElementById("userstats");
    for (const key in user) {
        switch (key) {
            case "login":
                const login = document.createElement("h1");
                login.setAttribute("id", "login");
                login.innerHTML = "Bienvenue " + user[key];
                document.getElementsByTagName("body")[0].prepend(login);
                break;
            case "auditRatio":
                const ratio = document.createElement("div");
                if (user[key] < 1) {
                    ratio.innerHTML =
                        "Votre ratio d'audit est de " +
                        user[key].toFixed(1) +
                        "... Vous pouvez mieux faire !";
                } else {
                    ratio.innerHTML =
                        "Votre ratio d'audit est de " +
                        user[key].toFixed(1) +
                        ". Très bien !";
                }
                userstats.appendChild(ratio);
                break;
            case "totalUp":
                const up = document.createElement("div");
                up.innerHTML =
                    "Vous avez donné " + user[key] + " points d'audit.";
                userstats.appendChild(up);
                break;
            case "totalDown":
                const down = document.createElement("div");
                down.innerHTML =
                    "Vous avez reçu " + user[key] + " points d'audit.";
                userstats.appendChild(down);
                break;
            case "firstName":
                const firstName = document.createElement("div");
                firstName.innerHTML = "Prénom: " + user[key];
                userinfos.appendChild(firstName);
                break;
            case "lastName":
                const lastName = document.createElement("div");
                lastName.innerHTML = "Nom: " + user[key];
                userinfos.appendChild(lastName);
                break;
            case "createdAt":
                const created = document.createElement("div");
                let year = user[key].slice(0, 4);
                let month = user[key].slice(5, 7);
                let day = user[key].slice(8, 10);
                created.innerHTML =
                    "Date d'inscription: " + day + "/" + month + "/" + year;
                userinfos.appendChild(created);
                break;
            default:
                break;
        }
    }
    document.getElementById("userContainer").style.visibility = "visible";
}
async function sortGraph(transactions) {
    for (let i = 0; i < transactions.length; i++) {
        switch (transactions[i].type) {
            case "up":
                up.push(transactions[i]);
                break;
            case "down":
                down.push(transactions[i]);
                break;
            case "xp":
                switch (transactions[i].object.attrs.language) {
                    case "go":
                        if (
                            transactions[i].object.type == "exercise" ||
                            transactions[i].object.type == "raid"
                        ) {
                            if (
                                transactions[i].createdAt.includes("2023-06") ||
                                transactions[i].createdAt.includes("2023-07") ||
                                transactions[i].createdAt.includes("2023-08") ||
                                transactions[i].createdAt.includes("2023-09") ||
                                transactions[i].createdAt.includes("2023-10")
                            ) {
                                xpgo.push(transactions[i]);
                            } else {
                                xp.push(transactions[i]);
                            }
                        } else {
                            xp.push(transactions[i]);
                        }
                        break;
                    case "js":
                        if (transactions[i].object.type == "exercise") {
                            xpjs.push(transactions[i]);
                        } else {
                            xp.push(transactions[i]);
                        }
                        break;
                    default:
                        if (
                            transactions[i].object.type == "raid" &&
                            transactions[i].object.attrs.language != "go"
                        ) {
                            xpjs.push(transactions[i]);
                        } else {
                            xp.push(transactions[i]);
                        }
                        break;
                }
                break;
            default:
                break;
        }
    }
    displayGraph();
}
async function sortPoints(arr) {
    return arr.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
async function displayGraph() {
    await sortPoints(up);
    await sortPoints(down);
    await sortPoints(xpgo);
    await sortPoints(xpjs);
    await sortPoints(xp);
    drawGraph(up, "graphUp", "Audits donnés");
    drawGraph(down, "graphDown", "Audits reçus");
    drawGraph(xp, "graphXp", "Points d'experience");
    document.getElementById("graphUp").style.visibility = "visible";
    document.getElementById("graphDown").style.visibility = "visible";
    document.getElementById("graphXp").style.visibility = "visible";
}
function drawGraph(data, svgId, label) {
    const svg = document.getElementById(svgId);
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const margin = { top: 30, right: 50, bottom: 50, left: 80 };
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    const minDate = new Date(data[0].createdAt);
    const maxDate = new Date(data[data.length - 1].createdAt);
    const maxAmount = data.reduce((acc, d) => acc + d.amount, 0);
    const xScale = (date) => {
        return (
            margin.left +
            ((date - minDate) * (width - margin.left - margin.right)) /
                (maxDate - minDate)
        );
    };
    const yScale = (amount) => {
        return (
            height -
            margin.bottom -
            (amount * (height - margin.top - margin.bottom)) / maxAmount
        );
    };
    const createAxis = (x1, y1, x2, y2) => {
        const axis = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        axis.setAttribute("x1", x1);
        axis.setAttribute("y1", y1);
        axis.setAttribute("x2", x2);
        axis.setAttribute("y2", y2);
        axis.setAttribute("stroke", "black");
        svg.appendChild(axis);
    };
    createAxis(margin.left, margin.top, margin.left, height - margin.bottom); // Y axis
    createAxis(
        margin.left,
        height - margin.bottom,
        width - margin.right,
        height - margin.bottom
    ); // X axis
    const createLabel = (x, y, text, anchor) => {
        const label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        label.setAttribute("x", x);
        label.setAttribute("y", y);
        label.setAttribute("text-anchor", anchor);
        label.textContent = text;
        svg.appendChild(label);
    };
    createLabel(width / 2, height - 10, label, "middle"); // X axis label
    createLabel(margin.left / 2, height / 2, "Amount", "middle"); // Y axis label
    createLabel(width / 2, margin.top / 2, label, "middle"); // Title
    let cumulativeAmount = 0;
    const dataWithCumulative = data.map((d) => {
        cumulativeAmount += d.amount;
        return { ...d, cumulativeAmount };
    });
    for (let i = 0; i < dataWithCumulative.length - 1; i++) {
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line.setAttribute(
            "x1",
            xScale(new Date(dataWithCumulative[i].createdAt))
        );
        line.setAttribute("y1", yScale(dataWithCumulative[i].cumulativeAmount));
        line.setAttribute(
            "x2",
            xScale(new Date(dataWithCumulative[i + 1].createdAt))
        );
        line.setAttribute(
            "y2",
            yScale(dataWithCumulative[i + 1].cumulativeAmount)
        );
        line.setAttribute("stroke", "steelblue");
        line.setAttribute("stroke-width", 1.5);
        svg.appendChild(line);
    }
    const xTickCount = 5;
    for (let i = 0; i <= xTickCount; i++) {
        const date = new Date(
            minDate.getTime() + (i * (maxDate - minDate)) / xTickCount
        );
        const x = xScale(date);
        createAxis(x, height - margin.bottom, x, height - margin.bottom + 5); // Tick
        createLabel(
            x,
            height - margin.bottom + 20,
            date.toLocaleDateString(),
            "middle"
        ); // Label
    }
    const yTickCount = 5;
    for (let i = 0; i <= yTickCount; i++) {
        const amount = (i * maxAmount) / yTickCount;
        const y = yScale(amount);
        createAxis(margin.left - 5, y, margin.left, y); // Tick
        createLabel(margin.left - 10, y, amount.toFixed(0), "end"); // Label
    }
}
