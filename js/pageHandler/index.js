import { fetchDatas } from "../getdatas/fetchDatas.js"
import { Logged } from "./logged.js"
import { SetNewCSS } from "../Utility/setnewcss.js"

SetNewCSS(['css/style.css'])

document.getElementById('authenticate-button').addEventListener('click', async () => {
    const email = document.getElementById('email-field').value
    const password = document.getElementById('password-field').value

    const data = await fetchDatas('https://zone01normandie.org/api/auth/signin', 'Basic ' + btoa(`${email}:${password}`))
    if (typeof(data) !== "string") {
        document.getElementById('error-message').innerHTML = data.error
        return
    }

    Logged(data)
})
