const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setOverlay: (callback) => ipcRenderer.on('set-overlay', callback),
    closeOverlay: () => ipcRenderer.send('close-overlay'),
    moment: () => moment,
    setVisible: (data) => ipcRenderer.send('is-visible', data),
    alertNotif: (data) => ipcRenderer.send('notif-alert', data),
});