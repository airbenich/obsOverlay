const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

//   win.loadFile('index.html')

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
view.setAutoResize({width: true, height: true});
view.webContents.loadURL('http://localhost:4200')

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