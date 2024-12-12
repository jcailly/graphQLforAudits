export const CreatEventListener = (data) => {
    document.getElementById('logout').addEventListener('click', () => {
        location.reload()
    })

    document.getElementById('gitea').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })

    document.getElementById('giteaSVG').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })

    document.getElementById('allData').addEventListener('click', () => {
        AllDataClick(data)
    })
}

const AllDataClick = (data) => {
    const popup = document.createElement('div')
    popup.className = "popup"

    popup.innerHTML = `
        <div class="name">
            ${data.data.user[0].attrs["0"]} ${data.data.user[0].attrs["1"]} <span class="closeBtn" id="closeBtn">X</div>
        </div>
        <br>
        <div class="userName">
            # ${data.data.user[0].login}
        </div>
        <br>
        <div class="MoreAboutYou" id="MoreAboutYou">
            Dites-nous en plus à votre sujet <span class="alignRight">▼</span>
        </div>
        <br>
        <div class="InformationAboutYou" id="InformationAboutYou"></div>
        <br>

        <div class="MoreAboutYou" id="Additional">
            Additional informations <span class="alignRight">▼</span>
        </div>
        <br>
        <div class="AdditionalInformation" id="AdditionalInformation"></div>
        <br>

        <div class="MoreAboutYou" id="Medical">
            Medical informations <span class="alignRight">▼</span>
        </div>
        <br>
        <div class="MedicalInformation" id="MedicalInformation"></div>
        <br>

    `
    document.body.appendChild(popup)

    document.getElementById('closeBtn').addEventListener('click', () => {
        popup.remove()
    })

    document.getElementById('MoreAboutYou').addEventListener('click', () => {
        const more = document.getElementById('InformationAboutYou')

        if (more.innerHTML !== '') {
            more.innerHTML = ''
        } else {
            const Birthday = new Date(Date.parse(data.data.user[0].attrs[5]))

            more.innerHTML = `
                <div>Last name: <span class="alignRight">${data.data.user[0].attrs[1]}</div>
                <div>First name: <span class="alignRight">${data.data.user[0].attrs[0]}</span></div>
                <br>
                <div>Phone: <span class="alignRight">${data.data.user[0].attrs[2]}</span></div>
                <div>Gender: <span class="alignRight">${data.data.user[0].attrs[3]}</span></div>
                <div>Country: <span class="alignRight">${data.data.user[0].attrs[4]}</span></div>
                <div>Birthday: <span class="alignRight">${Birthday.getDate().toString().length === 1 ? "0"+Birthday.getDate() : Birthday.getDate()} / ${(Birthday.getMonth() + 1).toString().length === 1 ? "0"+(Birthday.getMonth() + 1) : (Birthday.getMonth() + 1)} / ${Birthday.getFullYear()}</span></div>
            `
        }
    })

    document.getElementById('Additional').addEventListener('click', () => {
        const additional = document.getElementById('AdditionalInformation')

        if (additional.innerHTML !== '') {
            additional.innerHTML = ''
        } else {
            const Birthday = new Date(Date.parse(data.data.user[0].attrs[5]))

            additional.innerHTML = `
                <div>Birthday: <span class="alignRight">${Birthday.getDate().toString().length === 1 ? "0"+Birthday.getDate() : Birthday.getDate()} / ${(Birthday.getMonth() + 1).toString().length === 1 ? "0"+(Birthday.getMonth() + 1) : (Birthday.getMonth() + 1)} / ${Birthday.getFullYear()}</span></div>
                <br>
                <div>Street: <span class="alignRight">${data.data.user[0].attrs.addressStreet}</span></div>
                <div>complement street: <span class="alignRight">${data.data.user[0].attrs.addressComplementStreet}</span></div>
                <div>Postal code: <span class="alignRight">${data.data.user[0].attrs.addressPostalCode}</span></div>
                <div>City: <span class="alignRight">${data.data.user[0].attrs.addressCity}</span></div>
                <div>Country: <span class="alignRight">${data.data.user[0].attrs[4]}</span></div>
                <br>
                <div>Your expectations and objectives for the training: ${data.data.user[0].attrs.attentes}</div>
            `
        }
    })

    document.getElementById('Medical').addEventListener('click', () => {
        const medical = document.getElementById('MedicalInformation')

        if (medical.innerHTML !== '') {
            medical.innerHTML = ''
        } else {
            medical.innerHTML = `
                <div>Emergency Contact Affiliation: <span class="alignRight">${data.data.user[0].attrs.emergencyAffiliation}</span></div>
                <div>Emergency Contact First Name: <span class="alignRight">${data.data.user[0].attrs.emergencyFirstName}</span></div>
                <div>Emergency Contact Last Name: <span class="alignRight">${data.data.user[0].attrs.emergencyLastName}</span></div>
                <div>Emergency Contact Tel: <span class="alignRight">${data.data.user[0].attrs.emergencyTel}</span></div>
            `
        }
    })
}