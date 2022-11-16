var fs
try {
    fs = require("fs")
}
catch (err){
    alert(err)
    alert("Error 404: skill = not found")
}
function calcWeek(){
    var today = new Date()
    var day = today.getDay()
    var sunday = new Date()
    sunday.setDate(sunday.getDate() - day)
    for (i=0; i<7; i++){
        document.getElementById(`day${i+1}`).innerText = `${(sunday.getDate()).toString()}/${(sunday.getMonth()+1).toString()}/${(sunday.getFullYear()).toString()}`
        sunday.setDate(sunday.getDate() + 1)
    }
}
function calcTasks(){
    calcWeek()
    var week = []
    var names = []
    var timeline = {}
    for (i=0; i<7; i++){
        date = document.getElementById(`day${i+1}`).innerText
        date = date.split("/")
        date = date[2].toString() + "-" + date[1].toString() + "-" + date[0].toString()
        date = new Date(date)
        week.push(date)
    }
    fetchFile("./resources/tasks.json")
    .then(file => {//currently returning incorrect dates, check over
        for (i=0; i<file.length; i++){
            if (file[i].view){
                if ((new Date(file[i].startdate)).getTime() < week[0].getTime()){
                    var startDate = "0"
                }
                else {
                    if((new Date(file[i].startdate)).getTime() > week[6].getTime()){
                        startDate = null
                    }
                    else{
                        var startDate = new Date(file[i].startdate)
                    }
                    
                }
                if ((new Date(file[i].enddate)).getTime() > week[6].getTime()){
                    var endDate = "7"
                }
                else {
                    if((new Date(file[i].enddate)).getTime() < week[0].getTime()){
                        endDate = null
                    }
                    else{
                        var endDate = new Date(file[i].enddate)
                    }
                }
                if ((startDate == null) || (endDate == null)){
                    var millilength = 0
                }
                else{
                    if (endDate == "7"){
                        if (startDate == "0"){
                            var millilength = 6
                        }
                        else{
                            var millilength = (week[6].getTime() - startDate.getTime())/(1000*3600*24)
                        }
                    }
                    else{
                        if (startDate == "0"){
                            var millilength = (endDate.getTime() - week[0].getTime())/(1000*3600*24)
                        }
                        else{
                            var millilength = (endDate.getTime() - startDate.getTime())/(1000*3600*24)
                        }
                    }
                }
                var length = Math.round(millilength)
                var currSub = file[i].subject
                try {
                    var settings = fs.readFileSync("./resources/settings.json")
                }
                catch (err) {
                }
                settings = JSON.parse(settings)
                var colour = null
                for (j=0; j<settings.length; j++){
                    if (settings[j].subject == currSub){
                        var colour = settings[j].colour
                    }
                    if (colour == null){
                        colour = "#ffffff"
                    }
                }
                array = {
                    "startdate":startDate,
                    "enddate":endDate,
                    "length":length,
                    "colour":colour
                }
                timeline[file[i].name] = array
            }
        }
        try {
            fs.writeFileSync("./resources/timeline.json", JSON.stringify(timeline))
        }
        catch (err) {
            alert(err)
        }
    })

}
function renderTimeline(){
    calcTasks()
    var leftMargin = 0
    var week = []
    for (i=0; i<7; i++){
        date = document.getElementById(`day${i+1}`).innerText
        date = date.split("/")
        date = date[2].toString() + "-" + date[1].toString() + "-" + date[0].toString()
        date = new Date(date)
        week.push(date)
    }
    fetchFile("./resources/timeline.json")
    .then(timeline => {
        var html = ""
        for (var i in timeline){
            html = `<div class="task" id="task${i+1}"></div>` + html 
        }
        document.getElementById("tasks").innerHTML = html
        for (var i in timeline){
            leftMargin = 0
            if (!((timeline[i].startdate == null) && (timeline[i].enddate == null))){
                if (timeline[i].startdate == "0"){
                    leftMargin = 0
                    if (timeline[i].enddate == "7"){
                        length = "99%"
                    }
                    else{
                        var length = timeline[i].length * 14.2 + 7.145
                        leftMargin = leftMargin.toString() + "%"
                        length = length.toString() + "%"
                    }
                }
                else{
                    leftMargin = leftMargin + 14.2 * Math.round(((new Date(timeline[i].startdate)).getTime() - week[0].getTime())/(1000*3600*24)) + 7.145
                    if (timeline[i].enddate == "7"){
                        var length = timeline[i].length * 14.2 + 7.145                        
                    }
                    else{
                        var length = timeline[i].length * 14.2           
                    }
                    if (timeline[i].startdate == timeline[i].enddate){
                        length = 3
                        leftMargin = leftMargin-1.5
                    }
                    leftMargin = leftMargin.toString() + "%"
                    length = length.toString() + "%"
                }
                
                document.getElementById(`task${i+1}`).style.left = leftMargin
                document.getElementById(`task${i+1}`).style.width = length
                if (timeline[i].colour == null){
                    colour = "#ffffff"
                }
                else{
                    colour = timeline[i].colour
                }
                document.getElementById(`task${i+1}`).style.borderColor = colour
            }
        }
    })
}
function reload(){
    window.location.reload()
}

calcTasks()
renderTimeline()