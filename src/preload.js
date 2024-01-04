const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    close: () => ipcRenderer.send('close-app'),
    sendNotif: (data) => ipcRenderer.send('submit-overlay', data),
    beneNotif: () => ipcRenderer.send('bene-notif'),
});