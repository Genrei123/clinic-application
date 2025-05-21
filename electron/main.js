const { app, BrowserWindow } = require('electron')

const FRONTEND_URL = "../frontend/dist/index.html"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    })

    win.loadFile(FRONTEND_URL);
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})