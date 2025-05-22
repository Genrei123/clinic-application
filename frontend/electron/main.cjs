const { app, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater, AppUpdate } = require('electron-updater')

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    })

    win.loadFile(path.join(app.getAppPath(), `dist/index.html`));
}

app.whenReady().then(() => {
    createWindow()

    autoUpdater.checkForUpdates();
})

autoUpdater.on("update-available", () => {
    console.log("I see an update!")
})

autoUpdater.on("update-not-available", () => {
    console.log("No update so far!");
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})