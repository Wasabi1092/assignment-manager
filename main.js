const { app, BrowserWindow, ipcMain} = require("electron")
const path = require("path")

const createWindow = () =>{
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences:{
            preload: path.join(__dirname, "preload.js"),
            images: path.join(__dirname, "/images"),            
            nodeIntegration: true,
            contextIsolation: false,
            allowRendererProcessReuse: false,            
        }
    })
    ipcMain.handle("ping", () => "pong")
    win.loadFile("index.html")
}
app.whenReady().then(() => {
    createWindow()
    app.on("activate", () =>{
        if (BrowserWindow.getAllWindows().length === 0){createWindow()}
    })
})

app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin"){
        app.quit()
    }
})
