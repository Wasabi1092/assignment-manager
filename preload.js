const { contextBridge, ipcRenderer } = require("electron")
contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping")
})
var html = ""
fetchFile("resources/tasks.json")
.then(data => {
    for(i=0; i<data.length; i++){
        html = html + `<tr>
        <td class="view"><input type="checkbox" id="view${i+1}"></td>
        <td class="name"><input type="text" id="name${i+1}" value="${data[i].name}"></td>
        <td class="subject"><input type="text" id="subject${i+1}" value="${data[i].subject}"></td>
        <td class="startdate"><input type="date" id="startdate${i+1}" value="${data[i].startdate}"></td>
        <td class="enddate"><input type="date" id="enddate${i+1}" value="${data[i].enddate}"></td>
        <td class="notes"><a href="task${i+1}.html">Notes</a></td>
        <td class="done"><input type="checkbox" id="done${i+1}"></td>
        </tr>`
    }
    alert(html)
    return(html)
})
.then(result =>  assignments.replaceChildren(result))
