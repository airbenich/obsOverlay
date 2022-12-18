window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
    
    const { ipcRenderer } = require('electron')

    document.getElementById("min-btn").addEventListener("click", function (e) {
        ipcRenderer.send('window-control', 'window_minimize')
    });

    document.getElementById("max-btn").addEventListener("click", function (e) {
        ipcRenderer.send('window-control', 'window_toggle_maximize')
    });

    document.getElementById("close-btn").addEventListener("click", function (e) {
        ipcRenderer.send('window-control', 'app_close')
    });
})