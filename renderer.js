const assignments = document.getElementById("assignments")
var fs
try {
    fs = require("fs")
}
catch (err){
    alert(err)
    alert("Error 404: skill not found")
}
var today = new Date()
today = (today.getFullYear()).toString() + "-" + (today.getMonth() + 1).toString() + "-" + (today.getDate()).toString()


async function fetchFile(filepath) {
    let obj;
  
    const res = await fetch(filepath)
  
    obj = await res.json();
    return obj
}

function addTask() {
    updateTasks()
    fetchFile("resources/tasks.json")
    .then(data => {
        // put functions to run here
        var newTask = {"name": "Untitled Task",
                        "view": "unchecked",
                        "subject": "Unnamed",
                        "startdate": today.toString(),
                        "enddate": today.toString(),
                        "notes": `./resources/notes${data.length+1}.txt`,
                        "done": "unchecked"}
        try{
            fs.writeFileSync(`resources/notes${data.length+1}.txt`, "hello")
        }
        catch (err){
            alert(err)
        }
        data.push(newTask)
        return(data)
    })
    .then(result => {
        try{
            fs.writeFileSync("resources/tasks.json", JSON.stringify(result))
        }
        catch (err){
            alert(err)
        }
        
        renderTasks()
    })
}

function renderTasks(){
    var html = ""
    fetchFile("resources/tasks.json")
    .then(data => {
        for(i=0; i<data.length; i++){
            if (data[i].view == true){
                if(data[i].done == true){
                    html = html + `<tr><td class="view"><input type="checkbox" id="view${i+1}" checked></td><td class="name"><input type="text" id="name${i+1}" value="${data[i].name}"></td><td class="subject"><input type="text" id="subject${i+1}" value="${data[i].subject}"></td><td class="startdate"><input type="date" id="startdate${i+1}" value="${data[i].startdate}"></td><td class="enddate"><input type="date" id="enddate${i+1}" value="${data[i].enddate}"></td><td class="notes"><a href="notes.html" value = "notes${i+1}"onclick="loadNotes(${i})">Notes</a></td><td class="done"><input type="checkbox" id="done${i+1}" checked></td></tr>` 
                }
                else{
                    html = html + `<tr><td class="view"><input type="checkbox" id="view${i+1}" checked></td><td class="name"><input type="text" id="name${i+1}" value="${data[i].name}"></td><td class="subject"><input type="text" id="subject${i+1}" value="${data[i].subject}"></td><td class="startdate"><input type="date" id="startdate${i+1}" value="${data[i].startdate}"></td><td class="enddate"><input type="date" id="enddate${i+1}" value="${data[i].enddate}"></td><td class="notes"><a href=notes}.html" value = "notes${i+1}"onclick="loadNotes(${i})">Notes</a></td><td class="done"><input type="checkbox" id="done${i+1}" ></td></tr>` 
                }
            }
            else{
                if(data[i].done == true){
                    html = html + `<tr><td class="view"><input type="checkbox" id="view${i+1}"></td><td class="name"><input type="text" id="name${i+1}" value="${data[i].name}"></td><td class="subject"><input type="text" id="subject${i+1}" value="${data[i].subject}"></td><td class="startdate"><input type="date" id="startdate${i+1}" value="${data[i].startdate}"></td><td class="enddate"><input type="date" id="enddate${i+1}" value="${data[i].enddate}"></td><td class="notes"><a href="notes.html" value = "notes${i+1}"onclick="loadNotes(${i})">Notes</a></td><td class="done"><input type="checkbox" id="done${i+1}" checked></td></tr>` 
                }
                else{
                    html = html + `<tr><td class="view"><input type="checkbox" id="view${i+1}"></td><td class="name"><input type="text" id="name${i+1}" value="${data[i].name}"></td><td class="subject"><input type="text" id="subject${i+1}" value="${data[i].subject}"></td><td class="startdate"><input type="date" id="startdate${i+1}" value="${data[i].startdate}"></td><td class="enddate"><input type="date" id="enddate${i+1}" value="${data[i].enddate}"></td><td class="notes"><a href="notes.html" value = "notes${i+1}"onclick="loadNotes(${i})">Notes</a></td><td class="done"><input type="checkbox" id="done${i+1}" ></td></tr>` 
                }
            }
        }
        return(html)
    })
    .then(result =>  assignments.innerHTML = result)
}

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

function updateTasks(){
    var tasksjson = []
    var task
    fetchFile("resources/tasks.json")
    .then(data => {
        for (i=0; i<data.length; i++){
            task = {
                'name': document.getElementById(`name${i+1}`).value,
                'view': document.getElementById(`view${i+1}`).checked,
                'subject': document.getElementById(`subject${i+1}`).value,
                'startdate': document.getElementById(`startdate${i+1}`).value,
                'enddate': document.getElementById(`enddate${i+1}`).value,
                'notes': `./resources/notes${i+1}.txt`,
                'done': document.getElementById(`done${i+1}`).checked
            }
            tasksjson.push(task)
        }
        return tasksjson
    })
    .then(json => {
        try{
            fs.writeFileSync("resources/tasks.json", JSON.stringify(json))
        }
        catch (err){
            alert(err)
        }
    })
}
function loadNotes(e){
    fetchFile("resources/tasks.json")
    .then(data => {
        notes = fs.readFileSync(`resources/notes${e+1}.txt`)
        try{
            fs.writeFileSync("notes.html", `<html><head><title>Assignment Manager</title><link rel="stylesheet" href="main.css"></head><body><div id="header"><h1>Notes</h1><a href="index.html" onclick="saveText(${e})">Close Window</a></div><div><textarea row = "20" col="50" id="notes">${notes}</textarea></div></body><script text = "text/javascript" src="renderer.js"></script></html>`)
        }
        catch (err){
            alert(err + "\nskill issue")
        }
            
    })
        
}
function saveText(e){
    var text = document.getElementById("notes").value
    try{
        fs.writeFileSync(`resources/notes${e+1}.txt`, text)
    }
    catch (err){
        alert(err)
    }
}
function removeTasks(){
    var tasks = []
    fetchFile("resources/tasks.json")
    .then(data => {
        alert("running")
        for (i=0; i<data.length; i++){
            var done = document.getElementById(`done${i+1}`).checked
            if (done){
                tasks.push(JSON.stringify(data[i])) 
                fs.unlink(`resources/notes${i+1}.txt`, function(err){
                    if (err){
                        alert(err)
                    }
                })
            }
        }
        for (i=0; i<tasks.length; i++){
            data.splice(data.indexOf(tasks[i]), 1)
        }
        alert("step 2")
        //renaming is not working, need to figure out a new plan
        for (i=0; i<data.length; i++){
            var currNotes = data[i].notes
            data[i].notes = `./resources/notes${i+1}.txt`
            alert(currNotes)
            alert(i)
            alert(data[i].notes)
            fs.rename(currNotes, `./resources/notes${i+1}.txt`, (err) =>{
                if (err){
                    alert(err)
                }
            })
        }
        alert("finished")
        try{
            fs.writeFileSync("resources/tasks.json", JSON.stringify(data))
        }
        catch (err){
            alert(err)
        }
        renderTasks()
    })
}

// do notes functionality today
func()
renderTasks()