const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')

let win = null

if(require('electron-squirrel-startup')) app.quit();

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1000,
        autoHideMenuBar: false,
        backgroundColor: '#414144',
        frame: false,
        autoHideMenuBar: true,
        darkTheme: true,
        icon: __dirname + "/icons/win/icon.ico",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    win.webContents.on('did-finish-load', function () {
        win.webContents.executeJavaScript("console.log('test')");
    });

    win.loadFile('./app/index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }

    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


ipcMain.on('window-control', (event, arg) => {
    if (arg == "app_close") {
        app.quit()
    }

    if (arg == "window_toggle_maximize") {
        let maximized = BrowserWindow.getFocusedWindow().isMaximized()
        if (maximized) {
            BrowserWindow.getFocusedWindow().unmaximize()
        }
        else {
            BrowserWindow.getFocusedWindow().maximize()
        }
    }

    if (arg == "window_minimize") {
        BrowserWindow.getFocusedWindow().minimize()
    }
})