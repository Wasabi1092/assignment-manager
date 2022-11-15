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