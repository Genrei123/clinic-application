const { app, BrowserWindow } = require('electron');

const FRONTEND_BUILD = "../frontend/dist/index.html";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    });

    win.loadURL('http://localhost:5173');
};

app.whenReady().then(() => {
    createWindow();
});