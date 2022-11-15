function addSubject(){
    updateSettings()
    fetchFile("./resources/settings.json")
    .then(settings => {
        var newSubject = {
            "subject": "New Subject",
            "colour": "#ffffff"
        }
        settings.push(newSubject)
        try{
            fs.writeFileSync("./resources/settings.json", JSON.stringify(settings))
        }
        catch (err){
            alert(err)
        }
        loadSettings()
    })
}

function deleteMe(e){
    updateSettings()
    fetchFile("./resources/settings.json")
    .then(settings => {
        settings.splice(e-1, 1)
        try{
            fs.writeFileSync("./resources/settings.json", JSON.stringify(settings))
        }
        catch (err){
            alert(err)
        }
    })
    loadSettings()
    window.location.reload()
}

function loadSettings(){
    html = ""
    fetchFile("./resources/settings.json")
    .then( settings => {
        var settingsHTML = document.getElementById("settings")
        for (i=0; i<settings.length; i++){
            html = html + `<tr><td class="subject"><input type="text" id="subject${i+1}" value ="${settings[i].subject}"></td><td class="colour"><input type="color" id="colour${i+1}" value="${settings[i].colour}"></td><td class="remove"><button id="button${i+1}" onclick="deleteMe(${i+1})">X</button></td></tr>`
        }
        settingsHTML.innerHTML = html
    })
}
loadSettings()